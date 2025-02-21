import Image from 'next/image';

type CustomImageProps = {
    src: string;
    alt: string;
    priority?: string;
};

export default function CustomImage({ src, alt, priority }: CustomImageProps) {
    return (
        <div className="w-full h-full">
            <Image className="rounded-lg mx-auto" src={src} alt={alt} width={650} height={650} priority={!!priority} />
        </div>
    );
}
