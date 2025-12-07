import { EventComponent } from '@/app/events/[id]/components/event-component';
import { EventsRepository } from '@/lib/calendar-events/repository';
import { CalendarEventsService } from '@/lib/calendar-events/service';
import { serialize } from '@/lib/utils/serialization';

// export async function generateStaticParams() {
//     const events = await new EventsRepository().getAllEventsInRange(DateTime);
//     if (events.isFailure) return [];
//     return events.value.map((event) => ({ slug: event.slug }));
// }

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
    const repo = new EventsRepository();
    const event = await new CalendarEventsService(repo).findEventById((await params).id);

    return <EventComponent event={serialize(event)} />;
}
