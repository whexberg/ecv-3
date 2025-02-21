import Image from 'next/image';
import { CSSProperties } from 'react';

import { Heading, SmallText } from '@/components/heading';

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
        <div className="w-full h-full p-4 flex flex-col" style={style}>
            <Image src={image.src} alt={image.alt} width={0} height={0} className="w-full object-cover aspect-square" />
            <div className="bg-red-800 text-center flex flex-col justify-center p-4 flex-grow">
                <Heading bold xlarge>
                    {'"' + title + '"'}
                </Heading>
                <SmallText>{description}</SmallText>
            </div>
        </div>
    );
};
