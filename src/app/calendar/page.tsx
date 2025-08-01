import { Calendar } from '@/src/app/calendar/calendar';
import { PageSection } from '@/src/components/page-section';
import { PageWrapper } from '@/src/components/page-wrapper';
import { CalendarInfoProvider } from '@/src/contexts/calendar-info.context';

export default async function EventsPage() {
    return (
        <CalendarInfoProvider>
            <PageWrapper>
                <PageSection heading="Events Calendar">
                    <Calendar />
                </PageSection>
            </PageWrapper>
        </CalendarInfoProvider>
    );
}
