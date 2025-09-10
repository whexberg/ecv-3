import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

type PageSectionProps = PropsWithChildren<{
    id?: string;
    heading?: string;
    subheading?: string;
    className?: string;
    narrow?: boolean;
}>;

export function PageSection({ id, heading, subheading, narrow, children }: PageSectionProps) {
    return (
        <section
            id={id}
            className="dark:bg-page bg-surface text-on-surface dark:text-on-page relative w-full px-4 py-18 md:px-16"
            // className="mx-auto max-w-5xl md:px-8"
        >
            <div className="relative mx-auto mb-10 text-center">
                <h1 className="font-serif text-4xl font-bold tracking-wide drop-shadow-lg md:text-6xl">{heading}</h1>
                <h3 className="font-display mx-auto mt-4 max-w-2xl text-lg font-medium md:text-2xl">{subheading}</h3>
            </div>

            <div className={clsx(narrow && 'mx-auto max-w-3xl', 'flex flex-col gap-4')}>{children}</div>
        </section>
    );
}
