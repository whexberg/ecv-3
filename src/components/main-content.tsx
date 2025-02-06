import { PropsWithChildren } from 'react';

export const MainContent = ({ children }: PropsWithChildren) => {
    return <main className="flex-grow">{children}</main>;
};
