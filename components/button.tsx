import Link from 'next/link';
import { MouseEventHandler, PropsWithChildren } from 'react';

export type ButtonProps = { className?: string; disabled?: boolean } & (
    | {
          href?: string;
          link: true;
          newTab?: boolean;
      }
    | {
          link?: false;
          onClick?: MouseEventHandler;
      }
);

export const Button = (props: PropsWithChildren<ButtonProps>) => {
    const classNames = 'block border-2 bg-red-800 border-red-800 px-6 py-4 hover:bg-red-800 cursor-pointer';

    if (props.link) {
        if (props.disabled) {
            return (
                <button className={classNames} disabled={props.disabled}>
                    {props.children}
                </button>
            );
        }
        return (
            <Link href={props.href ?? ''} target={props.newTab ? '_blank' : '_self'} className={classNames}>
                {props.children}
            </Link>
        );
    }

    return (
        <button className={classNames} onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    );
};
