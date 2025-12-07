import { HistoryReportList } from '@/app/history-reports/history-report-list';
import { PageSection } from '@/components/page-section';
import { PageWrapper } from '@/components/page-wrapper';
import { HistoryReportsProvider } from '@/lib/history-report/context';

export default async function HistoryReportsListPage() {
    return (
        <HistoryReportsProvider>
            <PageWrapper>
                <PageSection heading="History Reports">
                    <HistoryReportList />
                </PageSection>
            </PageWrapper>
        </HistoryReportsProvider>
    );
}
