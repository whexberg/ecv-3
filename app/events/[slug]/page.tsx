import { notFound } from 'next/navigation';

import { EventComponent } from '@/app/events/[slug]/components/event-component';
import { eventsRepository } from '@/lib/events/events-repository';

export async function generateStaticParams() {
    const events = await eventsRepository.getAllEvents();
    if (events.isFailure) return null;
    return events.value.map((event) => ({ slug: event.slug }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
    const eventResult = await eventsRepository.getEventBySlug((await params).slug, true);
    if (eventResult.isFailure) return null;

    if (!eventResult.value || !eventResult.value.mdxContent) notFound();
    const event = eventResult.value;

    return <EventComponent event={event} />;
}
