'use client';

import { useHistoryReports } from '@/src/app/history-reports/history-reports.context';
import ListItem from '@/src/components/list-item';

export const HistoryReportList = () => {
    const { historyReports: posts } = useHistoryReports();

    if (posts.length == 0) return <p className="mt-10 text-center">Sorry, no posts available.</p>;
    return (
        <ul className="w-full list-none p-0">
            {posts.map((post) => (
                <ListItem key={post.id} post={post} />
            ))}
        </ul>
    );
};
