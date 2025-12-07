import { PageSection } from '@/components/page-section';
import { PageWrapper } from '@/components/page-wrapper';
import { BoardMemberInfoProvider } from '@/lib/board-member/context';

import { ImageCardGrid } from './image-card-grid';

export default async function BoardMembersPage() {
    return (
        <PageWrapper>
            <PageSection heading="Board Members" subheading="Clamp Year 6030">
                <BoardMemberInfoProvider>
                    <ImageCardGrid />
                </BoardMemberInfoProvider>
            </PageSection>
        </PageWrapper>
    );
}
