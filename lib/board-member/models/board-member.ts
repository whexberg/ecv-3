import { DateTime } from 'luxon';

import { DateTimeUtils } from '@/lib/utils/date-time.utils';
import { JsonConverter, JsonProperty, Serializable } from '@/lib/utils/serialization';

export type EncodedBoardMember = {
    id?: string;
    name?: string;
    image?: string;
    position?: string;
    label?: string;
    created_at?: string | null;
    updated_at?: string | null;
};

@Serializable
export class BoardMember {
    id: string = '';
    name: string = '';
    image: string = '';
    position: string = '';
    label: string = '';
    @JsonProperty('created_at')
    @JsonConverter(DateTimeUtils.parseDateTime, DateTimeUtils.serializeDateTime)
    createdAt: DateTime | null = null;
    @JsonProperty('updated_at')
    @JsonConverter(DateTimeUtils.parseDateTime, DateTimeUtils.serializeDateTime)
    updatedAt: DateTime | null = null;
}
