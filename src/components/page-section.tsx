import { PropsWithChildren } from 'react';

type PageSectionProps = PropsWithChildren<{
    id?: string;
    title?: string;
    className?: string;
}>;

export default function PageSection({ id = '', title = '', children, className = '' }: PageSectionProps) {
    return (
        <section id={id} className={`container py-12 ${className}`}>
            {title && <h2 className="text-3xl font-bold text-center mb-6">{title}</h2>}
            <div>{children}</div>
        </section>
    );
}
