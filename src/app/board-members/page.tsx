import { BoardMemberInfoProvider } from '@/src/app/board-members/board-member-info.context';
import { PageSection } from '@/src/components/page-section';
import { PageWrapper } from '@/src/components/page-wrapper';

import { ImageCardGrid } from './components';

export default async function BoardMembersPage() {
    return (
        <BoardMemberInfoProvider>
            <PageWrapper>
                <PageSection heading="Board Members" subheading="Clamp Year 6030">
                    <ImageCardGrid />
                </PageSection>
            </PageWrapper>
        </BoardMemberInfoProvider>
    );
}
