import { NextResponse } from 'next/server';

import { CalendarEventsRepository } from '@/src/lib/calendar-events/repository';
import { CalendarEventsService } from '@/src/lib/calendar-events/service';
import { DBUtils } from '@/src/lib/database/db';

export async function POST(): Promise<NextResponse> {
    const repo = new CalendarEventsRepository(DBUtils.getDB());
    const svc = new CalendarEventsService(repo);

    try {
        const events = await svc.listEvents();
        const serialized = events.map((e) => e.serialize());

        return NextResponse.json(serialized);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to retrieve data' }, { status: 500 });
    }
}
