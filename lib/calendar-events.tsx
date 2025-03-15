import { addDays, addHours, eachDayOfInterval, format, isFriday, setHours, setMinutes, startOfMonth } from 'date-fns';

import { CalendarEvents } from '@/content/calendar-events';

const meetings = getMeetingEvents();

for (const [date, events] of Object.entries(meetings)) {
    CalendarEvents[date] ??= [];
    CalendarEvents[date].push(...events);
}

export async function getCalendarEventsByDate(dateString: DateString): Promise<CalendarEvent[]> {
    return CalendarEvents[dateString] ?? [];
}

export async function getCalendarEvents(): Promise<Record<string, CalendarEvent[]>> {
    return CalendarEvents;
}

function getMeetingEvents(): Record<string, CalendarEvent[]> {
    const events: Record<string, CalendarEvent[]> = {};

    for (let year = new Date().getFullYear() - 1; year <= new Date().getFullYear() + 1; year++) {
        for (let month = 0; month < 12; month++) {
            const { general, board } = monthlyMeetingDates(year, month);

            const boardDate = format(board.start, 'yyyy-MM-dd');
            (events[boardDate] ??= []).push({
                attendees: [],
                description: 'Monthly board meeting.',
                id: '',
                isAllDay: false,
                links: [],
                location: '',
                recurrence: null,
                times: board,
                title: 'Board Meeting',
            });

            const generalDate = format(general.start, 'yyyy-MM-dd');
            (events[generalDate] ??= []).push({
                times: general,
                id: '',
                attendees: [],
                isAllDay: false,
                location: '',
                recurrence: null,
                title: 'General Meeting',
                description: 'Monthly general meeting for chapter members.',
                links: [],
            });
        }
    }
    return events;
}

function monthlyMeetingDates(year: number, month: number) {
    const firstDayOfMonth = startOfMonth(new Date(year, month, 1));

    // Generate all days of the month
    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: addDays(firstDayOfMonth, 30), // Sufficient to cover even the longest months
    });

    const boardStart = setMinutes(setHours(daysInMonth.filter((d) => isFriday(d))[0], 20), 3);
    const boardEnd = addHours(boardStart, 1);

    const generalStart = setMinutes(setHours(daysInMonth.filter((d) => isFriday(d))[2], 20), 3);
    const generalEnd = addHours(generalStart, 1);

    return {
        board: { start: boardStart, end: boardEnd },
        general: { start: generalStart, end: generalEnd },
    };
}
