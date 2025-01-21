import {PropsWithChildren} from "react";

export const MainContent = ({children}: PropsWithChildren) => {
  return <main className="flex-grow container mx-auto px-4 py-6">{children}</main>;
};