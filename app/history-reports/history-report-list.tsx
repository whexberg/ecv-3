'use client';

import { BlogCard } from '@/app/history-reports/blog-card';
import { Loader } from '@/components/loader';
import { useHistoryReports } from '@/lib/history-report/context';

export const HistoryReportList = () => {
    const { historyReports: posts, initialized } = useHistoryReports();

    if (posts.length == 0) {
        if (!initialized) return <Loader />;
        return <p className="mt-10 text-center">Sorry, I ain&apos;t got no history reports for ya.</p>;
    }

    return (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
                <BlogCard
                    key={post.id}
                    title={post.title}
                    date={post.date}
                    excerpt={post.body.substring(0, 100) + '...'}
                    author={post.author}
                    // imageUrl={post.image}
                    href={`/history-reports/${post.id}`}
                    className=""
                />
            ))}
        </div>
    );
};
