import fs from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export type FrontMatter = {
    title: string;
    description?: string;
    date?: string;
    slug: string;
};

export async function getMDXContent(filePath: string) {
    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);
    const mdxSource = await serialize(content, {
        scope: data,
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        },
    });
    return { mdxSource, frontMatter: data as FrontMatter };
}

export function getAllFiles(folder: string) {
    const dir = path.join(process.cwd(), 'content', folder);
    const files = fs.readdirSync(dir);
    return files.map((file) => path.parse(file).name);
}

export function getAllFrontMatter(folder: string): FrontMatter[] {
    const files = getAllFiles(folder);
    return files.map((slug) => {
        const filePath = `content/${folder}/${slug}.md`;
        const { data } = matter(fs.readFileSync(filePath, 'utf8'));
        return { ...(data as FrontMatter), slug };
    });
}
