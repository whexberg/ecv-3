import { NextResponse } from 'next/server';

import { CalendarEventsRepo } from '@/src/lib/database/calendar-events-repo';

export async function POST(): Promise<NextResponse> {
    try {
        const events = await CalendarEventsRepo.getAllEvents();
        // const body = (await req.json()) as { currentDate: string };
        // if (body.currentDate) {
        // const dt = DateTime.fromISO(body.currentDate).startOf('month');
        //
        // const ruleset = new RRuleSet();
        // ruleset.rrule(
        //     new RRule({
        //         freq: RRule.MONTHLY,
        //         byweekday: [RRule.FR.nth(1), RRule.FR.nth(3)],
        //         dtstart: new Date(dt.year, dt.month - 1, dt.day),
        //     }),
        // );
        //
        // const [boardDate, generalDate] = ruleset.between(
        //     dt.startOf('month').toJSDate(),
        //     dt.endOf('month').toJSDate(),
        //     true,
        // );
        //
        // const now = DateTime.utc().toISO();
        // const boardDateTime = DateTime.fromJSDate(boardDate);
        // const generalDateTime = DateTime.fromJSDate(generalDate);

        // events.push(
        //     {
        //         id: randomUUID(),
        //         title: 'Board Meeting',
        //         description: 'Monthly board meeting.',
        //         location: 'Gold Hill Grange Hall',
        //         start_at: boardDateTime.setZone('America/Los_Angeles').set({ hour: 20, minute: 3 }).toISO()!,
        //         end_at: boardDateTime.setZone('America/Los_Angeles').set({ hour: 21, minute: 3 }).toISO()!,
        //         meta: {},
        //         created_at: now,
        //         updated_at: now,
        //     },
        //     {
        //         id: randomUUID(),
        //         title: 'General Meeting',
        //         description: 'Monthly general meeting for chapter members.',
        //         location: 'Gold Hill Grange Hall',
        //         start_at: generalDateTime.setZone('America/Los_Angeles').set({ hour: 20, minute: 3 }).toISO()!,
        //         end_at: generalDateTime.setZone('America/Los_Angeles').set({ hour: 21, minute: 3 }).toISO()!,
        //         meta: {},
        //         created_at: DateTime.utc().toISO(),
        //         updated_at: DateTime.utc().toISO(),
        //     },
        // );
        // }

        return NextResponse.json(events);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to retrieve data' }, { status: 500 });
    }
}
