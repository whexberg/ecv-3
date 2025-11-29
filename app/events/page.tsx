import { DateTime } from 'luxon';
import Link from 'next/link';

import { PageSection } from '@/components/page-section';
import { PageWrapper } from '@/components/page-wrapper';
import { eventsRepository } from '@/lib/events/events-repository';

export default async function EventsPage() {
    const events = await eventsRepository.getUpcomingEvents(100);
    if (events.isFailure) return null;

    return (
        <PageWrapper>
            <PageSection heading="Upcoming Events">
                {events.value.map((event, idx) => {
                    console.log(
                        event.metadata.timezone,
                        DateTime.fromObject(event.occurrence_date ?? {}).toISO(),
                        DateTime.fromObject(event.occurrence_date ?? {}, { zone: event.metadata.timezone }).toISO(),
                    );
                    const href = event.occurrence_date
                        ? `events/${event.slug}?s=${DateTime.fromObject(event.occurrence_date).toISO()}`
                        : `events/${event.slug}`;

                    return (
                        <Link href={href} key={`${event.slug}-${idx}`}>
                            <h2>{event.metadata.title}</h2>
                            <p>
                                {DateTime.fromObject(event.occurrence_date ?? {}, {
                                    zone: event.metadata.timezone,
                                }).toFormat("DDD 'at' t")}
                            </p>
                            <p>{event.metadata.location}</p>
                            {event.is_exception_addition && <span>Special Event</span>}
                        </Link>
                    );
                })}
            </PageSection>
        </PageWrapper>
    );
}
