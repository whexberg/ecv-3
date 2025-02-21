import { PropsWithChildren } from 'react';

import { Heading, Subheading } from '@/components/heading';

type PageSectionProps = PropsWithChildren<{
    id?: string;
    heading?: string;
    subheading?: string;
    className?: string;
    bgColor?: string;
}>;

export function PageSection({ id, heading, subheading, bgColor, children }: PageSectionProps) {
    return (
        <section className={`bg-primary bg-[${bgColor}]`} id={id}>
            <div className="container py-8 mx-auto">
                <div className="mt-10 mb-20">
                    {heading && (
                        <Heading xxlarge bold center>
                            {heading}
                        </Heading>
                    )}
                    {subheading && (
                        <Subheading xlarge bold center>
                            {subheading}
                        </Subheading>
                    )}
                </div>

                {children}
            </div>
        </section>
    );
}

export default PageSection;
