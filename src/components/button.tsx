import { PropsWithChildren } from 'react';
import Link from 'next/link';

export type ButtonProps =
    | {
          href: string;
          link: true;
          newTab?: boolean;
      }
    | {
          link?: false;
          onClick: () => void;
      };

export const Button = (props: PropsWithChildren<ButtonProps>) => {
    const classNames = 'block border-2 bg-red-800 border-red-700 px-6 py-4 hover:bg-red-700';

    if (props.link)
        return (
            <Link href={props.href} target={props.newTab ? '_blank' : '_self'} className={classNames}>
                {props.children}
            </Link>
        );

    return (
        <button className={classNames} onClick={props.onClick}>
            {props.children}
        </button>
    );
};
