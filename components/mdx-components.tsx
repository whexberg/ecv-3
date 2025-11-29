import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps, PropsWithChildren } from 'react';

export const MDXComponents: Record<string, React.ComponentType<any>> = {
    // Custom heading with anchor links
    h1: ({ children, ...props }: PropsWithChildren<ComponentProps<'h1'>>) => (
        <h1 className="mt-8 mb-4 text-4xl font-bold" {...props}>
            {children}
        </h1>
    ),
    h2: ({ children, ...props }: PropsWithChildren<ComponentProps<'h2'>>) => (
        <h2 className="mt-6 mb-3 text-3xl font-semibold" {...props}>
            {children}
        </h2>
    ),
    h3: ({ children, ...props }: PropsWithChildren<ComponentProps<'h3'>>) => (
        <h3 className="mt-4 mb-2 text-2xl font-semibold" {...props}>
            {children}
        </h3>
    ),

    // Custom paragraph styling
    p: ({ children, ...props }: PropsWithChildren<ComponentProps<'p'>>) => (
        <p className="mb-4 leading-relaxed" {...props}>
            {children}
        </p>
    ),

    // Custom link that uses Next.js Link
    a: ({ href, children, ...props }: PropsWithChildren<ComponentProps<'a'>>) => {
        const isInternal = href?.startsWith('/');
        if (isInternal) {
            return (
                <Link href={href ?? ''} className="text-blue-600 hover:underline" {...props}>
                    {children}
                </Link>
            );
        }
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
                {...props}
            >
                {children}
            </a>
        );
    },

    // Custom image component
    img: ({ src, alt, width, height, ...props }: PropsWithChildren<ComponentProps<'img'>>) => {
        return (
            <Image
                src={src?.toString() ?? ''}
                alt={alt || ''}
                width={(width ?? 800) as number}
                height={(height ?? 400) as number}
                className="my-4 rounded-lg"
                {...props}
            />
        );
    },

    // Code blocks
    code: ({ children, className, ...props }: PropsWithChildren<ComponentProps<'code'>>) => {
        const isInline = !className;
        if (isInline) {
            return (
                <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm" {...props}>
                    {children}
                </code>
            );
        }
        return (
            <code className={`block overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100 ${className}`} {...props}>
                {children}
            </code>
        );
    },

    // Lists
    ul: ({ children, ...props }: PropsWithChildren<ComponentProps<'ul'>>) => (
        <ul className="mb-4 list-inside list-disc space-y-2" {...props}>
            {children}
        </ul>
    ),
    ol: ({ children, ...props }: PropsWithChildren<ComponentProps<'ol'>>) => (
        <ol className="mb-4 list-inside list-decimal space-y-2" {...props}>
            {children}
        </ol>
    ),

    // Blockquote
    blockquote: ({ children, ...props }: PropsWithChildren<ComponentProps<'blockquote'>>) => (
        <blockquote className="my-4 border-l-4 border-blue-500 pl-4 text-gray-700 italic" {...props}>
            {children}
        </blockquote>
    ),

    // Custom components you can use in MDX
    Callout: ({ children, type = 'info' }: PropsWithChildren<{ type?: 'info' | 'warning' | 'success' }>) => {
        const colors = {
            info: 'bg-blue-50 border-blue-200 text-blue-800',
            warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
            success: 'bg-green-50 border-green-200 text-green-800',
        };
        return <div className={`my-4 border-l-4 p-4 ${colors[type]}`}>{children}</div>;
    },

    Button: ({ children, href }: PropsWithChildren<{ href: string }>) => (
        <Link
            href={href}
            className="my-4 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
            {children}
        </Link>
    ),
};
