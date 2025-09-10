import { Deserialized, Serializable, Serialized } from '@/src/lib/models/map-types';

export interface ICalendarEventMeta {
    links: Serializable<Array<{ url: string; text: string }>>;
    startDateTBD: Serializable<boolean, 'start_date_tbd'>;
    startTimeTBD: Serializable<boolean, 'start_time_tbd'>;
    endDateTBD: Serializable<boolean, 'end_date_tbd'>;
    endTimeTBD: Serializable<boolean, 'end_time_tbd'>;
}

export class CalendarEventMeta implements Deserialized<ICalendarEventMeta> {
    public links: Array<{ url: string; text: string }>;
    public startDateTBD: boolean;
    public startTimeTBD: boolean;
    public endDateTBD: boolean;
    public endTimeTBD: boolean;

    constructor(props: Deserialized<ICalendarEventMeta>) {
        this.links = props.links;
        this.startDateTBD = props.startDateTBD;
        this.startTimeTBD = props.startTimeTBD;
        this.endDateTBD = props.endDateTBD;
        this.endTimeTBD = props.endTimeTBD;
    }

    public static deserialize = (d: Serialized<ICalendarEventMeta>): CalendarEventMeta => {
        const values: Deserialized<ICalendarEventMeta> = {
            links: d.links,
            startDateTBD: d.start_date_tbd,
            startTimeTBD: d.start_time_tbd,
            endDateTBD: d.end_date_tbd,
            endTimeTBD: d.end_time_tbd,
        };

        return new CalendarEventMeta(values);
    };

    public serialize = (): Serialized<ICalendarEventMeta> => {
        return {
            links: this.links,
            start_date_tbd: this.startDateTBD,
            start_time_tbd: this.startTimeTBD,
            end_date_tbd: this.endDateTBD,
            end_time_tbd: this.endTimeTBD,
        };
    };
}
