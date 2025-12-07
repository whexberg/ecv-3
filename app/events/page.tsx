'use client';

import { DateTime } from 'luxon';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { PageSection } from '@/components/page-section';
import { PageWrapper } from '@/components/page-wrapper';
import { CalendarEvent } from '@/lib/calendar-events/models/calendar-event';
import { deserializeArray } from '@/lib/utils/serialization';

export default function EventsPage() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    useEffect(() => {
        fetch('/api/calendar-events', {
            method: 'POST',
            body: JSON.stringify({
                limit: 100,
                start: DateTime.local().startOf('day').toJSDate(),
                end: DateTime.local().plus({ days: 30 }).toJSDate(),
            }),
        })
            .then((res) => res.json())
            .then((res) => setEvents(deserializeArray(res, CalendarEvent)));
    }, []);

    return (
        <PageWrapper>
            <PageSection heading="Upcoming Events">
                {events.map((event) => {
                    return (
                        <Link href={`events/${event.id}`} key={event.id}>
                            <h2>{event.title}</h2>
                            <p>{event.startAt?.toLocaleString(DateTime.DATETIME_FULL)}</p>
                            <p>{event.location}</p>
                            {/*{event.is_exception_addition && <span>Special Event</span>}*/}
                        </Link>
                    );
                })}
            </PageSection>
        </PageWrapper>
    );
}
