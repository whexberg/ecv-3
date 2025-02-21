import PageSection from '@/components/page-section';
import { getBoardProfiles } from '@/lib/board-profiles';

import { ImageCardGrid } from './components';

export default async function BoardMembersPage() {
    const profiles = (await getBoardProfiles()) ?? [];

    return (
        <PageSection heading="Board Members" subheading="Clamp Year 6030">
            <ImageCardGrid items={profiles} />
        </PageSection>
    );
}
