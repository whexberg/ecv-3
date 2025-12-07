'use client';

import 'highlight.js/styles/github-dark.css';

import { notFound } from 'next/navigation';
import { use, useEffect, useState } from 'react';

import { HistoryReport } from '@/lib/history-report/history-report';
import { parseMDX } from '@/lib/utils/mdx';
import { deserialize } from '@/lib/utils/serialization';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = { params: { slug: string } & any };

export default function HistoryReportPage({ params }: Props) {
    const { slug } = use<{ slug: string }>(params);
    const [initialized, setInitialized] = useState(false);
    const [post, setPost] = useState<HistoryReport | undefined>(undefined);

    useEffect(() => {
        if (!slug) return;

        fetch(`/api/history-reports/${slug}`)
            .then((res) => res.json())
            .then(async (hp) => {
                setInitialized(true);
                if (hp.error) return;
                hp.body = (await parseMDX(hp.body))?.content ?? '';
                setPost(deserialize(hp, HistoryReport));
            })
            .catch(console.error);
    }, [slug]);

    if (!post) return initialized ? notFound() : null;

    return (
        <article className="mx-auto max-w-5xl md:px-8">
            <div className="font-display my-8 flex flex-col items-center gap-4 text-center leading-relaxed">
                <h1 className="text-accent my-8 text-5xl font-bold tracking-[0.5rem]">{post.title}</h1>
                <p className="text-accent text-xl font-bold tracking-[0.75rem]">HISTORIANS REPORT</p>
                <p>AS PREPARED BY</p>
                <h1 className="text-accent text-xl font-bold tracking-widest">{post.author}</h1>
                <p className="tracking-normal">FOR THE GENERAL MEETING OF</p>
                <p className="tracking-normal">THE ANCIENT AND HONORABLE ORDER OF</p>
                <p className="text-accent text-3xl font-bold tracking-[1rem]">E CLAMPUS VITUS</p>
                <h1 className="text-xl">LORD SHOLTO DOUGLAS CHAPTER No. 3</h1>
                <p className="text-accent text-center">{post.date}</p>
            </div>

            <section className="text-center">{post.body}</section>
        </article>
    );
}
