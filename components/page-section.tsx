import { PropsWithChildren } from 'react';

import { Heading, Subheading } from '@/components/heading';

type PageSectionProps = PropsWithChildren<{
    id?: string;
    heading?: string;
    subheading?: string;
    className?: string;
    narrow?: boolean;
}>;

export function PageSection({ id, heading, subheading, narrow, children }: PageSectionProps) {
    return (
        <div id={id} className={`${narrow ? 'max-w-7xl' : 'container'} mx-auto px-4 sm:px-6 lg:px-8`}>
            <div className="mb-20">
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

            {narrow ? <div className="mx-auto max-w-3xl">{children}</div> : children}
        </div>
    );
}

export default PageSection;
