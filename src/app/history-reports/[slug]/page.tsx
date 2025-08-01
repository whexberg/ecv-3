'use client';

import 'highlight.js/styles/github-dark.css';

import { Cinzel } from 'next/font/google';
import { notFound } from 'next/navigation';
import { use, useEffect, useState } from 'react';

import { HistoryReport } from '@/src/lib/models/history-report';
import { DateUtils } from '@/src/lib/utils/dates';
import { parseMDX } from '@/src/lib/utils/mdx';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type Props = { params: { slug: string } & any };

const cinzelDecorative = Cinzel({ weight: ['400', '500', '600', '700', '800', '900'], subsets: ['latin'] });

export default function HistoryReportPage({ params }: Props) {
    const { slug } = use<{ slug: string }>(params);
    const [initialized, setInitialized] = useState(false);
    const [post, setPost] = useState<HistoryReport>();

    useEffect(() => {
        if (!slug) return;
        fetch(`/api/history-reports/${slug}`)
            .then((res) => res.json())
            .then(async (hp) => {
                // hp.body = hp.body.replace(/<\/?[^>]+(>|$)/g, '');
                hp.body = (await parseMDX(hp.body))?.content ?? '';
                setPost(HistoryReport.deserialize(hp));
                setInitialized(true);
            })
            .catch(console.error);
    }, [slug]);

    if (!post) return initialized ? notFound() : null;

    return (
        <article className="mx-auto max-w-5xl md:px-8">
            <div
                className="my-8 flex flex-col items-center gap-4 text-center leading-relaxed"
                style={cinzelDecorative.style}
            >
                <h1 className="my-8 text-5xl font-bold tracking-[0.5rem] text-red-700">{post.title}</h1>
                <p className="text-xl font-bold tracking-[0.75rem] text-red-700">HISTORIANS REPORT</p>
                <p>AS PREPARED BY</p>
                <h1 className="text-xl font-bold tracking-widest text-red-700">{post.author}</h1>
                <p className="tracking-normal">FOR THE GENERAL MEETING OF</p>
                <p className="tracking-normal">THE ANCIENT AND HONORABLE ORDER OF</p>
                <p className="text-3xl font-bold tracking-[1rem] text-red-700">E CLAMPUS VITUS</p>
                <h1 className="text-xl">LORD SHOLTO DOUGLAS CHAPTER No. 3</h1>
                <p className="text-center text-red-700">{DateUtils.getFormattedDate(post.date)}</p>
            </div>

            <section className="text-center">{post.body}</section>
        </article>
    );
}
