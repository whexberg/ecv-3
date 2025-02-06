import Image from 'next/image';
import PageSection from '../components/page-section';

const images: { src: string; position: string; name: string }[] = [
    {
        src: './images/board/6030/budman_also_cropped.JPG',
        position: 'Humbug',
        name: 'Budman Also',
    },
    {
        src: './images/board/6030/rock_bottom_cropped.jpg',
        position: 'Vice Humbug',
        name: 'Rock Bottom',
    },
    {
        src: './images/board/6030/barf_cropped.jpeg',
        position: 'Gold Dust Receiver',
        name: 'Barf',
    },
    {
        src: './images/board/6030/biggins_cropped.jpeg',
        position: 'Recorder',
        name: 'Biggins',
    },
    {
        src: './images/board/6030/tennisball_cropped.jpeg',
        position: 'Damned Fool Door Keep',
        name: 'Tennis Ball',
    },
    {
        src: './images/board/6030/beedo_cropped.jpeg',
        position: 'Board Member',
        name: 'Beedo',
    },
    {
        src: './images/board/6030/monk.jpg',
        position: 'Board Member',
        name: 'Monk',
    },
    {
        src: './images/board/6030/missing.png',
        position: 'Board Member',
        name: 'Horn Belly',
    },
    {
        src: './images/board/6030/tiktok_cropped.jpeg',
        position: 'Hangman',
        name: 'Tik Tok',
    },
    {
        src: './images/board/6030/cakewalk_cropped.jpg',
        position: 'Clampatriarch',
        name: 'Cakewalk',
    },
    {
        src: './images/board/6030/stilts_cropped.jpeg',
        position: 'Historian',
        name: 'Stilts',
    },
    {
        src: './images/board/6030/missing.png',
        position: 'Historian Emeritus',
        name: 'Kurteous Maximus',
    },
    {
        src: './images/board/6030/missing.png',
        position: 'Cyber Recorder',
        name: 'Pathogen',
    },
];

export default function BoardMembersPage() {
    return (
        <>
            <PageSection title="Board Members for Clamper Year 6029 (2024)">
                <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-12">
                    {images.map((image) => (
                        <div key={image.position} className="max-w-[333px] relative group aspect-square">
                            <Image
                                src={image.src}
                                alt={`${image.position} ${image.name}`}
                                width={0}
                                height={0}
                                className="w-full object-cover aspect-square"
                            />
                            <div className="bg-red-800 w-full text-center p-4">
                                <div className="font-bold text-lg tracking-wide">{`"${image.name}"`}</div>
                                <div className="font-mono">{image.position}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </PageSection>
        </>
    );
}
