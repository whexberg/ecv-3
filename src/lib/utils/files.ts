import fs from 'node:fs';
import path from 'node:path';

import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

export const FileUtils = {
    getMDXFilenames: (dirPath: string) => {
        const dir = fs.readdirSync(dirPath);
        const repoFileTree: FileTree = { tree: dir.map((file) => ({ path: file })) };
        return repoFileTree.tree.map((obj) => obj.path).filter((path) => path.endsWith('.mdx'));
    },

    parseMDXFile: async function <T extends Record<string, unknown>>(
        filename: string,
        options?: {
            components?: Parameters<typeof compileMDX>[0]['components'];
            options?: Parameters<typeof compileMDX>[0]['options'];
        },
    ): Promise<ParsedMDX<T> | undefined> {
        if (!fs.existsSync(filename)) return undefined;
        const source: string = fs.readFileSync(filename, 'utf-8');

        const { frontmatter, content } = await compileMDX<T>({
            source,
            components: options?.components,
            options: {
                parseFrontmatter: true,
                mdxOptions: {
                    rehypePlugins: [rehypeHighlight, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
                    ...options?.options?.mdxOptions,
                },
                ...options?.options,
            },
        });

        const meta = { slug: path.basename(filename).replace(/\.mdx$/, ''), ...frontmatter };
        return { meta, content } satisfies ParsedMDX<T>;
    },
};
