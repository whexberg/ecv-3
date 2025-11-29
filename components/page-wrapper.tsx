import { PropsWithChildren } from 'react';

type PageWrapperProps = PropsWithChildren;

export const PageWrapper = ({ children }: PageWrapperProps) => (
    <div className="dark:bg-page bg-surface flex flex-col">{children}</div>
);
