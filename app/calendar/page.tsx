import Calendar from '@/app/calendar/calendar';
import { getCalendarEvents } from '@/lib/calendar-events';

export default async function EventsPage() {
    const posts = await getCalendarEvents();

    return <Calendar events={posts} />;
}
