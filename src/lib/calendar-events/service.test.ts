import { DeleteResult } from 'kysely';
import { DateTime } from 'luxon';

import { TestUtils } from '@/__test__/util';

import { ICalendarEventsRepository } from './repository';
import { CalendarEventsService } from './service';

describe('CalendarEventsService', () => {
    let repo: ICalendarEventsRepository;
    let svc: CalendarEventsService;

    beforeEach(() => {
        repo = TestUtils.createTestRepo();
        svc = new CalendarEventsService(repo);
    });

    describe('createEvent', () => {
        it('passes calendar event to repository when creating a calendar event', async () => {
            // Arrange
            const testEvent = TestUtils.createTestCalendarEvent();
            (repo.createEvent as jest.Mock).mockResolvedValue(testEvent);

            // Act
            const result = await svc.createEvent(testEvent);

            // Assert
            expect(repo.createEvent).toHaveBeenCalledWith(testEvent);
            expect(result).toBe(testEvent);
        });
    });

    describe('listEventsInRange', () => {
        it('passes start and end dates to repository when listing events in range', async () => {
            // Arrange
            const start = DateTime.now();
            const end = start.plus({ days: 7 });
            const events = [TestUtils.createTestCalendarEvent(), TestUtils.createTestCalendarEvent()];
            (repo.getAllEventsInRange as jest.Mock).mockResolvedValue(events);

            // Act
            const result = await svc.listEventsInRange(start, end);

            // Assert
            expect(repo.getAllEventsInRange).toHaveBeenCalledWith(start, end);
            expect(result).toBe(events);
        });
    });

    describe('findEventById', () => {
        it('passes id to repository when finding an event by id', async () => {
            // Arrange
            const id = 'test-id';
            const event = TestUtils.createTestCalendarEvent({ id });
            (repo.getEventById as jest.Mock).mockResolvedValue(event);

            // Act
            const result = await svc.findEventById(id);

            // Assert
            expect(repo.getEventById).toHaveBeenCalledWith(id);
            expect(result).toBe(event);
        });

        it('returns undefined when repository returns undefined', async () => {
            // Arrange
            const id = 'non-existent-id';
            (repo.getEventById as jest.Mock).mockResolvedValue(undefined);

            // Act
            const result = await svc.findEventById(id);

            // Assert
            expect(repo.getEventById).toHaveBeenCalledWith(id);
            expect(result).toBeUndefined();
        });
    });

    describe('updateEvent', () => {
        it('passes event data to repository when updating an event', async () => {
            // Arrange
            const testEvent = TestUtils.createTestCalendarEvent();
            (repo.updateEvent as jest.Mock).mockResolvedValue(testEvent);

            // Act
            const result = await svc.updateEvent(testEvent);

            // Assert
            expect(repo.updateEvent).toHaveBeenCalledWith(testEvent.id, testEvent);
            expect(result).toBe(testEvent);
        });
    });

    describe('deleteEvent', () => {
        it('passes id to repository when deleting an event', async () => {
            // Arrange
            const id = 'test-id';
            const deleteResult: DeleteResult[] = [{ numDeletedRows: 1n }];
            (repo.deleteEvent as jest.Mock).mockResolvedValue(deleteResult);

            // Act
            await svc.deleteEvent(id);

            // Assert
            expect(repo.deleteEvent).toHaveBeenCalledWith(id);
        });
    });

    describe('destroy', () => {
        it('calls destroy on the repository', async () => {
            // Arrange
            (repo.destroy as jest.Mock).mockResolvedValue(undefined);

            // Act
            await svc.destroy();

            // Assert
            expect(repo.destroy).toHaveBeenCalled();
        });
    });
});
