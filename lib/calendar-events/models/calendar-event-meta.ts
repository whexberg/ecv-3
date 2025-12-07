import { JsonProperty, JsonType, Serializable } from '@/lib/utils/serialization';

export type EncodedCalendarEventMeta = {
    links: { url: string; text: string }[];
    start_date_tbd: boolean;
    start_time_tbd: boolean;
    end_date_tbd: boolean;
    end_time_tbd: boolean;
};

@Serializable
class LinkObject {
    url: string = '';
    text: string = '';
}

@Serializable
export class CalendarEventMeta {
    @JsonType([LinkObject])
    public links: LinkObject[] = [];

    @JsonProperty('start_date_tbd')
    public startDateTBD: boolean = false;

    @JsonProperty('start_time_tbd')
    public startTimeTBD: boolean = false;

    @JsonProperty('end_date_tbd')
    public endDateTBD: boolean = false;

    @JsonProperty('end_time_tbd')
    public endTimeTBD: boolean = false;
}
