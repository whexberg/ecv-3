'use client';

import './image-card-grid.css';

import { useBoardMemberInfo } from '@/src/app/board-members/board-member-info.context';
import { ImageCard } from '@/src/app/board-members/components/image-card';

export const ImageCardGrid = () => {
    const { boardMembers } = useBoardMemberInfo();
    if (Object.keys(boardMembers).length === 0) return null;
    const pos = [
        'Humbug',
        'Vice Humbug',
        'Gold Dust Receiver',
        'Recorder',
        'Damned Fool Door Keep',
        'Board Member',
        'Hangman',
        'Clampatriarch',
        'Historian',
        'Historian Emeritus',
        'Cyber Recorder',
    ];

    return (
        <div className="image-card-grid grid">
            {pos?.map((position, idx) => (
                <ImageCard
                    key={boardMembers[position].position + idx}
                    description={boardMembers[position].position}
                    image={{ src: boardMembers[position].image, alt: boardMembers[position].name }}
                    title={boardMembers[position].name}
                />
            ))}
        </div>
    );
};
