import { createHash } from 'crypto';
import { DateObjectUnits, DateTime } from 'luxon';

import { CalendarEventMeta, EncodedCalendarEventMeta } from '@/lib/calendar-events/models/calendar-event-meta';
import { DateTimeUtils } from '@/lib/utils/date-time.utils';
import { deserialize, JsonConverter, JsonProperty, JsonType, Serializable, serialize } from '@/lib/utils/serialization';

type UUID = string;
const UUID_NAMESPACE = 'd4b0c65e-8f36-4e5e-9a4b-1c8c9a0b9d7c'; // arbitrary fixed namespace
const formatOccurrenceDate = (occurrenceDate: DateObjectUnits) =>
    DateTime.fromObject(occurrenceDate).set({ millisecond: 0 }).toJSDate().toISOString();

export type EncodedCalendarEvent = {
    id?: string;
    title?: string;
    description?: string;
    location?: string;
    start_at?: string | null;
    end_at?: string | null;
    timezone?: string;
    all_day?: boolean;
    event_type?: string;
    is_members_only?: boolean;
    is_published?: boolean;
    content?: string;
    meta?: EncodedCalendarEventMeta;
    created_at?: string | null;
    updated_at?: string | null;
};

@Serializable
export class CalendarEvent {
    id: string = '';
    title: string = '';
    description: string = '';
    location: string = '';

    @JsonProperty('start_at')
    @JsonConverter(DateTimeUtils.parseDateTime, DateTimeUtils.serializeDateTime)
    startAt: DateTime | null = null;

    @JsonProperty('end_at')
    @JsonConverter(DateTimeUtils.parseDateTime, DateTimeUtils.serializeDateTime)
    endAt: DateTime | null = null;

    timezone: string = '';

    @JsonProperty('all_day')
    isAllDay: boolean = false;

    @JsonProperty('event_type')
    eventType: string = '';

    @JsonProperty('is_members_only')
    isMembersOnly: boolean = false;

    @JsonProperty('is_published')
    isPublished: boolean = false;

    content: string = '';

    @JsonType(CalendarEventMeta)
    meta: CalendarEventMeta = new CalendarEventMeta();

    @JsonProperty('created_at')
    @JsonConverter(DateTimeUtils.parseDateTime, DateTimeUtils.serializeDateTime)
    createdAt: DateTime | null = DateTime.now();

    @JsonProperty('updated_at')
    @JsonConverter(DateTimeUtils.parseDateTime, DateTimeUtils.serializeDateTime)
    updatedAt: DateTime | null = DateTime.now();

    public get isMultiDay() {
        return this.startAt && this.endAt && this.endAt.day !== this.startAt.day;
    }

    public get timeRange() {
        if (this.isAllDay) return 'All Day';

        const start = this.meta.startTimeTBD ? 'TBD' : this.startAt?.toFormat('h:mma');
        const end = this.meta.endTimeTBD ? 'TBD' : this.endAt?.toFormat('h:mma');
        return start + ' - ' + end;
    }

    public static sortEvents = (events: CalendarEvent[]): CalendarEvent[] => events.sort(CalendarEvent.compareFn);

    public static compareFn = (a: CalendarEvent, b: CalendarEvent) => a.startAt!.diff(b.startAt!).as('milliseconds');

    public static makeId(
        baseId: string,
        occurrenceDate?: DateObjectUnits,
        type: 'base' | 'occurrence' | 'addition' | 'exception' = 'base',
    ): UUID {
        let data = baseId;

        switch (type) {
            case 'base':
                data += ':base-event';
                break;
            case 'occurrence':
                if (!occurrenceDate) throw new Error('occurrenceDate is required for occurrence ID');
                data += `:${formatOccurrenceDate(occurrenceDate)}`;
                break;
            case 'addition':
                if (!occurrenceDate) throw new Error('occurrenceDate is required for addition ID');
                data += `:${formatOccurrenceDate(occurrenceDate)}:addition`;
                break;
            case 'exception':
                if (!occurrenceDate) throw new Error('occurrenceDate is required for exception ID');
                data += `:${formatOccurrenceDate(occurrenceDate)}:exception`;
                break;
        }

        // return uuid(data, EventModel.UUID_NAMESPACE);
        // Using SHA-1 hash to mimic UUIDv5
        const hash = createHash('sha1')
            .update(data + UUID_NAMESPACE)
            .digest('hex');

        // Format into UUID v5 structure
        return `${hash.substring(0, 8)}-${hash.substring(8, 12)}-${hash.substring(12, 16)}-${hash.substring(16, 20)}-${hash.substring(20, 32)}` as UUID;
    }
}
