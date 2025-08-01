import { randomUUID } from 'node:crypto';

import { DateTime } from 'luxon';

import { CalendarEvents } from '@/src/content/calendar-events';
import { EncodedCalendarEvent } from '@/src/lib/models/calendar-event';
import { DateTimeUtils } from '@/src/lib/models/datetimes';

const meetings = getMeetingEvents();

for (const [date, events] of Object.entries(meetings)) {
    CalendarEvents[date] ??= [];
    CalendarEvents[date].push(...events);
}

function getMeetingEvents(): Record<string, EncodedCalendarEvent[]> {
    const events: Record<string, EncodedCalendarEvent[]> = {};

    for (let year = DateTime.utc().year - 1; year <= DateTime.utc().year + 1; year++) {
        for (let month = 1; month <= 12; month++) {
            const { general, board } = monthlyMeetingDates(year, month);

            const boardDate = board.start.toISODate()!;
            (events[boardDate] ??= []).push({
                id: randomUUID(),
                title: 'Board Meeting',
                description: 'Monthly board meeting.',
                location: '',
                start_date: board.start.toUTC().toISODate()!,
                start_time: board.start.toUTC().toISOTime()!,
                end_date: board.end.toUTC().toISODate()!,
                end_time: board.end.toUTC().toISOTime()!,
                meta: {},
                created_at: DateTime.utc().toISO(),
                updated_at: DateTime.utc().toISO(),
            });

            const generalDate = general.start.toISODate()!;
            (events[generalDate] ??= []).push({
                id: randomUUID(),
                title: 'General Meeting',
                description: 'Monthly general meeting for chapter members.',
                location: '',
                start_date: general.start.toUTC().toISODate()!,
                start_time: general.start.toUTC().toISOTime()!,
                end_date: general.end.toUTC().toISODate()!,
                end_time: general.end.toUTC().toISOTime()!,
                meta: {},
                created_at: DateTime.utc().toISO(),
                updated_at: DateTime.utc().toISO(),
            });
        }
    }
    return events;
}

function monthlyMeetingDates(year: number, month: number) {
    const dt = DateTime.fromObject({ year, month });

    // Generate all days of the month
    const daysInMonth = DateTimeUtils.eachDayOfInterval(dt.startOf('month'), dt.endOf('month'));

    const boardStart = daysInMonth
        .filter((d) => d.weekday === 5)[0]
        .set({ hour: 30, minute: 3 })
        .toUTC();
    const boardEnd = boardStart.plus({ hours: 1 });

    const generalStart = daysInMonth
        .filter((d) => d.weekday === 5)[2]
        .set({ hour: 30, minute: 3 })
        .toUTC();
    const generalEnd = generalStart.plus({ hours: 1 });

    return {
        board: { start: boardStart, end: boardEnd },
        general: { start: generalStart, end: generalEnd },
    };
}
