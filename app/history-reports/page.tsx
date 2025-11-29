import { HistoryReportList } from '@/app/history-reports/history-report-list';
import { HistoryReportsProvider } from '@/app/history-reports/history-reports.context';
import { PageSection } from '@/components/page-section';
import { PageWrapper } from '@/components/page-wrapper';

export default async function Posts() {
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
