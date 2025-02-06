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
    let rawEvents: CalendarEvent[] = [
        {
            date: '2025-12-06',
            title: '2025 Christmas Fundraiser',
            description: 'Fundraiser for local orphans.',
            links: [],
        },
        {
            date: '2025-02-08',
            times: { start: '7:03AM' },
            title: "43rd Annual Bean Feed and Hawkers' Faire",
            description: 'Fundraiser for local orphans.',
            links: [],
        },
        {
            date: '2025-02-08',
            times: { start: '6:03PM' },
            title: 'FAKE EVENT',
            description: 'Fundraiser for local orphans.',
            links: [],
        },
    ];

    for (let yr = new Date().getFullYear() - 1; yr < new Date().getFullYear() + 1; yr++) {
        for (let mo = 0; mo < 12; mo++) {
            const { general, board } = getMeetingDatesAndTimes(yr, mo);
            rawEvents = [
                ...rawEvents,
                {
                    date: format(board.date, 'yyyy-MM-dd'),
                    times: { start: board.start, end: board.end },
                    title: 'Board Meeting',
                    description: 'Monthly board meeting.',
                    links: [],
                },
                {
                    date: format(general.date, 'yyyy-MM-dd'),
                    times: { start: general.start, end: general.end },
                    title: 'General Meeting',
                    description: 'Monthly general meeting for all chapter members.',
                    links: [],
                },
            ];
        }
    }

    const reduced = rawEvents.reduce(
        (p, c) => {
            p[c.date] ??= [];
            p[c.date].push(c);
            return p;
        },
        {} as Record<string, CalendarEvent[]>,
    );

    return reduced;
}

function getMeetingDatesAndTimes(year: number, month: number) {
    const firstDayOfMonth = startOfMonth(new Date(year, month, 1));

    // Generate all days of the month
    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: addDays(firstDayOfMonth, 30), // Sufficient to cover even the longest months
    });

    if (year >= 2025 && month > 0) {
        return {
            board: { date: daysInMonth.filter((d) => isFriday(d))[0], start: '8:03PM', end: '9:03PM' },
            general: { date: daysInMonth.filter((d) => isFriday(d))[2], start: '8:03PM', end: '9:03PM' },
        };
    }

    return {
        board: { date: daysInMonth.filter((d) => isTuesday(d))[1], start: '7:03PM', end: '8:03PM' },
        general: { date: daysInMonth.filter((d) => isFriday(d))[2], start: '8:03PM', end: '9:03PM' },
    };
}
