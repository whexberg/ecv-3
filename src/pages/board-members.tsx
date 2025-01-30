import Image from 'next/image';
import PageSection from '@/components/page-section';

const images: { src: string; alt: string }[] = [
    {
        src: './images/board/6030/missing.png',
        alt: 'Humbug - Budman Also   ',
    },
    {
        src: './images/board/6030/missing.png',
        alt: 'Vice Humbug - Rock Bottom',
    },
    {
        src: './images/board/6030/missing.png',
        alt: 'Gold Dust Receiver - Barf',
    },
    {
        src: './images/board/6030/missing.png',
        alt: 'Recorder - Biggins',
    },
    {
        src: './images/board/6030/missing.png',
        alt: 'Hangman - Tik Tok',
    },
    {
        src: './images/board/6030/missing.png',
        alt: 'Historian - Kurteous Maximus',
    },
    {
        src: './images/board/6030/missing.png',
        alt: 'Clampatriarch - Cakewalk',
    },
    {
        src: './images/board/6030/missing.png',
        alt: 'Board Member - Beedo',
    },
];

export default function BoardMembersPage() {
    return (
        <>
            <PageSection title="Board Members for Clamper Year 6029 (2024)">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {images.map((image) => (
                        <div
                            key={image.alt}
                            className="flex flex-col justify-center items-center relative group bg-red-600"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={333}
                                height={333}
                                className="w-full object-cover aspect-square"
                            />
                            <div className="">{image.alt}</div>
                        </div>
                    ))}
                </div>
            </PageSection>
        </>
    );
}
