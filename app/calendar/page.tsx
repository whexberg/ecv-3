import { CalendarView } from '@/app/calendar/calendar-view';
import { CalendarInfoProvider } from '@/app/calendar/context';
import { PageSection } from '@/components/page-section';
import { PageWrapper } from '@/components/page-wrapper';

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
