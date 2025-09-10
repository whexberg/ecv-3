import clsx from 'clsx';
import Link from 'next/link';
import { MouseEventHandler, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type LinkProps = { onClick?: MouseEventHandler; href: string; link: true; blankTarget?: boolean };
type BtnProps = { onClick: MouseEventHandler; href?: string; link?: false };
type MainProps = { className?: string; disabled?: boolean; rounded?: boolean };

export type ButtonProps = PropsWithChildren<MainProps & (LinkProps | BtnProps)>;

export function Button({ disabled, rounded, children, className, ...props }: ButtonProps) {
    const classes = twMerge(
        clsx(
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            rounded ? 'rounded-full' : 'rounded',
            'bg-accent',
            'text-on-accent',
            'focus-visible:outline',
            'focus-visible:outline-2',
            'focus-visible:outline-offset-2',
            'focus-visible:outline-accent',
            'font-semibold',
            'hover:bg-accent-hover',
            'px-3.5',
            'py-2',
            'shadow-sm',
            'text-sm',
            className,
        ),
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
