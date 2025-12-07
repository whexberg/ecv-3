import { CalendarView } from '@/app/calendar/calendar-view';
import { PageSection } from '@/components/page-section';
import { PageWrapper } from '@/components/page-wrapper';
import { CalendarInfoProvider } from '@/lib/calendar-events/context';

export default async function EventsPage() {
    return (
        <CalendarInfoProvider>
            <PageWrapper>
                <PageSection heading="Events Calendar">
                    <CalendarView />
                </PageSection>
            </PageWrapper>
        </CalendarInfoProvider>
    );
}
