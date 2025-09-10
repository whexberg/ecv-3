import { DeleteResult, Insertable, Kysely } from 'kysely';
import { DateTime } from 'luxon';
import { ByWeekday, Options, RRule, WeekdayStr } from 'rrule';
import { Weekday } from 'rrule/dist/esm/weekday';

import { CalendarEvent, ICalendarEvent } from '@/src/lib/models/calendar-event';
import { Serialized } from '@/src/lib/models/map-types';
import { IRecurrenceRule, RecurrenceRule } from '@/src/lib/models/recurrence-rules';

import { DB } from '../database/db-types';

export type ICalendarEventsRepository = {
    destroy: () => Promise<void>;
    getEvents: () => Promise<CalendarEvent[]>;
    createEvent: (data: CalendarEvent) => Promise<CalendarEvent>;
    deleteEvent: (id: string) => Promise<DeleteResult[]>;
    getAllEventsInRange: (start: DateTime, end: DateTime) => Promise<CalendarEvent[]>;
    getEventById: (id: string) => Promise<CalendarEvent | undefined>;
    updateEvent: (id: string, data: CalendarEvent) => Promise<CalendarEvent>;
};

export class CalendarEventsRepository implements ICalendarEventsRepository {
    public constructor(private db: Kysely<DB>) {}

    public destroy = async () => await this.db.destroy();

    public getEvents = async (): Promise<CalendarEvent[]> => {
        return this.getAllEventsInRange(DateTime.utc().minus({ year: 1 }), DateTime.utc().plus({ year: 1 })).then();
    };

    public createEvent = async (data: CalendarEvent): Promise<CalendarEvent> => {
        const result = await this.db
            .insertInto('calendar_events')
            .values(data.serialize() as Insertable<DB['calendar_events']>)
            .returningAll()
            .executeTakeFirstOrThrow();

        return CalendarEvent.deserialize(result as Serialized<ICalendarEvent>);
    };
    public deleteEvent = async (id: string): Promise<DeleteResult[]> =>
        await this.db.deleteFrom('calendar_events').where('id', '=', id).execute();

    public getAllEventsInRange = async (
        rangeStart: DateTime<true>,
        rangeEnd: DateTime<true>,
    ): Promise<CalendarEvent[]> => {
        const query = this.db
            .selectFrom('calendar_events')
            .leftJoin('recurrence_rules', 'recurrence_rules.id', 'calendar_events.recurrence_rule_id')
            .select([
                'calendar_events.id as event_id',
                'calendar_events.created_at as event_created_at',
                'calendar_events.updated_at as event_updated_at',
                'recurrence_rules.id as recurrence_id',
                'recurrence_rules.created_at as recurrence_created_at',
                'recurrence_rules.updated_at as recurrence_updated_at',
            ])
            .selectAll('calendar_events')
            .selectAll('recurrence_rules')
            .where((eb) => {
                const startDateTimeBeforeRangeEnd = eb('calendar_events.start_datetime', '<', rangeEnd.toISO());
                const endDateTimeAfterRangeStart = eb('calendar_events.end_datetime', '>', rangeStart.toISO());
                const rruleUntilAfterRangeStart = eb('recurrence_rules.until', '>', rangeStart.toISO());
                return startDateTimeBeforeRangeEnd.and(endDateTimeAfterRangeStart.or(rruleUntilAfterRangeStart));
            });
        const result = await query.execute();

        return result
            .map((r) => {
                const parentEvent = CalendarEvent.deserialize({
                    ...r,
                    id: r.event_id,
                    created_at: r.event_created_at,
                    updated_at: r.event_updated_at,
                } as Serialized<ICalendarEvent>);

                if (!parentEvent.startDateTime) {
                    console.warn("Event doesn't have a start date, skipping recurrence expansion", parentEvent);
                    return parentEvent;
                }

                let events = [parentEvent];
                if (r.recurrence_rule_id) {
                    const rrule = RecurrenceRule.deserialize({
                        ...r,
                        id: r.recurrence_id,
                        created_at: r.recurrence_created_at,
                        updated_at: r.recurrence_updated_at,
                    } as Serialized<IRecurrenceRule>);

                    const rangeStart = r.start_datetime
                        ? DateTime.fromSQL(r.start_datetime, { zone: r.timezone })
                        : DateTime.utc().setZone(r.timezone).startOf('year');
                    const rangeEnd = r.until
                        ? DateTime.fromSQL(r.until, { zone: r.timezone })
                        : rangeStart.plus({ year: 1 });
                    // replace events with expanded parent event
                    events = expandRecurringEvent(parentEvent, rrule, rangeStart, rangeEnd);
                }

                return events.flatMap((e) => {
                    if (!e.isMultiDay) return [e];
                    else return expandMultiDayEvent(e);
                });
            })
            .flat();
    };

    public getEventById = async (id: string): Promise<CalendarEvent | undefined> => {
        const result = await this.db.selectFrom('calendar_events').selectAll().where('id', '=', id).executeTakeFirst();
        if (!result) return undefined;
        return CalendarEvent.deserialize(result as Serialized<ICalendarEvent>);
    };

