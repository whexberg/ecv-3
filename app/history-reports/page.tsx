import ListItem from '@/components/list-item';
import { getHistoryReportsMeta } from '@/lib/history-reports';

export default async function Posts() {
    const posts = await getHistoryReportsMeta();
    if (!posts) return <p className="mt-10 text-center">Sorry, no posts available.</p>;

    return (
        <section className="mt-6 mx-auto max-w-2xl">
            <h2 className="text-4xl font-bold">History Reports</h2>
            <ul className="w-full list-none p-0">
                {posts.map((post) => (
                    <ListItem key={post.slug} post={post} />
                ))}
            </ul>
        </section>
    );
}
