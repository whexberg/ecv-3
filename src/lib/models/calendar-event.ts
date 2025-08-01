import { DateTime } from 'luxon';

import { CalendarEventMeta, EncodedCalendarEventMeta, ICalendarEventMeta } from '@/src/lib/models/calendar-event-meta';
import { DateTimeUtils } from '@/src/lib/models/datetimes';

export interface EncodedCalendarEvent {
    id: string; // UUID
    title: string;
    description: string;
    location: string;

    start_time: string | null; // ISO timestamp string (nullable)
    end_time: string | null; // ISO timestamp string (nullable)

    frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | '' | null;
    interval: number | null;
    byweekday: string[] | null; // e.g. ['MO', 'WE'] or null
    bymonthday: number[] | null; // e.g. [1, 15] or null
    bymonth: number[] | null; // e.g. [12] or null
    byday: string[] | null;
    byhour: number | null;
    byminute: number | null;
    bysecond: number | null;
    until: string | null; // ISO timestamp string or null
    count: number | null; // number of recurrences or null

    meta: EncodedCalendarEventMeta; // JSONB, generic key-value
    created_at: string; // ISO timestamp string
    updated_at: string; // ISO timestamp string
}

export interface ICalendarEvent {
    id: string; // UUID
    title: string;
    description: string;
    location: string;

    startTime: string; // ISO timestamp string (nullable)
    endTime: string; // ISO timestamp string (nullable)

    frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | '';
    interval: number; // defaults to 1 if not set
    byweekday: string[]; // e.g. ['MO', 'WE'] or null
    bymonthday: number[]; // e.g. [1, 15] or null
    bymonth: number[]; // e.g. [12] or null
    byday: string[];
    byhour: number;
    byminute: number;
    bysecond: number;
    until: string; // ISO timestamp string or null
    count: number; // number of recurrences or null

    meta: ICalendarEventMeta; // JSONB, generic key-value
    createdAt: string; // ISO timestamp string
    updatedAt: string; // ISO timestamp string
}

export class CalendarEvent implements ICalendarEvent {
    id: string;
    title: string;
    description: string;
    location: string;
    endTime: string;
    startTime: string;
    frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | '';
    interval: number;
    byweekday: string[];
    bymonthday: number[];
    bymonth: number[];
    byday: string[];
    byhour: number;
    byminute: number;
    bysecond: number;
    until: string;
    count: number;
    meta: CalendarEventMeta;
    createdAt: string;
    updatedAt: string;

    constructor(props: ICalendarEvent) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.location = props.location;
        this.startTime = props.startTime;
        this.endTime = props.endTime;
        this.frequency = props.frequency;
        this.interval = props.interval;
        this.byweekday = props.byweekday;
        this.bymonthday = props.bymonthday;
        this.bymonth = props.bymonth;
        this.byday = props.byday;
        this.byhour = props.byhour;
        this.byminute = props.byminute;
        this.bysecond = props.bysecond;
        this.until = props.until;
        this.count = props.count;
        this.meta = props.meta instanceof CalendarEventMeta ? props.meta : new CalendarEventMeta(props.meta);
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    public get isAllDay() {
        return !this.meta.isAllDay;
    }

    static deserialize = (row: EncodedCalendarEvent): CalendarEvent => {
        // console.log(row);
        return new CalendarEvent({
            id: row.id ?? '',
            title: row.title ?? '',
            description: row.description ?? '',
            location: row.location ?? '',
            endTime: row.end_time ?? '',
            startTime: row.start_time ?? '',
            frequency: row.frequency ?? '',
            interval: row.interval ?? 0,
            byweekday: row.byweekday ?? [],
            bymonthday: row.bymonthday ?? [],
            bymonth: row.bymonth ?? [],
            byday: row.byday ?? [],
            byhour: row.byhour ?? 0,
            byminute: row.byminute ?? 0,
            bysecond: row.bysecond ?? 0,
            until: row.until ?? '',
            count: row.count ?? 0,
            meta: CalendarEventMeta.deserialize(row.meta),
            createdAt: row.created_at ?? '',
            updatedAt: row.updated_at ?? '',
        });
    };

    public static sortFn = (a: CalendarEvent, b: CalendarEvent): number => {
        if (a.startTime == null || b.startTime == null) {
            if (a.startTime != null && b.startTime == null) return 1;
            if (a.startTime == null && b.startTime != null) return -1;
            return 0;
        }

        const aDate = DateTime.fromISO(a.startTime);
        const bDate = DateTime.fromISO(b.startTime);
        if (aDate > bDate) return 1;
        if (aDate < bDate) return -1;
        return 0;
    };

    public timeRange = () => {
        if (this.isAllDay) return 'All Day';
        if (this.startTime === 'TBD' || (!this.startTime && !this.endTime)) return 'TBD';

        let start = this.startTime;
        if (start && DateTimeUtils.isValidTime(start)) start = start.substring(0, 5);

        let end = this.endTime;
        if (end && DateTimeUtils.isValidTime(end)) end = end.substring(0, 5);

        if (start && end) return start + ' - ' + end;
        return start;
    };

    public serialize = (): EncodedCalendarEvent => ({
        id: this.id,
        title: this.title,
        description: this.description,
        location: this.location,
        start_time: this.startTime,
        end_time: this.endTime,
        frequency: this.frequency,
        interval: this.interval,
        byweekday: this.byweekday,
        bymonthday: this.bymonthday,
        bymonth: this.bymonth,
        byday: this.byday,
        byhour: this.byhour,
        byminute: this.byminute,
        bysecond: this.bysecond,
        until: this.until,
        count: this.count,
        meta: this.meta.serialize(),
        created_at: this.createdAt,
        updated_at: this.updatedAt,
    });
}
