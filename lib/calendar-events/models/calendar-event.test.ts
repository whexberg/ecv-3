import { DateTime } from 'luxon';

import { CalendarEvent } from '@/lib/calendar-events/models/calendar-event';
import { DateTimeUtils } from '@/lib/utils/date-time.utils';
import { deserialize } from '@/lib/utils/serialization';

describe('CalendarEvent', () => {
    test('should serialize properly', () => {
        const testEvent = {
            id: '1',
            title: 'Test Event',
            slug: 'test-event',
            description: 'This is a test event description.',
            location: '123 Test St, Test City',
            start_at: '2025-12-01T09:00:00.000Z',
            end_at: '2025-12-01T17:00:00.000Z',
            timezone: 'America/New_York',
            is_all_day: false,
            event_type: 'Meeting',
            is_members_only: true,
            is_published: true,
            meta: {
                links: [{ url: 'http://example.com', text: 'Example Link' }],
                start_date_tbd: false,
                start_time_tbd: true,
                end_date_tbd: true,
                end_time_tbd: false,
            },
            created_at: DateTime.local().toJSDate().toISOString(), // Current date
            updated_at: DateTime.local().toJSDate().toISOString(), // Current date
        };

        const deserializedEvent = deserialize(testEvent, CalendarEvent);
        expect(deserializedEvent.id).toBe(testEvent.id);
        expect(deserializedEvent.title).toBe(testEvent.title);
        expect(deserializedEvent.description).toBe(testEvent.description);
        expect(deserializedEvent.location).toBe(testEvent.location);
        expect(deserializedEvent.startAt?.toJSDate().toISOString()).toBe(testEvent.start_at);
        expect(deserializedEvent.endAt?.toJSDate().toISOString()).toBe(testEvent.end_at);
        expect(deserializedEvent.timezone).toBe(testEvent.timezone);
        expect(deserializedEvent.isAllDay).toBe(testEvent.is_all_day);
        expect(deserializedEvent.eventType).toBe(testEvent.event_type);
        expect(deserializedEvent.isMembersOnly).toBe(testEvent.is_members_only);
        expect(deserializedEvent.isPublished).toBe(testEvent.is_published);
        expect(deserializedEvent.meta.links).toEqual(testEvent.meta.links);
        expect(deserializedEvent.meta.startDateTBD).toBe(testEvent.meta.start_date_tbd);
        expect(deserializedEvent.meta.startTimeTBD).toBe(testEvent.meta.start_time_tbd);
        expect(deserializedEvent.meta.endDateTBD).toBe(testEvent.meta.end_date_tbd);
        expect(deserializedEvent.meta.endTimeTBD).toBe(testEvent.meta.end_time_tbd);
        expect(deserializedEvent.createdAt?.toJSDate().toISOString()).toBe(testEvent.created_at);
        expect(deserializedEvent.updatedAt?.toJSDate().toISOString()).toBe(testEvent.updated_at);
    });

    it('should parse rrule-generated timestamps with incorrect Z suffix in specified timezone', () => {
        expect(
            DateTimeUtils.parseDateTime('2025-12-05T20:03:32.000Z', {
                zone: 'America/Los_Angeles',
                keepTime: true,
                asDate: true,
            }).toISOString(),
        ).toBe('2025-12-06T04:03:32.000Z');
    });
});
