import { PropsWithChildren } from 'react';

type PageWrapperProps = PropsWithChildren;

export function PageWrapper({ children }: PageWrapperProps) {
    return <div className="mt-12 lg:mt-24">{children}</div>;
}
