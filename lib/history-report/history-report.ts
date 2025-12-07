import { DateTime } from 'luxon';

import { DateTimeUtils } from '@/lib/utils/date-time.utils';
import { JsonConverter, JsonDeserializer, JsonProperty, Serializable } from '@/lib/utils/serialization';

export type EncodedHistoryReport = {
    id?: string;
    title?: string;
    author?: string;
    date?: string;
    tags?: string[];
    body?: string;
    created_at?: string;
    updated_at?: string;
};

@Serializable
export class HistoryReport {
    id: string = '';
    title: string = '';
    author: string = '';

    @JsonDeserializer((v) => {
        if (typeof v === 'object') return v.toISOString().substring(0, 10);
        return v?.substring(0, 10) || '';
    })
    date: string = '';
    tags: string[] = [];
    body: string = '';

    @JsonProperty('created_at')
    @JsonConverter(DateTimeUtils.parseDateTime, DateTimeUtils.serializeDateTime)
    createdAt: DateTime = DateTime.now();

    @JsonProperty('updated_at')
    @JsonConverter(DateTimeUtils.parseDateTime, DateTimeUtils.serializeDateTime)
    updatedAt: DateTime = DateTime.now();
}
