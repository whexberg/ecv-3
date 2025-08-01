import Image from 'next/image';
import { CSSProperties } from 'react';

import { Heading, SmallText } from '@/src/components/heading';

interface ImageCardProps {
    image: {
        src: string;
        alt: string;
    };
    title: string;
    description: string;
    style?: Partial<CSSProperties>;
}

export const ImageCard = ({ description, image, style, title }: ImageCardProps) => {
    return (
        <div className="flex h-full w-full flex-col p-4" style={style}>
            <Image src={image.src} alt={image.alt} width={0} height={0} className="aspect-square w-full object-cover" />
            <div className="flex flex-grow flex-col justify-center bg-red-800 p-4 text-center">
                <Heading bold xlarge>
                    {'"' + title + '"'}
                </Heading>
                <SmallText center>{description}</SmallText>
            </div>
        </div>
    );
};
