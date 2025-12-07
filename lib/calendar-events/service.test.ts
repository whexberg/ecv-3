import { DateTime } from 'luxon';

import { CalendarEvent } from '@/lib/calendar-events/models/calendar-event';
import { IEventsRepository } from '@/lib/calendar-events/repository';
import { CalendarEventsService, TimeUnit } from '@/lib/calendar-events/service';

// Mock repository implementation for testing
class MockEventsRepository implements IEventsRepository {
    private mockEvents: CalendarEvent[] = [];

    // setMockEvents(events: CalendarEvent[]): void {
    //     this.mockEvents = events;
    // }

    async destroy(): Promise<void> {}

    async createEvent(_data: CalendarEvent): Promise<CalendarEvent> {
        throw new Error('Not implemented in mock');
    }

    async getEvents(): Promise<CalendarEvent[]> {
        return this.mockEvents;
    }

    async getAllEventsInRange(start: DateTime, end: DateTime): Promise<CalendarEvent[]> {
        // Simple filter for testing - just check if events fall within range
        return this.mockEvents.filter((event) => {
            if (!event.startAt) return false;
            return event.startAt >= start && event.startAt <= end;
        });
    }

    async getEventById(id: string): Promise<CalendarEvent | undefined> {
        return this.mockEvents.find((e) => e.id === id);
    }

    async updateEvent(_id: string, _data: CalendarEvent): Promise<CalendarEvent> {
        throw new Error('Not implemented in mock');
    }

    async deleteEvent(_id: string): Promise<CalendarEvent> {
        throw new Error('Not implemented in mock');
    }
}

describe('CalendarEventsService', () => {
    let service: CalendarEventsService;
    let mockRepo: MockEventsRepository;

    beforeEach(() => {
        mockRepo = new MockEventsRepository();
        service = new CalendarEventsService(mockRepo);
    });

    describe('getEventsForCalendarView', () => {
        const testDate = DateTime.fromISO('2024-03-15T10:30:00', { zone: 'America/New_York' });

        it('should calculate day view range correctly', async () => {
            // Create a spy to capture the actual arguments passed to getAllEventsInRange
            const spy = jest.spyOn(mockRepo, 'getAllEventsInRange');
            await service.getEventsForCalendarView('day', testDate);
            expect(spy).toHaveBeenCalledWith(testDate.startOf('day'), testDate.endOf('day'));
        });

        it('should calculate week view range correctly', async () => {
            const spy = jest.spyOn(mockRepo, 'getAllEventsInRange');
            await service.getEventsForCalendarView('week', testDate);
            expect(spy).toHaveBeenCalledWith(testDate.startOf('week'), testDate.endOf('week'));
        });

        it('should calculate month view range correctly', async () => {
            const spy = jest.spyOn(mockRepo, 'getAllEventsInRange');
            await service.getEventsForCalendarView('month', testDate);
            expect(spy).toHaveBeenCalledWith(testDate.startOf('month'), testDate.endOf('month'));
        });

        it('should calculate year view range correctly', async () => {
            const spy = jest.spyOn(mockRepo, 'getAllEventsInRange');
            await service.getEventsForCalendarView('year', testDate);
            expect(spy).toHaveBeenCalledWith(testDate.startOf('year'), testDate.endOf('year'));
        });

        it('should throw error for invalid view type', async () => {
            await expect(service.getEventsForCalendarView('invalid' as TimeUnit, testDate)).rejects.toThrow(
                'Unknown calendar view type: invalid',
            );
        });
    });
});
