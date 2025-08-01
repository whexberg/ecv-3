import clsx from 'clsx';
import Link from 'next/link';
import { MouseEventHandler, PropsWithChildren } from 'react';

type LinkProps = { onClick?: MouseEventHandler; href: string; link: true; blankTarget?: boolean };
type BtnProps = { onClick: MouseEventHandler; href?: string; link?: false };
type MainProps = { className?: string; disabled?: boolean; rounded?: boolean };

export type ButtonProps = PropsWithChildren<MainProps & (LinkProps | BtnProps)>;

export function Button({ disabled, rounded, children, ...props }: ButtonProps) {
    const classes = clsx(
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        rounded ? 'rounded-full' : 'rounded',
        'bg-red-800',
        'focus-visible:outline',
        'focus-visible:outline-2',
        'focus-visible:outline-offset-2',
        'focus-visible:outline-red-700',
        'font-semibold',
        'hover:bg-red-700',
        'px-3.5',
        'py-2',
        'shadow-sm',
        'text-sm',
    );

    return props.link ? (
        <Link
            href={props.href}
            className={classes}
            target={props.blankTarget ? '_blank' : '_self'}
            rel={props.blankTarget ? 'noopener noreferrer' : ''}
        >
            {children}
        </Link>
    ) : (
        <button disabled={disabled} type="button" className={classes} onClick={props.onClick}>
            {children}
        </button>
    );
}
