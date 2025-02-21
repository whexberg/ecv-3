import 'highlight.js/styles/github-dark.css';

import { Cinzel } from 'next/font/google';
import { notFound } from 'next/navigation';

import { getHistoryReportByName, getHistoryReportsMeta } from '@/lib/history-reports';
import { DateUtils } from '@/lib/utils/dates';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type Props = { params: { slug: string } & any };

const cinzelDecorative = Cinzel({ weight: ['400', '500', '600', '700', '800', '900'], subsets: ['latin'] });
// const didactGothic = Didact_Gothic({ subsets: ['latin'], weight: ['400'] });

export const revalidate = 86400;

export async function generateStaticParams() {
    const posts = await getHistoryReportsMeta();
    if (!posts) return [{ slug: 'not-found' }];

    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const post = await getHistoryReportByName(`${slug}.mdx`);
    return { title: post?.meta.title ?? 'Post Not Found' };
}

export default async function HistoryReportPage({ params }: Props) {
    const { slug } = await params;
    const post = await getHistoryReportByName(`${slug}.mdx`);
    if (!post) return notFound();

    const { meta, content } = post;

    // const pubDate = DateUtils.getFormattedDate(meta.date);

    // const tags = meta.tags.map((tag, i) => (
    //     <>
    //         {i > 0 && '|'}
    //         <Link key={i} href={`/tags/${tag}`}>
    //             {tag}
    //         </Link>
    //     </>
    // ));

    return (
        <article className="md:px-8 mx-auto max-w-5xl">
            <HistoryReportHeader {...meta} />

            <section className="text-center">{content}</section>

            {/*<section className="flex gap-4">*/}
            {/*    <h3>Related:</h3>*/}
            {/*    <div className="flex flex-row gap-2">{tags}</div>*/}
            {/*</section>*/}

            {/*<div className="flex flex-row w-full justify-between">*/}
            {/*    <p className="mb-10">*/}
            {/*        <Link href="/">Previous</Link>*/}
            {/*    </p>*/}
            {/*    <p className="mb-10">*/}
            {/*        <Link href="/">Next</Link>*/}
            {/*    </p>*/}
            {/*</div>*/}
        </article>
    );
}

const HistoryReportHeader = (meta: Meta<{ author: string; date: string; title: string }>) => {
    return (
        <div
            className="flex flex-col items-center gap-4 text-center leading-relaxed my-8"
            style={cinzelDecorative.style}
        >
            <h1 className="text-5xl tracking-[0.5rem] my-8 text-red-700 font-bold">{meta.title}</h1>
            <p className="text-xl tracking-[0.75rem] text-red-700 font-bold">HISTORIANS REPORT</p>
            <p>AS PREPARED BY</p>
            <h1 className="text-xl tracking-widest text-red-700 font-bold">{meta.author}</h1>
            <p className="tracking-normal">FOR THE GENERAL MEETING OF</p>
            <p className="tracking-normal">THE ANCIENT AND HONORABLE ORDER OF</p>
            <p className="text-3xl tracking-[1rem] font-bold text-red-700">E CLAMPUS VITUS</p>
            <h1 className="text-xl">LORD SHOLTO DOUGLAS CHAPTER No. 3</h1>
            <p className="text-center text-red-700">{DateUtils.getFormattedDate(meta.date)}</p>
        </div>
    );
};
