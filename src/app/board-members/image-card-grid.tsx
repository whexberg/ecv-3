'use client';

import { useBoardMemberInfo } from '@/src/app/board-members/board-member-info.context';

export const ImageCardGrid = () => {
    const { boardMembers } = useBoardMemberInfo();
    if (Object.keys(boardMembers).length === 0) return null;

    const positions = [
        'humbug',
        'vice-humbug',
        'gold-dust-receiver',
        'recorder',
        'damned-fool-door-keep',
        'board-member-1',
        'board-member-2',
        'board-member-3',
        'hangman',
        'clampatriarch',
        'historian',
        'historian-emeritus',
        'cyber-recorder',
    ];

    return (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {positions.map((position) => {
                const boardMember = boardMembers[position];
                return (
                    <div key={boardMember.id} className="border-accent flex h-full w-full flex-col border p-4">
                        <img
                            src={boardMember.image}
                            alt={boardMember.name}
                            className="aspect-square w-full object-cover"
                        />
                        <div className="bg-accent text-on-accent flex flex-grow flex-col justify-center p-4 text-center">
                            <div className="font-display text-xl font-bold">{boardMember.name}</div>
                            <div className="font-default text-sm font-bold">{boardMember.label}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
