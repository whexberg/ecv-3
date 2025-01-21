import { addDays, eachDayOfInterval, format, isFriday, isTuesday, startOfMonth } from 'date-fns';

export type CalendarEvent = {
    date: string;
    times?: { start?: string; end?: string };
    title: string;
    description: string;
    links: {
        url: string;
        text: string;
    }[];
};

export async function loadEvents(): Promise<Record<string, CalendarEvent[]>> {
    const rawEvents: CalendarEvent[] = [
        {
            date: '2025-12-6',
            title: '2025 Christmas Fundraiser',
            description: 'Fundraiser for local orphans.',
            links: [],
        },
    ];

    for (let yr = new Date().getFullYear() - 1; yr < new Date().getFullYear() + 1; yr++) {
        for (let mo = 0; mo < 12; mo++) {
            const { generalMeetingDate, boardMeetingDate } = getMeetingDates(yr, mo);
            rawEvents.push(
                {
                    date: format(boardMeetingDate, 'yyyy-MM-dd'),
                    times: { start: '7:03pm', end: '8:03pm' },
                    title: 'Board Meeting',
                    description: 'Monthly board meeting.',
                    links: [],
                },
                {
                    date: format(generalMeetingDate, 'yyyy-MM-dd'),
                    times: { start: '8:03pm', end: '9:03pm' },
                    title: 'General Meeting',
                    description: 'Monthly general meeting for all chapter members.',
                    links: [],
                },
            );
        }
    }

    return rawEvents.reduce(
        (p, c) => {
            p[c.date] ??= [];
            p[c.date].push(c);
            return p;
        },
        {} as Record<string, CalendarEvent[]>,
    );
}

function getMeetingDates(year: number, month: number) {
    const firstDayOfMonth = startOfMonth(new Date(year, month, 1));

    // Generate all days of the month
    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: addDays(firstDayOfMonth, 30), // Sufficient to cover even the longest months
    });

    // Filter Tuesdays
    return {
        boardMeetingDate: daysInMonth.filter((d) => isTuesday(d))[1],
        generalMeetingDate: daysInMonth.filter((d) => isFriday(d))[2],
    };
}
