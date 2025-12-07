import { DateTime } from 'luxon';
import { NextResponse } from 'next/server';

import { EventsRepository } from '@/lib/calendar-events/repository';
import { CalendarEventsService } from '@/lib/calendar-events/service';

const repo = new EventsRepository();
const eventsService = new CalendarEventsService(repo);

export async function POST(req: Request): Promise<NextResponse> {
    const { viewType, baseDate } = await req.json();

    if (!viewType || !baseDate) {
        return NextResponse.json({ error: 'viewType and baseDate are required' }, { status: 400 });
    }

    const parsedDate = DateTime.fromISO(baseDate);
    if (!parsedDate.isValid) {
        return NextResponse.json({ error: 'Invalid baseDate format' }, { status: 400 });
    }

    try {
        const events = await eventsService.getEventsForCalendarView(viewType, parsedDate);
        return NextResponse.json(events);
    } catch (error) {
        console.error('Calendar events error:', error);
        return NextResponse.json({ error: 'Failed to retrieve calendar events' }, { status: 500 });
    }
}
