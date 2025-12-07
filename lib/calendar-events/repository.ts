import { DateTime } from 'luxon';
import { datetime, RRule, RRuleSet } from 'rrule';

import { CalendarEvent } from '@/lib/calendar-events/models/calendar-event';
import { EventType } from '@/lib/generated/prisma/client';
import { Logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma-client';
import { DateTimeUtils } from '@/lib/utils/date-time.utils';
import { clone, deserialize, serialize } from '@/lib/utils/serialization';

export type IEventsRepository = {
    destroy: () => Promise<void>;

    createEvent: (data: CalendarEvent) => Promise<CalendarEvent>;
    getEvents: () => Promise<CalendarEvent[]>;
    getAllEventsInRange: (start: DateTime, end: DateTime) => Promise<CalendarEvent[]>;
    getEventById: (id: string) => Promise<CalendarEvent | undefined>;
    updateEvent: (id: string, data: CalendarEvent) => Promise<CalendarEvent>;
    deleteEvent: (id: string) => Promise<CalendarEvent>;
};

export class EventsRepository implements IEventsRepository {
    private db = prisma;

    public destroy = async (): Promise<void> => {};

    public getEvents = async (): Promise<CalendarEvent[]> => {
        return await this.getAllEventsInRange(DateTime.utc().minus({ year: 1 }), DateTime.utc().plus({ year: 1 }));
    };

    public createEvent = async (data: CalendarEvent): Promise<CalendarEvent> => {
        const result = await this.db.event.create({ data: serialize(data) });

        return deserialize(result, CalendarEvent);
    };

    public deleteEvent = async (id: string): Promise<CalendarEvent> => {
        const result = await this.db.event.delete({ where: { id } });
        return deserialize(result, CalendarEvent);
    };

    public getAllEventsInRange = async (
        rangeStart: DateTime<true>,
        rangeEnd: DateTime<true>,
    ): Promise<CalendarEvent[]> => {
        const result = await this.db.event.findMany({
            where: {
                is_published: true,
                start_at: { not: null },
                // OR: [
                //     { start_at: { lte: rangeEnd.toISO() } },
                //     { end_at: { gte: rangeStart.toISO() } },
                //     {
                //         OR: [
                //             {
                //                 recurrences: {
                //                     some: {
                //                         recurrence: {
                //                             start: { lte: rangeEnd.toISO() },
                //                             OR: [
                //                                 { until: { gte: rangeStart.toISO() } }, //
                //                                 { until: { equals: null } },
                //                             ],
                //                         },
                //                     },
                //                 },
                //             },
                //             {
                //                 recurrences: {
                //                     none: {},
                //                 },
                //             },
                //         ],
                //     },
                // ],
                // additions: { some: { date: { gt: rangeStart.toISO(), lt: rangeEnd.toISO() } } },
                // exceptions: { some: { date: { gte: rangeStart.toISO(), lte: rangeEnd.toISO() } } },
            },
            include: {
                additions: true,
                exceptions: true,
                recurrences: { include: { recurrence: true } },
                // exceptions: { where: { date: { gte: rangeStart.toISO(), lte: rangeEnd.toISO() } } },
                // recurrences: { include: { recurrence: true } },
            },
        });
        return result
            .map(({ recurrences, additions, exceptions, ...ev }): CalendarEvent[] => {
                const original = deserialize(ev, CalendarEvent);
                if (!original.startAt || !original.startAt.isValid || !original.endAt || !original.endAt.isValid)
                    return [original];

                const events = [original];
                if (recurrences && recurrences.length && original.startAt?.isValid && original.endAt?.isValid) {
                    for (const { recurrence: r } of recurrences) {
                        const diff = original.endAt.diff(original.startAt, 'seconds').seconds;

                        const rruleSet = new RRuleSet();
                        const dtstart = DateTime.fromJSDate(r.start)
                            .toJSDate()
                            .toISOString()
                            .replace(/.\d{3}Z/, 'Z')
                            .replaceAll(/[-.:]/g, '');
                        const rruleStr = `DTSTART:${dtstart};\nRRULE:${r.rrule}`;
                        rruleSet.rrule(RRule.fromString(rruleStr));

                        for (const add of additions) {
                            const dt = DateTime.fromJSDate(add.date);
                            if (dt.isValid) {
                                const { year, month, day, hour, minute, second } = dt.toObject();
                                rruleSet.rdate(datetime(year, month, day, hour, minute, second));
                            }
                        }

                        for (const ex of exceptions) {
                            const dt = DateTime.fromJSDate(ex.date);
                            if (dt.isValid) {
                                const { year, month, day, hour, minute, second } = dt.toObject();
                                rruleSet.exdate(new Date(year, month - 1, day, hour, minute, second));
                            }
                        }

                        Logger.log({ rangeStart, rangeEnd });

                        const expanded = rruleSet
                            .between(rangeStart.toJSDate(), rangeEnd.toJSDate(), true)
                            .map((dt) => {
                                const dtStr = dt.toISOString();
                                const opts = { zone: original.timezone, keepTime: true };
                                const correctedStartTime = DateTimeUtils.parseDateTime(dtStr, opts);
                                const correctedEndTime = correctedStartTime.plus({ seconds: diff });

                                const generated: CalendarEvent = clone(original);
                                generated.id = CalendarEvent.makeId(
                                    original.id,
                                    correctedEndTime.toObject(),
                                    'occurrence',
                                );
                                generated.startAt = correctedStartTime;
                                generated.endAt = correctedEndTime;
                                return generated;
                            });
                        events.push(...expanded);
                    }
                }

                return events.flatMap((e) => {
                    if (e.startAt?.day != e.endAt?.day) return [e];
                    else return expandMultiDayEvent(e);
                });
            })
            .flat()
            .sort(CalendarEvent.compareFn)
            .filter((e) => e.startAt && e.startAt.isValid && e.startAt <= rangeEnd && e.startAt >= rangeStart)
            .map((e) => {
                Logger.log(e.title, e.startAt, rangeStart);
                return e;
            });
    };

    public getEventById = async (id: string): Promise<CalendarEvent | undefined> => {
        const result = await this.db.event.findUnique({ where: { id } });
        return result ? deserialize(result, CalendarEvent) : undefined;
    };

    public updateEvent = async (id: string, data: CalendarEvent): Promise<CalendarEvent> => {
        const serialized = serialize(data);
        const result = await this.db.event.update({
            where: { id },
            data: {
                ...serialized,
                event_type: serialized.event_type as EventType,
                meta: JSON.stringify(serialized.meta),
            },
        });
        return deserialize(result, CalendarEvent);
    };
}

function expandMultiDayEvent(parentEvent: CalendarEvent): CalendarEvent[] {
    if (!parentEvent.startAt || !parentEvent.endAt) return [parentEvent];

    // Ensure we're working with dates in the event's timezone
    const startDate = parentEvent.startAt.setZone(parentEvent.timezone).startOf('day');
    const endDate = parentEvent.endAt.setZone(parentEvent.timezone).startOf('day');

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

        const dayEvent = {
            ...serialize(parentEvent),
            // Generate a unique ID for each day's event
            id: `${parentEvent.id}-day-${i}`,
            // Set the parent event ID to maintain relationship
            // parentEventId: parentEvent.id,
        };

        // Set start and end times for each day's event
        if (isFirstDay) {
            // First day: Keep original start time, end at end of day
            dayEvent.start_at = startDate.toISO();
            dayEvent.end_at = currentDate.endOf('day').toISO();
        } else if (isLastDay) {
            // Last day: Start at beginning of day, keep original end time
            dayEvent.start_at = currentDate.startOf('day').toISO();
            dayEvent.end_at = endDate.toISO();
        } else {
            // Middle days: Full day events
            dayEvent.start_at = currentDate.startOf('day').toISO();
            dayEvent.end_at = currentDate.endOf('day').toISO();
            dayEvent.all_day = true;
        }

        events.push(deserialize(dayEvent, CalendarEvent));
    }

    return events;
}

// function expandRecurringEvent(parent: CalendarEvent, rule: EventRecurrence, rangeStart: DateTime, rangeEnd: DateTime) {
//     if (!parent.startAt?.isValid) throw new Error('Invalid parentEvent.startAt');
//     if (!parent.endAt?.isValid) throw new Error('Invalid parentEvent.endAt');
//
//     const diff = parent.endAt.diff(parent.startAt, 'seconds').seconds;
//     const dates = RRule.fromString(rule.rrule).between(rangeStart.toJSDate(), rangeEnd.toJSDate(), true);
//     return dates.map((dt) => {
//         const correctedStartTime = DateTimeUtils.parseDateTime(dt, { zone: parent.timezone, keepTime: true });
//         const correctedEndTime = correctedStartTime.plus({ seconds: diff });
//
//         const generated: CalendarEvent = CalendarEvent.clone(parent);
//         generated.id = CalendarEvent.makeId(parent.id, correctedEndTime.toObject(), 'occurrence');
//         generated.startAt = correctedStartTime;
//         generated.endAt = correctedEndTime;
//         return generated;
//     });
// }
