export interface EncodedCalendarEventMeta {
    links?: Array<{ url: string; text: string }>;
    recurrence?: string;
    start_date_tbd?: boolean;
    start_time_tbd?: boolean;
    end_date_tbd?: boolean;
    end_time_tbd?: boolean;
    is_all_day?: boolean;
}

export interface ICalendarEventMeta {
    links: Array<{ url: string; text: string }>;
    recurrence: string;
    startDateTBD: boolean;
    startTimeTBD: boolean;
    endDateTBD: boolean;
    endTimeTBD: boolean;
    isAllDay: boolean;
}

export class CalendarEventMeta implements ICalendarEventMeta {
    links: Array<{ url: string; text: string }>;
    recurrence: string;
    startDateTBD: boolean;
    startTimeTBD: boolean;
    endDateTBD: boolean;
    endTimeTBD: boolean;
    isAllDay: boolean;

    constructor(props: ICalendarEventMeta) {
        this.links = props.links;
        this.recurrence = props.recurrence;
        this.startDateTBD = props.startDateTBD;
        this.startTimeTBD = props.startTimeTBD;
        this.endDateTBD = props.endDateTBD;
        this.endTimeTBD = props.endTimeTBD;
        this.isAllDay = props.isAllDay;
    }

    static deserialize = (d?: EncodedCalendarEventMeta): CalendarEventMeta => {
        return new CalendarEventMeta({
            links: d?.links ?? [],
            recurrence: d?.recurrence ?? '',
            startDateTBD: d?.start_date_tbd ?? false,
            startTimeTBD: d?.start_time_tbd ?? false,
            endDateTBD: d?.end_date_tbd ?? false,
            endTimeTBD: d?.end_time_tbd ?? false,
            isAllDay: d?.is_all_day ?? false,
        });
    };

    public serialize = (): EncodedCalendarEventMeta => ({
        links: this.links,
        recurrence: this.recurrence,
        start_date_tbd: this.startDateTBD,
        start_time_tbd: this.startTimeTBD,
        end_date_tbd: this.endDateTBD,
        end_time_tbd: this.endTimeTBD,
        is_all_day: this.isAllDay,
    });
}
