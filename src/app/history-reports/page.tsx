import ListItem from '@/src/components/list-item';
import { PageSection } from '@/src/components/page-section';
import { PageWrapper } from '@/src/components/page-wrapper';
import { getHistoryReportsMeta } from '@/src/lib/history-reports';

export default async function Posts() {
    const posts = await getHistoryReportsMeta();
    if (!posts) return <p className="mt-10 text-center">Sorry, no posts available.</p>;

    return (
        <PageWrapper>
            <PageSection heading="History Reports">
                <ul className="w-full list-none p-0">
                    {posts.map((post) => (
                        <ListItem key={post.slug} post={post} />
                    ))}
                </ul>
            </PageSection>
        </PageWrapper>
    );
}
