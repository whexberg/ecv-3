import { CalendarEventMeta } from '@/lib/calendar-events/models/calendar-event-meta';
import { deserialize } from '@/lib/utils/serialization';

describe('CalendarEventMeta', () => {
    test('it should serialize properly', () => {
        const testData = {
            links: [{ url: 'http://example.com', text: 'Example Link' }],
            start_date_tbd: false,
            start_time_tbd: true,
            end_date_tbd: true,
            end_time_tbd: false,
        };
        const testMeta = deserialize(testData, CalendarEventMeta);

        expect(testMeta.links).toEqual(testData.links);
        expect(testMeta.endDateTBD).toBe(testData.end_date_tbd);
        expect(testMeta.endTimeTBD).toBe(testData.end_time_tbd);
        expect(testMeta.startDateTBD).toBe(testData.start_date_tbd);
        expect(testMeta.startTimeTBD).toBe(testData.start_time_tbd);
    });
});
