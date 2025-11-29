import { DateTime } from 'luxon';

import { CalendarEventMeta, ICalendarEventMeta } from '@/lib/models/calendar-event-meta';
import { Deserialized, Serializable, Serialized } from '@/lib/models/map-types';

export interface ICalendarEvent {
    id: Serializable<string, 'id', string>;
    title: Serializable<string>;
    description: Serializable<string>;
    location: Serializable<string>;

    startDateTime: Serializable<DateTime | null, 'start_datetime', string | null>;
    endDateTime: Serializable<DateTime | null, 'end_datetime', string | null>;
    timezone: Serializable<string>;
    isAllDay: Serializable<boolean, 'all_day'>;
    eventType: Serializable<string>;

    isMembersOnly: Serializable<boolean, 'is_members_only'>;
    isPublished: Serializable<boolean, 'is_published'>;
    parentEventId: Serializable<string | null>;
    recurrenceRuleId: Serializable<string | null>;

    meta: Serializable<CalendarEventMeta, 'meta', Record<string, unknown>>;
    createdAt: Serializable<DateTime, 'created_at', string>;
    updatedAt: Serializable<DateTime, 'updated_at', string>;
}

export class CalendarEvent implements Deserialized<ICalendarEvent> {
    id: string;
    title: string;
    description: string;
    location: string;

    startDateTime: DateTime | null;
    endDateTime: DateTime | null;
    timezone: string;
    isAllDay: boolean;
    eventType: string;

    isMembersOnly: boolean;
    isPublished: boolean;
    parentEventId: string | null;
    recurrenceRuleId: string | null;

    meta: CalendarEventMeta;
    createdAt: DateTime;
    updatedAt: DateTime;

    public get isMultiDay() {
        return this.startDateTime && this.endDateTime && this.endDateTime.day !== this.startDateTime.day;
    }

    constructor(props: Deserialized<ICalendarEvent>) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.location = props.location;
        this.startDateTime = props.startDateTime;
        this.endDateTime = props.endDateTime;
        this.timezone = props.timezone;
        this.isAllDay = props.isAllDay;
        this.eventType = props.eventType;
        this.isMembersOnly = props.isMembersOnly;
        this.isPublished = props.isPublished;
        this.parentEventId = props.parentEventId;
        this.recurrenceRuleId = props.recurrenceRuleId;
        this.meta = props.meta;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    public clone = (data?: Partial<Deserialized<ICalendarEvent>>): CalendarEvent => {
        const values = {
            id: this.id,
            title: this.title,
            description: this.description,
            location: this.location,
            startDateTime: this.startDateTime
                ? DateTime.fromObject(this.startDateTime.toObject(), { zone: this.timezone })
                : null,
            endDateTime: this.endDateTime
                ? DateTime.fromObject(this.endDateTime.toObject(), { zone: this.timezone })
                : null,
            timezone: this.timezone,
            isAllDay: this.isAllDay,
            eventType: this.eventType,
            isMembersOnly: this.isMembersOnly,
            isPublished: this.isPublished,
            parentEventId: this.parentEventId,
            recurrenceRuleId: this.recurrenceRuleId,
            meta: { ...this.meta },
            createdAt: DateTime.fromObject(this.createdAt.toObject(), { zone: this.timezone }),
            updatedAt: DateTime.fromObject(this.updatedAt.toObject(), { zone: this.timezone }),
            ...data,
        } satisfies Deserialized<ICalendarEvent>;

        return new CalendarEvent(values);
    };

    public static deserialize = (row: Serialized<ICalendarEvent>): CalendarEvent => {
        const startDateTime = row.start_datetime
            ? CalendarEvent.parseTimeStamp(row.start_datetime, row.timezone)
            : null;
        const endDateTime = row.end_datetime ? CalendarEvent.parseTimeStamp(row.end_datetime, row.timezone) : null;

        const values = {
            id: row.id ?? '',
            title: row.title ?? '',
            description: row.description ?? '',
            location: row.location ?? '',
            startDateTime,
            endDateTime,
            timezone: row.timezone,
            isAllDay: row.all_day ?? false,
            eventType: row.event_type,
            isMembersOnly: row.is_members_only,
            isPublished: row.is_published,
            parentEventId: row.parent_event_id,
            recurrenceRuleId: row.recurrence_rule_id,
            meta: CalendarEventMeta.deserialize(row.meta as unknown as Serialized<ICalendarEventMeta>),
            createdAt: CalendarEvent.parseTimeStamp(row.created_at),
            updatedAt: CalendarEvent.parseTimeStamp(row.updated_at),
        } satisfies Deserialized<ICalendarEvent>;

        return new CalendarEvent(values);
    };

    public serialize = (): Serialized<ICalendarEvent> => {
        const start_datetime = this.startDateTime ? this.startDateTime.toFormat('yyyy-MM-dd HH:mm:ss.SSS') : null;
        const end_datetime = this.endDateTime ? this.endDateTime.toFormat('yyyy-MM-dd HH:mm:ss.SSS') : null;

        const values = {
            id: this.id,
            title: this.title,
            description: this.description,
            location: this.location,
            start_datetime,
            end_datetime,
            timezone: this.timezone,
            all_day: this.isAllDay,
            event_type: this.eventType,
            is_members_only: this.isMembersOnly,
            is_published: this.isPublished,
            parent_event_id: this.parentEventId,
            recurrence_rule_id: this.recurrenceRuleId,
            meta: this.meta.serialize(),
            created_at: this.createdAt.toISO()!,
            updated_at: this.updatedAt.toISO()!,
        } satisfies Serialized<ICalendarEvent>;
        return values;
    };

    public timeRange = () => {
        if (this.isAllDay) return 'All Day';

        const start = this.meta.startTimeTBD ? 'TBD' : this.startDateTime?.toFormat('h:mma');
        const end = this.meta.endTimeTBD ? 'TBD' : this.endDateTime?.toFormat('h:mma');
        return start + ' - ' + end;
    };

    public static parseTimeStamp = (timestamp: string = '', zone?: string) => {
        if (/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{6}\+[0-9]{2}/.test(timestamp)) {
            const dt = DateTime.fromSQL(timestamp, { zone });
            if (!dt.isValid) throw new Error('Unable to parse timestamp: ' + timestamp);
            return dt;
        }

        if (/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}/.test(timestamp)) {
            const dt = DateTime.fromFormat(timestamp, 'yyyy-MM-dd hh:mm:ss.SSS', { zone });
            if (!dt.isValid) throw new Error('Unable to parse timestamp: ' + timestamp);
            return dt;
        }

        if (/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/.test(timestamp)) {
            const dt = DateTime.fromFormat(timestamp, 'yyyy-MM-dd hh:mm:ss', { zone });
            if (!dt.isValid) throw new Error('Unable to parse timestamp: ' + timestamp);
            return dt;
        }

        const dt = DateTime.fromISO(timestamp, { zone });
        if (dt.isValid) return dt;

        throw new Error('Invalid timestamp: ' + timestamp);
    };
}
