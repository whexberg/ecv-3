import { Calendar } from '@/app/calendar/calendar';
import { PageSection } from '@/components/page-section';
import { PageWrapper } from '@/components/page-wrapper';

export default async function EventsPage() {
    return (
        <PageWrapper>
            <PageSection heading="Events Calendar">
                <Calendar />
            </PageSection>
        </PageWrapper>
    );
}
