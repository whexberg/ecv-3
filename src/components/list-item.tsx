import Link from 'next/link';

import { DateUtils } from '@/src/lib/utils/dates';

type Props = {
    post: {
        id: string;
        title: string;
        date: string;
    };
};

export default function ListItem({ post }: Props) {
    const { id, title, date } = post;
    const formattedDate = DateUtils.getFormattedDate(date);

    return (
        <li className="mt-4 text-2xl">
            <Link className="underline hover:text-black/70" href={`/history-reports/${id}`}>
                {title}
            </Link>
            <br />
            <p className="mt-1 text-sm">{formattedDate}</p>
        </li>
    );
}
