import { Noto_Sans, Sedan_SC } from 'next/font/google';
import React, { FC } from 'react';

const sedan = Sedan_SC({ weight: ['400'], subsets: ['latin'] });
const notoSans = Noto_Sans({ weight: ['400', '500', '600', '700', '800'], subsets: ['latin'] });

// Define shared props for all components
type TypographyProps = {
    children: React.ReactNode;

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

export const Heading: FC<TypographyProps> = (props: TypographyProps) => {
    const weightClass = resolveWeightClass(props, 'font-bold');
    const sizeClass = resolveSizeClass(props, 'text-5xl');
    const colorClass = resolveColorClass(props, 'text-white');
    const alignmentClass = resolveAlignmentClass(props, 'text-center');

    const className = `${sizeClass} ${weightClass} ${colorClass} ${alignmentClass}`.replaceAll(/\s+/g, ' ').trim();
    const styles = { ...sedan.style, ...props.style };

    return (
        <h2 className={className} style={styles}>
            {props.children}
        </h2>
    );
};

export const Subheading: FC<TypographyProps> = (props: TypographyProps) => {
    const weightClass = resolveWeightClass(props, 'font-semibold');
    const sizeClass = resolveSizeClass(props, 'text-3xl');
    const colorClass = resolveColorClass(props, 'text-white');
    const alignmentClass = resolveAlignmentClass(props, 'text-center');

    const className = `${sizeClass} ${weightClass} ${colorClass} ${alignmentClass}`.replaceAll(/\s+/g, ' ').trim();
    const styles = { ...sedan.style, ...props.style };

    return (
        <h3 style={styles} className={className}>
            {props.children}
        </h3>
    );
};

export const Paragraph: FC<TypographyProps> = (props: TypographyProps) => {
    const weightClass = resolveWeightClass(props);
    const sizeClass = resolveSizeClass(props);
    const colorClass = resolveColorClass(props);
    const alignmentClass = resolveAlignmentClass(props);

    const className = `${sizeClass} ${weightClass} ${colorClass} ${alignmentClass}`.replaceAll(/\s+/g, ' ').trim();
    const styles = { ...notoSans.style, ...props.style };

    return (
        <p style={styles} className={className}>
            {props.children}
        </p>
    );
};

export const SmallText: FC<TypographyProps> = (props: TypographyProps) => {
    const weightClass = resolveWeightClass(props);
    const sizeClass = resolveSizeClass(props, 'text-sm');
    const colorClass = resolveColorClass(props);
    const alignmentClass = resolveAlignmentClass(props);

    const className = `${sizeClass} ${weightClass} ${colorClass} ${alignmentClass}`.replaceAll(/\s+/g, ' ').trim();
    const styles = { ...notoSans.style, ...props.style };

    return (
        <span style={styles} className={className}>
            {props.children}
        </span>
    );
};

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
