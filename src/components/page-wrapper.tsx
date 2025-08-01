import { PropsWithChildren } from 'react';

type PageWrapperProps = PropsWithChildren;

export function PageWrapper({ children }: PageWrapperProps) {
    return <div className="mt-12 flex flex-col gap-y-20 lg:mt-24">{children}</div>;
}
