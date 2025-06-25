import { DateTime } from 'luxon';

export interface CalendarEventRow {
    id: string;
    title: string;
    description: string;
    location: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    meta: { links?: Array<{ url: string; text: string }>; recurrence?: string };
    created_at: string;
    updated_at: string;
}

export interface ICalendarEvent {
    id: string;
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    meta: { links?: Array<{ url: string; text: string }>; recurrence?: string };
    createdAt: string;
    updatedAt: string;
}

export class CalendarEvent implements ICalendarEvent {
    id: string;
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    meta: { links?: Array<{ url: string; text: string }>; recurrence?: string };
    createdAt: string;
    updatedAt: string;

    constructor(props: ICalendarEvent) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.location = props.location;
        this.startDate = props.startDate;
        this.startTime = props.startTime;
        this.endDate = props.endDate;
        this.endTime = props.endTime;
        this.meta = props.meta;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    public get isAllDay() {
        return !this.startTime && !this.endTime;
    }

    static deserialize = (row: CalendarEventRow): CalendarEvent => {
        return new CalendarEvent({
            id: row.id,
            title: row.title,
            description: row.description,
            location: row.location,
            endDate: row.end_date,
            endTime: row.end_time,
            startDate: row.start_date,
            startTime: row.start_time,
            meta: row.meta,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        });
    };

    public static sortFn = (a: CalendarEvent, b: CalendarEvent): number => {
        const aDate = DateTime.fromISO(a.startDate);
        const bDate = DateTime.fromISO(b.startDate);
        return aDate.diff(bDate, 'days').as('days');
    };

    public timeRange = () => {
        if (this.isAllDay) return 'All Day';
        if (this.startTime === 'TBD' || (!this.startTime && !this.endTime)) return 'TBD';

        let start = this.startTime;
        if (start) {
            if (/\d{2}:\d{2}:\d{2}.\d{3}-\d{2}:\d{2}/.test(start)) {
                start = start.substring(0, 5);
            } else {
                console.log('start', start);
            }
        }

        let end = this.endTime;
        if (end) {
            if (/\d{2}:\d{2}:\d{2}.\d{3}/.test(end)) {
                end = start.substring(0, 5);
            } else {
                console.log('end', end);
            }
        }

        if (start && end) return start + ' - ' + end;
        return start;
    };

    public serialize = (): CalendarEventRow => ({
        id: this.id,
        title: this.title,
        description: this.description,
        location: this.location,
        start_date: this.startDate,
        start_time: this.startTime,
        end_date: this.endDate,
        end_time: this.endTime,
        meta: this.meta,
        created_at: this.createdAt,
        updated_at: this.updatedAt,
    });
}
