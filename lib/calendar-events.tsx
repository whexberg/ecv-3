import fs from 'node:fs';
import path from 'node:path';

import { addDays, eachDayOfInterval, format, isFriday, isTuesday, startOfMonth } from 'date-fns';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

const BASE_FILE_PATH = path.join(process.cwd(), 'content/calendar-events');

type Filetree = { tree: { path: string }[] };

/**
 * Fetches calendar events from a specified file and returns them for a given date.
 *
 * @param {string} filename - The name of the file containing the calendar events.
 * @return {Promise<CalendarEvent[]>} A promise that resolves to an array of calendar events.
 */
export async function getCalendarEventsByDate(filename: string): Promise<CalendarEvent[]> {
    const filePath = path.join(BASE_FILE_PATH, filename);

    if (!fs.existsSync(filePath)) return [];
    const source: string = fs.readFileSync(filePath, 'utf-8');

    const { frontmatter } = await compileMDX<{ date: string; events: CalendarEvent[] }>({
        source,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [rehypeHighlight, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
            },
        },
    });

    return frontmatter.events;
}

/**
 * Retrieves calendar events from specified markdown files in the base file path.
 * Processes all `.mdx` files in the directory to extract events associated with each date.
 * Adds any additional monthly meeting events to the result.
 *
 * @return {Promise<Record<string, CalendarEvent[]>>} A promise that resolves to a record where keys are file names
 * (without the `.mdx` extension), and values are arrays of calendar events corresponding to those files.
 */
export async function getCalendarEvents(): Promise<Record<string, CalendarEvent[]>> {
    const dir = fs.readdirSync(BASE_FILE_PATH);

    const repoFileTree: Filetree = { tree: dir.map((file) => ({ path: file })) };
    const filesArray = repoFileTree.tree.map((obj) => obj.path).filter((path) => path.endsWith('.mdx'));

    const events: Record<string, CalendarEvent[]> = {};
    for (const file of filesArray) {
        const dateEvents = await getCalendarEventsByDate(file);
        if (dateEvents) events[file.replace('.mdx', '')] = dateEvents;
    }

    const monthlyMeetings = getMeetingEvents();
    for (const entry of Object.entries(monthlyMeetings)) {
        const date = entry[0];
        const monthEvents = entry[1];
        events[date] ??= [];
        events[date].push(...monthEvents);
    }

    return events;
}

function getMeetingEvents(): Record<string, CalendarEvent[]> {
    const events: Record<string, CalendarEvent[]> = {};

    for (let year = new Date().getFullYear() - 1; year <= new Date().getFullYear() + 1; year++) {
        for (let month = 0; month < 12; month++) {
            const { general, board } = monthlyMeetingDates(year, month);

            const boardDate = format(board.date, 'yyyy-MM-dd');
            (events[boardDate] ??= []).push({
                times: { start: board.start, end: board.end },
                title: 'Board Meeting',
                description: 'Monthly board meeting.',
                links: [],
            });

            const generalDate = format(general.date, 'yyyy-MM-dd');
            (events[generalDate] ??= []).push({
                times: { start: general.start, end: general.end },
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
