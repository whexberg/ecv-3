import { DateTime } from 'luxon';

export interface IChapterEvent {
    id: string;
    title: string;
    description: string;
    location: string;
    contact: {
        name: string;
        email: string;
        phone: string;
    };
    startTime: DateTime;
    endTime: DateTime | null;
    timezone: string;
    isAllDay: boolean;
    type: string;
    isMembersOnly: boolean;
    isPublished: boolean;
    recurrenceRuleID: string | null;
    parentEventID: string | null;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class ChapterEvent implements IChapterEvent {
    public id: string;
    public title: string;
    public description: string;
    public location: string;
    public contact: { name: string; email: string; phone: string };
    public startTime: DateTime;
    public endTime: DateTime | null;
    public timezone: string;
    public isAllDay: boolean;
    public type: string;
    public isMembersOnly: boolean;
    public isPublished: boolean;
    public recurrenceRuleID: string | null;
    public parentEventID: string | null;
    public createdAt: DateTime;
    public updatedAt: DateTime;

    constructor(props: IChapterEvent) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.location = props.location;
        this.contact = props.contact;
        this.startTime = props.startTime;
        this.endTime = props.endTime;
        this.timezone = props.timezone;
        this.isAllDay = props.isAllDay;
        this.type = props.type;
        this.isMembersOnly = props.isMembersOnly;
        this.isPublished = props.isPublished;
        this.recurrenceRuleID = props.recurrenceRuleID;
        this.parentEventID = props.parentEventID;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}
