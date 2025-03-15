import Calendar from '@/app/calendar/calendar';
import PageSection from '@/components/page-section';
import { PageWrapper } from '@/components/page-wrapper';
import { getCalendarEvents } from '@/lib/calendar-events';

export default async function EventsPage() {
    const posts = await getCalendarEvents();

    return (
        <PageWrapper>
            <PageSection heading="Events Calendar">
                <Calendar events={posts} />
            </PageSection>
        </PageWrapper>
    );
}
