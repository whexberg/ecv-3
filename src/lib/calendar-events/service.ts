import { DateTime } from 'luxon';

import { CalendarEvent } from '../models/calendar-event';
import { ICalendarEventsRepository } from './repository';

export type ICalendarEventsService = {
    createEvent: (data: CalendarEvent) => Promise<CalendarEvent>;
    listEvents: () => Promise<CalendarEvent[]>;
    listEventsInRange: (start: DateTime, end: DateTime) => Promise<CalendarEvent[]>;
    findEventById: (id: string) => Promise<CalendarEvent | undefined>;
    updateEvent: (data: CalendarEvent) => Promise<CalendarEvent>;
    deleteEvent: (id: string) => Promise<void>;
    destroy: () => Promise<void>;
};

export class CalendarEventsService implements ICalendarEventsService {
    public constructor(private repo: ICalendarEventsRepository) {}

    public createEvent = async (event: CalendarEvent) => await this.repo.createEvent(event);

    public listEvents = async (): Promise<CalendarEvent[]> => await this.repo.getEvents();

    public listEventsInRange = (start: DateTime, end: DateTime) => {
        // figure out when default start and end should be
        return this.repo.getAllEventsInRange(start, end);
    };

    public findEventById = (id: string) => this.repo.getEventById(id);

    public updateEvent = (data: CalendarEvent) => this.repo.updateEvent(data.id, data);

    public deleteEvent = async (id: string) => void this.repo.deleteEvent(id);

    public destroy = () => this.repo.destroy();
}
