import { Calendar } from '@/src/app/calendar/calendar';
import { CalendarInfoProvider } from '@/src/app/calendar/calendar-info.context';
import { PageSection } from '@/src/components/page-section';
import { PageWrapper } from '@/src/components/page-wrapper';

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
