import { DateTime } from 'luxon';

import { DateTimeUtils } from '@/lib/utils/date-time.utils';
import { deserialize, JsonConverter, JsonProperty, Serializable, serialize } from '@/lib/utils/serialization';

@Serializable
export class RecurrenceRule {
    id: string = '';
    label: string = '';
    rrule: string = '';

    @JsonConverter(DateTimeUtils.parseDateTime, DateTimeUtils.serializeDateTime)
    start: DateTime = DateTime.now();

    @JsonConverter((v) => DateTimeUtils.parseDateTime(v, { allowNull: true }), DateTimeUtils.serializeDateTime)
    until: DateTime | null = null;

    count: number | null = null;
    tzid: string = '';

    @JsonProperty('created_at')
    @JsonConverter(DateTimeUtils.parseDateTime, DateTimeUtils.serializeDateTime)
    createdAt: DateTime = DateTime.now();

    @JsonProperty('updated_at')
    @JsonConverter(DateTimeUtils.parseDateTime, DateTimeUtils.serializeDateTime)
    updatedAt: DateTime = DateTime.now();

    public static clone = (data?: RecurrenceRule): RecurrenceRule => deserialize(serialize(data), RecurrenceRule);
}
