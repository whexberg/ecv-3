import { DateTime } from 'luxon';

import { CalendarEvent } from '@/lib/calendar-events/models/calendar-event';
import { IEventsRepository } from '@/lib/calendar-events/repository';
import { serialize } from '@/lib/utils/serialization';

export type TimeUnit = 'day' | 'week' | 'month' | 'year';

export type ICalendarEventsService = {
    createEvent: (data: CalendarEvent) => Promise<CalendarEvent>;
    listEvents: () => Promise<CalendarEvent[]>;
    listEventsInRange: (start: DateTime, end: DateTime) => Promise<CalendarEvent[]>;
    getEventsForCalendarView: (viewType: TimeUnit, baseDate: DateTime) => Promise<CalendarEvent[]>;
    findEventById: (id: string) => Promise<CalendarEvent | undefined>;
    updateEvent: (data: CalendarEvent) => Promise<CalendarEvent>;
    deleteEvent: (id: string) => Promise<CalendarEvent>;
    destroy: () => Promise<void>;
};

export class CalendarEventsService implements ICalendarEventsService {
    private eventsRepository: IEventsRepository;

    public constructor(eventsRepository: IEventsRepository) {
        this.eventsRepository = eventsRepository;
    }

    public createEvent = async (event: CalendarEvent) => {
        return await this.eventsRepository.createEvent(serialize(event));
    };

    public listEvents = async (): Promise<CalendarEvent[]> => {
        return await this.eventsRepository.getEvents();
    };

    public listEventsInRange = async (start: DateTime, end: DateTime): Promise<CalendarEvent[]> => {
        return await this.eventsRepository.getAllEventsInRange(start, end);
    };

    public getEventsForCalendarView = async (viewType: TimeUnit, baseDate: DateTime): Promise<CalendarEvent[]> => {
        const { start, end } = this.calculateViewRange(viewType, baseDate);
        return await this.eventsRepository.getAllEventsInRange(start, end);
    };

    public findEventById = async (id: string) => {
        return await this.eventsRepository.getEventById(id);
    };

    public updateEvent = async (data: CalendarEvent) => {
        return await this.eventsRepository.updateEvent(data.id, data);
    };

    public deleteEvent = async (id: string) => {
        return await this.eventsRepository.deleteEvent(id);
    };

    public destroy = async () => {
        return await this.eventsRepository.destroy();
    };

    private calculateViewRange = (viewType: TimeUnit, baseDate: DateTime): { start: DateTime; end: DateTime } => {
        switch (viewType) {
            case 'day':
                return {
                    start: baseDate.startOf('day'),
                    end: baseDate.endOf('day'),
                };

            case 'week':
                return {
                    start: baseDate.startOf('week'),
                    end: baseDate.endOf('week'),
                };

            case 'month':
                return {
                    start: baseDate.startOf('month'),
                    end: baseDate.endOf('month'),
                };

            case 'year':
                return {
                    start: baseDate.startOf('year'),
                    end: baseDate.endOf('year'),
                };

            default:
                throw new Error(`Unknown calendar view type: ${viewType}`);
        }
    };
}
