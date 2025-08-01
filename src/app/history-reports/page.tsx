import { HistoryReportList } from '@/src/app/history-reports/history-report-list';
import { HistoryReportsProvider } from '@/src/app/history-reports/history-reports.context';
import { PageSection } from '@/src/components/page-section';
import { PageWrapper } from '@/src/components/page-wrapper';

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
