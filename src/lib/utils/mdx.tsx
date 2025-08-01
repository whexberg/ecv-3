import { compileMDX } from 'next-mdx-remote/rsc';
import { ReactNode } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

import CustomImage from '@/src/components/custom-image';
import { Text } from '@/src/components/heading';
import Video from '@/src/components/video';

export const parseMDX = async <T extends Record<string, unknown>>(source: string): Promise<{ content: ReactNode }> => {
    const { content } = await compileMDX<T>({
        source,
        components: {
            CustomImage,
            Video,
            h1: (props) => (
                <h1 className="mt-8 py-4 text-3xl" {...props}>
                    {props.children}
                </h1>
            ),
            h2: (props) => (
                <h2 className="mt-8 py-2 text-2xl" {...props}>
                    {props.children}
                </h2>
            ),
            h3: (props) => (
                <h3 className="text-xl" {...props}>
                    {props.children}
                </h3>
            ),
            h4: (props) => (
                <h4 className="text-lg" {...props}>
                    {props.children}
                </h4>
            ),
            p: (props) => (
                <p className="m-2" {...props}>
                    {props.children}
                </p>
            ),
            CQA: (props) => (
                <p className="my-4 text-red-700" {...props}>
                    CREDO QUIA ABSURDUM
                </p>
            ),
            FYIK: (props) => (
                <p className="my-4 font-bold text-red-700" {...props}>
                    FYIK
                </p>
            ),
            KurteousSignOff: (props) => (
                <div className="my-20 flex flex-col items-center justify-center gap-4 font-bold" {...props}>
                    <p className="text-3xl" {...props}>
                        WHAT SAY THE BRETHREN!
                    </p>
                    <p className="text-red-700" {...props}>
                        FYIK
                    </p>
                    <p {...props}>{'"CREDO QUIA ABSURDUM"'}</p>
                </div>
            ),
            WSTB: () => (
                <div className="mt-20">
                    <Text large center>
                        WHAT SAY THE BRETHREN!
                    </Text>
                </div>
            ),
        },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [rehypeHighlight, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
            },
        },
    });

    return { content };
};
