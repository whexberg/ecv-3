import { Noto_Sans, Sedan_SC } from 'next/font/google';
import React, { FC, JSX } from 'react';

const sedan = Sedan_SC({ weight: ['400'], subsets: ['latin'] });
const notoSans = Noto_Sans({ weight: ['400', '500', '600', '700', '800'], subsets: ['latin'] });

// Define shared props for all components
type TypographyProps = {
    children: React.ReactNode;

    as?: keyof JSX.IntrinsicElements;

    small?: boolean;
    medium?: boolean;
    large?: boolean;
    xlarge?: boolean;
    xxlarge?: boolean;

    light?: boolean;
    normal?: boolean;
    bold?: boolean;

    red?: boolean;
    black?: boolean;
    white?: boolean;

    left?: boolean;
    center?: boolean;
    right?: boolean;

    style?: React.CSSProperties; // Inline styles
};

// Reusable typography component factory
function createTypographyComponent(
    defaultTag: keyof JSX.IntrinsicElements,
    defaultSizeClass: string,
    defaultWeightClass: string,
    defaultColorClass: string,
    defaultAlignmentClass: string,
    fontStyle?: React.CSSProperties,
): FC<TypographyProps> {
    const TypographyComponent: FC<TypographyProps> = (props) => {
        const sizeClass = resolveSizeClass(props, defaultSizeClass);
        const weightClass = resolveWeightClass(props, defaultWeightClass);
        const colorClass = resolveColorClass(props, defaultColorClass);
        const alignmentClass = resolveAlignmentClass(props, defaultAlignmentClass);

        const className = `${sizeClass} ${weightClass} ${colorClass} ${alignmentClass}`.replaceAll(/\s+/g, ' ').trim();
        const styles = { ...fontStyle, ...props.style };
        const Element = props.as ?? defaultTag;

        return (
            <Element className={className} style={styles}>
                {props.children}
            </Element>
        );
    };

    return TypographyComponent;
}

export const Heading = createTypographyComponent(
    'h2',
    'text-5xl',
    'font-bold',
    'text-white',
    'text-center',
    sedan.style,
);

export const Subheading: FC<TypographyProps> = createTypographyComponent(
    'h3',
    'text-3xl',
    'font-semibold',
    'text-white',
    'text-center',
    notoSans.style,
);

export const Text: FC<TypographyProps> = createTypographyComponent(
    'p',
    'text-base',
    'font-normal',
    'text-white',
    'text-left',
);

export const SmallText: FC<TypographyProps> = createTypographyComponent(
    'span',
    'text-sm',
    'font-normal',
    'text-white',
    'text-left',
);

// Resolve size class based on props (small, medium, large)
const resolveSizeClass = (
    { small, medium, large, xlarge, xxlarge }: TypographyProps,
    defaultValue: string = 'text-base',
): string => {
    if (small) return 'text-sm';
    if (medium) return 'text-base';
    if (large) return 'text-lg';
    if (xlarge) return 'text-3xl';
    if (xxlarge) return 'text-5xl';
    return defaultValue;
};

const resolveWeightClass = ({ light, normal, bold }: TypographyProps, defaultValue: string = 'font-normal'): string => {
    if (light) return 'font-light';
    if (normal) return 'font-normal';
    if (bold) return 'font-bold';
    return defaultValue;
};

const resolveColorClass = ({ red, black, white }: TypographyProps, defaultValue: string = 'text-white'): string => {
    if (red) return 'text-red-500';
    if (black) return 'text-black';
    if (white) return 'text-white';
    return defaultValue;
};

const resolveAlignmentClass = (
    { left, center, right }: TypographyProps,
    defaultValue: string = 'text-left',
): string => {
    if (left) return 'text-left';
    if (center) return 'text-center';
    if (right) return 'text-right';
    return defaultValue;
};
