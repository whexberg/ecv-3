import { PropsWithChildren } from 'react';

type PageSectionProps = PropsWithChildren<{
    id?: string;
    title?: string;
    className?: string;
    bgColor?: string;
}>;

export default function PageSection({ id = '', title = '', bgColor = '', children }: PageSectionProps) {
    return (
        <section className={`bg-primary bg-[${bgColor}]`} id={id}>
            <div className="container py-8 mx-auto">
                {title && <h2 className="text-3xl font-bold text-center mb-6">{title}</h2>}
                <div className="">{children}</div>
            </div>
        </section>
    );
}