    public updateEvent = async (id: string, data: CalendarEvent): Promise<CalendarEvent> => {
        const result = await this.db
            .updateTable('calendar_events')
            .set(data.serialize() as Insertable<DB['calendar_events']>)
            .where('id', '=', id)
            .returningAll()
            .executeTakeFirstOrThrow();

        return CalendarEvent.deserialize(result as Serialized<ICalendarEvent>);
    };
}

function expandMultiDayEvent(parentEvent: CalendarEvent): CalendarEvent[] {
    if (!parentEvent.startDateTime || !parentEvent.endDateTime) {
        return [parentEvent];
    }

    // Ensure we're working with dates in the event's timezone
    const startDate = parentEvent.startDateTime.setZone(parentEvent.timezone).startOf('day');
    const endDate = parentEvent.endDateTime.setZone(parentEvent.timezone).startOf('day');

    // Calculate the number of days between start and end dates
    const daysDiff = endDate.diff(startDate, 'days').days;

    // If it's the same day or invalid range, return the original event
    if (daysDiff <= 0) return [parentEvent];

    const events: CalendarEvent[] = [];

    // Create an event for each day in the range
    for (let i = 0; i <= daysDiff; i++) {
        const currentDate = startDate.plus({ days: i });
        const isFirstDay = i === 0;
        const isLastDay = i === daysDiff;

        const dayEvent = parentEvent.clone({
            // Generate a unique ID for each day's event
            id: `${parentEvent.id}-day-${i}`,
            // Set the parent event ID to maintain relationship
            parentEventId: parentEvent.id,
        });

        // Set start and end times for each day's event
        if (isFirstDay) {
            // First day: Keep original start time, end at end of day
            dayEvent.startDateTime = parentEvent.startDateTime;
            dayEvent.endDateTime = currentDate.endOf('day');
        } else if (isLastDay) {
            // Last day: Start at beginning of day, keep original end time
            dayEvent.startDateTime = currentDate.startOf('day');
            dayEvent.endDateTime = parentEvent.endDateTime;
        } else {
            // Middle days: Full day events
            dayEvent.startDateTime = currentDate.startOf('day');
            dayEvent.endDateTime = currentDate.endOf('day');
            dayEvent.isAllDay = true;
        }

        events.push(dayEvent);
    }

    return events;
}

function expandRecurringEvent(
    parentEvent: CalendarEvent,
    rule: RecurrenceRule,
    rangeStart: DateTime,
    rangeEnd: DateTime,
): CalendarEvent[] {
    const options: Partial<Options> = {
        freq: rule.frequency ? RRule[rule.frequency as (typeof RRule.FREQUENCIES)[number]] : undefined,
        interval: rule.interval || 1,
        dtstart: rangeStart.toJSDate(),
        until: rangeEnd.toJSDate(),
        count: rule.count ?? null,
        byweekday: rule.byDay
            ? rule.byDay.map((d: string) => {
                  // Convert "1FR" or "3MO" etc. to RRule.Day[]
                  if (/^(MO|TU|WE|TH|FR|SA|SU)$/.exec(d)) return d as ByWeekday;

                  const matches = d.match(/^(\d+)?(MO|TU|WE|TH|FR|SA|SU)$/);
                  if (matches == null) throw new Error('Invalid weekday: ' + d);

                  const [, num, str] = matches;
                  const weekday = Weekday.fromStr(str as WeekdayStr);
                  return num ? weekday.nth(Number(num)) : weekday;
              })
            : null,
        bymonth: rule.byMonth || null,
        bymonthday: rule.byMonthDay || null,
        byhour: rule.byHour || null,
        byminute: rule.byMinute || null,
        bysecond: rule.bySecond || null,
        bysetpos: rule.bySetPosition || null,
        byweekno: rule.byWeekNumber || null,
        byyearday: rule.byYearDay || null,
    };

    const dates = new RRule(options).between(rangeStart.toJSDate(), rangeEnd.toJSDate(), true);

    return dates.map((dt) => {
        const generated = parentEvent.clone();
        if (parentEvent.startDateTime) {
            generated.startDateTime = DateTime.fromJSDate(dt)
                .setZone(parentEvent.timezone)
                .set({
                    year: dt.getUTCFullYear(),
                    month: dt.getUTCMonth() + 1,
                    day: dt.getUTCDate(),
                    hour: parentEvent.startDateTime?.hour,
                    minute: parentEvent.startDateTime?.minute,
                    second: parentEvent.startDateTime?.second,
                    millisecond: 0,
                });
        }
        if (parentEvent.endDateTime) {
            generated.endDateTime = DateTime.fromJSDate(dt)
                .setZone(parentEvent.timezone)
                .set({
                    year: dt.getUTCFullYear(),
                    month: dt.getUTCMonth() + 1,
                    day: dt.getUTCDate(),
                    hour: parentEvent.endDateTime?.hour,
                    minute: parentEvent.endDateTime?.minute,
                    second: parentEvent.endDateTime?.second,
                    millisecond: 0,
                });
        }

        return generated;
    });
}
