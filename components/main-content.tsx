import { PropsWithChildren } from 'react';

export const MainContent = ({ children }: PropsWithChildren) => {
    return <main className="h-full flex-grow">{children}</main>;
};
