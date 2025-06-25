import { NextResponse } from 'next/server';

import { CalendarEventsRepo } from '@/lib/database/calendar-events-repo';

export async function GET(): Promise<NextResponse> {
    try {
        const events = await CalendarEventsRepo.getAllEvents();
        return NextResponse.json(events);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to retrieve data' }, { status: 500 });
    }
}
