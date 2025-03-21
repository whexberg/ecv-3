import { endOfDay, startOfDay } from 'date-fns';

export const CalendarEvents: Record<string, CalendarEvent[]> = {
    '2025-02-08': [
        {
            attendees: [],
            description:
                "The 43rd Annual Bean Feed and Hawkers' Faire will be held at 1273 High Street, Auburn, CA. Cost: $40 at the door.",
            id: '6ae11dc1-6f48-456e-a32e-a96f6bdd0251',
            isAllDay: false,
            links: [],
            location: '1273 High Street, Auburn, CA.',
            recurrence: null,
            times: { start: '7:03AM' },
            title: 'Bean Feed',
        },
    ],
    '2025-04-25': [
        {
            attendees: [],
            description: 'The Return to Foresthill!',
            id: 'bb63b259-8c5c-4c65-ac61-5626cdd38a50',
            isAllDay: true,
            links: [{ text: 'Event Page', url: '/events/6030-spring-doins' }],
            location: 'Foresthill',
            recurrence: 'yearly',
            times: { start: new Date(2025, 3, 25, 7, 3), end: endOfDay(new Date(2025, 3, 25)) },
            title: 'Spring Doins',
        },
    ],
    '2025-04-26': [
        {
            attendees: [],
            description: 'The Return to Foresthill!',
            id: '1f166898-490b-4541-8e57-74efaaea13b0',
            isAllDay: true,
            links: [{ text: 'Event Page', url: '/events/6030-spring-doins' }],
            location: 'Foresthill',
            recurrence: 'yearly',
            times: { start: startOfDay(new Date(2025, 3, 26)), end: endOfDay(new Date(2025, 3, 26)) },
            title: 'Spring Doins',
        },
    ],
    '2025-04-27': [
        {
            attendees: [],
            description: 'The Return to Foresthill!',
            id: '943e9edb-6566-4f74-b8e4-a4a7e58ec891',
            isAllDay: true,
            links: [{ text: 'Event Page', url: '/events/6030-spring-doins' }],
            location: 'Foresthill',
            recurrence: 'yearly',
            times: { start: startOfDay(new Date(2025, 3, 27)), end: endOfDay(new Date(2025, 3, 27, 7, 3)) },
            title: 'Spring Doins',
        },
    ],
    '2025-05-16': [
        {
            attendees: [],
            description: '',
            id: '147d7ba7-9a17-4981-8c94-47f439fd0d4a',
            isAllDay: true,
            links: [],
            location: '',
            recurrence: null,
            times: { start: 'TBD' },
            title: 'Grand Council',
        },
    ],
    '2025-05-17': [
        {
            attendees: [],
            description: '',
            id: '4efc2059-1ca6-4d09-ab4f-305256d1ad87',
            isAllDay: true,
            links: [],
            location: '',
            recurrence: null,
            times: { start: 'TBD' },
            title: 'Grand Council',
        },
    ],
    '2025-05-18': [
        {
            attendees: [],
            description: '',
            id: 'ebdba01a-3412-4d24-9fd7-9efd5e01086a',
            isAllDay: true,
            links: [],
            location: '',
            recurrence: null,
            times: { start: 'TBD' },
            title: 'Grand Council',
        },
    ],
    '2025-06-01': [
        {
            attendees: [],
            description: '',
            id: '55489448-83b4-4e92-a7fa-25d32da68fba',
            isAllDay: false,
            links: [],
            location: 'Meadow Vista',
            recurrence: null,
            times: { start: 'TBD' },
            title: 'Pioneer Day Parade',
        },
    ],
    '2025-06-14': [
        {
            attendees: [],
            description: '',
            id: 'e7e37769-7ecf-40fd-bea7-73756257e44a',
            isAllDay: false,
            links: [],
            location: 'TBD',
            recurrence: null,
            times: { start: 'TBD' },
            title: 'Family Picnic',
        },
    ],
    '2025-06-27': [
        {
            attendees: [],
            description: '',
            id: '46abb52f-9e97-4b8d-91d6-759dab9712d8',
            isAllDay: true,
            links: [],
            location: 'Somewhere in Wyoming',
            recurrence: null,
            times: { start: 'TBD' },
            title: 'Wyoming 3-Way',
        },
    ],
    '2025-06-28': [
        {
            attendees: [],
            description: '',
            id: '0feb748a-a1f2-4ae5-9017-f10d1e996167',
            isAllDay: true,
            links: [],
            location: 'Somewhere in Wyoming',
            recurrence: null,
            times: { start: 'TBD' },
            title: 'Wyoming 3-Way',
        },
    ],
    '2025-06-29': [
        {
            attendees: [],
            description: '',
            id: 'e0e1a195-af1c-48fe-b9a6-9a5add1ec496',
            isAllDay: true,
            links: [],
            location: 'Somewhere in Wyoming',
            recurrence: null,
            times: { start: 'TBD' },
            title: 'Wyoming 3-Way',
        },
    ],
    '2025-07-04': [
        {
            attendees: [],
            description: "Foresthill's annual 4th of July parade",
            id: '1f79098a-5a33-43d9-b483-fced3d9a0ba2',
            isAllDay: false,
            links: [],
            location: 'Foresthill',
            recurrence: null,
            times: { start: 'TBD' },
            title: '4th of July Parade',
        },
    ],
    '2025-07-11': [
        {
            attendees: [],
            description: '',
            id: '48324ee6-0398-46a8-91f1-b9bf4c9246f8',
            isAllDay: false,
            links: [],
            location: 'Nobody knows',
            recurrence: null,
            times: { start: 'TBD' },
            title: 'T.R.A.S.H.',
        },
    ],
    '2025-07-12': [
        {
            attendees: [],
            description: '',
            id: '903343a5-315e-4485-ae17-4200d10ff02f',
            isAllDay: false,
            links: [],
            location: 'Nobody knows',
            recurrence: null,
            times: { start: 'TBD' },
            title: 'T.R.A.S.H.',
        },
    ],
    '2025-07-13': [
        {
            attendees: [],
            description: '',
            id: '60b409ce-7b24-4741-a586-ecdea7a858fb',
            isAllDay: false,
            links: [],
            location: 'Nobody knows',
            recurrence: null,
            times: { start: 'TBD' },
            title: 'T.R.A.S.H.',
        },
    ],
    '2025-12-06': [
        {
            attendees: [],
            description: "Let's make it a Merry Christmas for the kids!",
            id: 'e34ad4f3-686e-4be3-b8ed-048a3c90d2f3',
            isAllDay: false,
            links: [],
            location: 'Walmart',
            recurrence: 'yearly',
            times: { start: 'TBD' },
            title: 'Receiving Home Toy Drive',
        },
    ],
} as const;
