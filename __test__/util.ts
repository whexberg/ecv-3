import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

import { ICalendarEventsRepository } from '@/src/lib/calendar-events/repository';
import { CalendarEvent } from '@/src/lib/models/calendar-event';
import { CalendarEventMeta } from '@/src/lib/models/calendar-event-meta';

type EventType = 'meeting' | 'doins' | 'picnic' | 'ceremony' | 'social' | 'fundraiser' | 'historical' | 'other';

const EVENT_TYPES: EventType[] = [
    'meeting',
    'doins',
    'picnic',
    'ceremony',
    'social',
    'fundraiser',
    'historical',
    'other',
];

const COMMON_TIMEZONES = [
    'America/Los_Angeles',
    'America/Denver',
    'America/Chicago',
    'America/New_York',
    'America/Phoenix',
];

const maybeNull = <T>(value: T, probability = 0.2): T | null =>
    faker.datatype.boolean({ probability }) ? null : value;

export const TestUtils = {
    fakeEvent: (overrides: Partial<CalendarEvent> = {}): CalendarEvent => {
        const isAllDay = faker.datatype.boolean({ probability: 0.1 });
        const isPublished = faker.datatype.boolean({ probability: 0.85 });
        const isMembersOnly = faker.datatype.boolean({ probability: 0.2 });

        // Timestamps
        const createdAt: DateTime = DateTime.fromJSDate(faker.date.recent({ days: 60 }), { zone: 'utc' })!;
        const updatedAt: DateTime = DateTime.fromJSDate(
            faker.date.between({ from: createdAt.toJSDate(), to: new Date() }),
            { zone: 'utc' },
        )!;

        // Normalize for all-day vs timed events
        const timezone = faker.datatype.boolean({ probability: 0.7 })
            ? 'America/Los_Angeles'
            : faker.helpers.arrayElement(COMMON_TIMEZONES);
        const startDate = DateTime.fromJSDate(faker.date.soon({ days: 120 }), {
            zone: timezone,
        });
        let endDate: DateTime | null = null;

        if (isAllDay) {
            startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
            endDate = startDate.endOf('day');
        } else {
            endDate = startDate.plus({ hours: faker.number.int({ min: 1, max: 6 }) });
        }

        return new CalendarEvent({
            id: faker.string.uuid(),
            title: faker.company.buzzPhrase(),
            description: maybeNull(faker.lorem.paragraphs({ min: 1, max: 3 })) ?? '',
            location:
                maybeNull(`${faker.location.city()}, ${faker.location.state()} — ${faker.company.name()}`, 0.15) ?? '',
            startDateTime: startDate,
            endDateTime: endDate,
            timezone,
            isAllDay,
            eventType: faker.helpers.arrayElement(EVENT_TYPES),
            isMembersOnly,
            isPublished,
            recurrenceRuleId: null,
            parentEventId: null,
            createdAt,
            updatedAt,
            ...overrides,
            meta: CalendarEventMeta.deserialize({
                end_time_tbd: false,
                end_date_tbd: false,
                links: [],
                start_time_tbd: false,
                start_date_tbd: false,
                ...overrides.meta,
            }),
        });
    },
    createTestCalendarEvent: (overrides: Partial<CalendarEvent> = {}): CalendarEvent => {
        const now = DateTime.now();

        return new CalendarEvent({
            id: 'test-id',
            title: 'Test Event',
            description: 'Test Description',
            location: 'Test Location',
            startDateTime: now,
            endDateTime: now.plus({ hours: 2 }),
            timezone: 'America/Los_Angeles',
            isAllDay: false,
            eventType: 'test',
            isMembersOnly: false,
            isPublished: true,
            parentEventId: null,
            recurrenceRuleId: null,
            meta: new CalendarEventMeta({
                links: [],
                startDateTBD: false,
                startTimeTBD: false,
                endDateTBD: false,
                endTimeTBD: false,
            }),
            createdAt: now,
            updatedAt: now,
            ...overrides,
        });
    },
    createTestRepo: () =>
        ({
            createEvent: jest.fn(),
            getAllEventsInRange: jest.fn(),
            getEventById: jest.fn(),
            updateEvent: jest.fn(),
            deleteEvent: jest.fn(),
            destroy: jest.fn(),
            getEvents: jest.fn(),
        }) as ICalendarEventsRepository,
};
