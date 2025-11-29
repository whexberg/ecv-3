import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface BlogCardProps {
    title: string;
    date: string;
    excerpt: string;
    imageUrl?: string;
    href: string;
    className?: string;
    author?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ title, date, excerpt, imageUrl, href, className, author }) => {
    return (
        <Link
            href={href}
            className={twMerge(
                clsx(
                    'group border-muted bg-muted/50 dark:shadow-accent-hover overflow-hidden rounded-xl border transition-shadow hover:-translate-y-1 hover:shadow-lg',
                    'flex flex-col sm:flex-row',
                    className,
                ),
            )}
        >
            {imageUrl ? (
                <div className="h-48 flex-shrink-0 overflow-hidden sm:h-auto sm:w-48">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            ) : null}

            <div className="flex flex-col justify-between p-4 sm:p-6">
                <div>
                    <h2 className="font-display mb-1 line-clamp-1 text-xl font-semibold underline-offset-8 group-hover:underline">
                        {title}
                    </h2>
                    {author && <p className="text-muted-foreground text-xs font-bold">{author}</p>}
                    <time className="text-muted-foreground text-xs">{date}</time>
                    <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">{excerpt}</p>
                </div>
                <div className="text-accent group-hover:text-accent-foreground mt-4 text-sm font-medium">
                    Read more →
                </div>
            </div>
        </Link>
    );
};
