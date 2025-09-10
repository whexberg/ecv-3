import { CalendarView } from '@/src/app/calendar/calendar-view';
import { CalendarInfoProvider } from '@/src/app/calendar/context';
import { PageSection } from '@/src/components/page-section';
import { PageWrapper } from '@/src/components/page-wrapper';

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
