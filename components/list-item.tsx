import Link from 'next/link';

import { DateUtils } from '@/lib/utils/dates';

type Props = {
    post: Meta<{
        title: string;
        date: string;
    }>;
};

export default function ListItem({ post }: Props) {
    const { slug, title, date } = post;
    const formattedDate = DateUtils.getFormattedDate(date);

    return (
        <li className="mt-4 text-2xl">
            <Link className="underline hover:text-black/70" href={`/history-reports/${slug}`}>
                {title}
            </Link>
            <br />
            <p className="mt-1 text-sm">{formattedDate}</p>
        </li>
    );
}
