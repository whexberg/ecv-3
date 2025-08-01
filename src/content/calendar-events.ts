import { DateTime } from 'luxon';

import { CalendarEventsRepo } from '@/src/lib/database/calendar-events-repo';
import { EncodedCalendarEvent } from '@/src/lib/models/calendar-event';

export const CalendarEvents: Record<
    string,
    (Omit<EncodedCalendarEvent, 'id' | 'created_at' | 'updated_at'> & { id?: string })[]
> = {
    '2025-02-08': [
        {
            description:
                "The 43rd Annual Bean Feed and Hawkers' Faire will be held at 1273 High Street, Auburn, CA. Cost: $40 at the door.",
            id: '6ae11dc1-6f48-456e-a32e-a96f6bdd0251',
            meta: {},
            location: '1273 High Street, Auburn, CA.',
            start_date: '2025-02-08',
            start_time: '07:03-07:00',
            title: 'Bean Feed',
            end_date: '2025-02-08',
            end_time: '',
        },
    ],
    '2025-04-25': [
        {
            description: 'The Return to Foresthill!',
            id: 'bb63b259-8c5c-4c65-ac61-5626cdd38a50',
            meta: {
                links: [{ text: 'Event Page', url: '/events/6030-spring-doins' }],
                recurrence: 'yearly',
            },
            location: 'Foresthill',
            start_date: DateTime.fromObject(
                {
                    year: 2025,
                    month: 4,
                    day: 25,
                    hour: 7,
                    minute: 3,
                },
                { zone: 'America/Los_Angeles' },
            ).toISODate()!,
            start_time: DateTime.fromObject(
                {
                    year: 2025,
                    month: 4,
                    day: 25,
                    hour: 7,
                    minute: 3,
                },
                { zone: 'America/Los_Angeles' },
            ).toISOTime()!,
            end_date: DateTime.fromObject(
                {
                    year: 2025,
                    month: 4,
                    day: 27,
                },
                { zone: 'America/Los_Angeles' },
            ).toISODate()!,
            end_time: '',
            title: 'Spring Doins',
        },
    ],
    '2025-05-16': [
        {
            start_date: '2025-05-16',
            description: '',
            id: '147d7ba7-9a17-4981-8c94-47f439fd0d4a',
            meta: {},
            location: '',
            start_time: 'TBD',
            title: 'Grand Council',
            end_date: '',
            end_time: '',
        },
    ],
    '2025-05-17': [
        {
            start_date: '2025-05-17',
            description: '',
            id: '4efc2059-1ca6-4d09-ab4f-305256d1ad87',
            meta: {},
            location: '',
            start_time: 'TBD',
            title: 'Grand Council',
            end_date: '',
            end_time: '',
        },
    ],
    '2025-05-18': [
        {
            start_date: '2025-05-18',
            description: '',
            id: 'ebdba01a-3412-4d24-9fd7-9efd5e01086a',
            meta: {},
            location: '',
            start_time: 'TBD',
            title: 'Grand Council',
            end_date: '',
            end_time: '',
        },
    ],
    '2025-06-01': [
        {
            start_date: '2025-06-01',
            description: '',
            id: '55489448-83b4-4e92-a7fa-25d32da68fba',
            meta: {},
            location: 'Meadow Vista',
            start_time: 'TBD',
            title: 'Pioneer Day Parade',
            end_date: '',
            end_time: '',
        },
    ],
    '2025-06-14': [
        {
            start_date: '2025-06-14',
            description: '',
            id: 'e7e37769-7ecf-40fd-bea7-73756257e44a',
            meta: {},
            location: 'TBD',
            start_time: 'TBD',
            title: 'Family Picnic',
            end_date: '',
            end_time: '',
        },
    ],
    '2025-06-27': [
        {
            start_date: '2025-06-27',
            description: '',
            id: '46abb52f-9e97-4b8d-91d6-759dab9712d8',
            meta: {},
            location: 'Somewhere in Wyoming',
            start_time: 'TBD',
            title: 'Wyoming 3-Way',
            end_date: '',
            end_time: '',
        },
    ],
    '2025-06-28': [
        {
            start_date: '2025-06-28',
            description: '',
            id: '0feb748a-a1f2-4ae5-9017-f10d1e996167',
            meta: {},
            location: 'Somewhere in Wyoming',
            start_time: 'TBD',
            title: 'Wyoming 3-Way',
            end_date: '',
            end_time: '',
        },
    ],
    '2025-06-29': [
        {
            start_date: '2025-06-29',
            description: '',
            id: 'e0e1a195-af1c-48fe-b9a6-9a5add1ec496',
            meta: {},
            location: 'Somewhere in Wyoming',
            start_time: 'TBD',
            title: 'Wyoming 3-Way',
            end_date: '',
            end_time: '',
        },
    ],
    '2025-07-04': [
        {
            start_date: '2025-07-04',
            description: "Foresthill's annual 4th of July parade",
            id: '1f79098a-5a33-43d9-b483-fced3d9a0ba2',
            meta: {},
            location: 'Foresthill',
            start_time: 'TBD',
            title: '4th of July Parade',
            end_date: '',
            end_time: '',
        },
    ],
    '2025-07-11': [
        {
            start_date: '2025-07-11',
            description: '',
            id: '48324ee6-0398-46a8-91f1-b9bf4c9246f8',
            meta: {},
            location: 'Nobody knows',
            start_time: 'TBD',
            title: 'T.R.A.S.H.',
            end_date: '',
            end_time: '',
        },
    ],
    '2025-07-12': [
        {
            start_date: '2025-07-12',
            description: '',
            id: '903343a5-315e-4485-ae17-4200d10ff02f',
            meta: {},
            location: 'Nobody knows',
            start_time: 'TBD',
            title: 'T.R.A.S.H.',
            end_date: '',
            end_time: '',
        },
    ],
    '2025-07-13': [
        {
            start_date: '2025-07-13',
            description: '',
            id: '60b409ce-7b24-4741-a586-ecdea7a858fb',
            meta: {},
            location: 'Nobody knows',
            start_time: 'TBD',
            title: 'T.R.A.S.H.',
            end_date: '',
            end_time: '',
        },
    ],
    '2025-12-06': [
        {
            start_date: '2025-12-06',
            description: "Let's make it a Merry Christmas for the kids!",
            id: 'e34ad4f3-686e-4be3-b8ed-048a3c90d2f3',
            meta: { recurrence: 'yearly' },
            location: 'Walmart',
            start_time: 'TBD',
            title: 'Receiving Home Toy Drive',
            end_date: '',
            end_time: '',
        },
    ],
};

Object.entries(CalendarEvents).forEach(([date, events]) =>
    events.forEach(async (event) => {
        event.start_time ||= 'TBD';
        event.end_time ||= '';
        event.start_date ||= date;
        event.end_date ||= date;
        await CalendarEventsRepo.createEvent(event);
    }),
);
