import clsx from 'clsx';
import { MouseEventHandler, PropsWithChildren } from 'react';

export type ButtonProps = PropsWithChildren<{
    className?: string;
    disabled?: boolean;
    onClick?: MouseEventHandler;
    rounded?: boolean;
}>;

export function Button({ disabled, rounded, onClick, children }: ButtonProps) {
    return (
        <button
            disabled={disabled}
            type="button"
            className={clsx(
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
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
