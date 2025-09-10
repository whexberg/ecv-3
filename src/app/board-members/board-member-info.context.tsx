'use client';

import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { BoardMember, EncodedBoardMember } from '@/src/lib/models/board-member';

export type IBoardMemberInfoContext = {
    boardMembers: Record<string, BoardMember>;
};

export const BoardMemberInfoContext = createContext<IBoardMemberInfoContext | undefined>(undefined);

export const BoardMemberInfoProvider = ({ children }: PropsWithChildren) => {
    const [boardMembers, setBoardMembers] = useState<Record<string, BoardMember>>({});

    useEffect(() => {
        fetch('/api/board-members', { method: 'POST' })
            .then((r) => r.json())
            .then((res: EncodedBoardMember[] = []) =>
                res
                    .map(BoardMember.deserialize)
                    .reduce((p, c) => ({ ...p, [c.position]: c }), {} as Record<string, BoardMember>),
            )
            .then(setBoardMembers)
            .catch(console.error);
    }, []);

    const value = useMemo(() => {
        return { boardMembers };
    }, [boardMembers]);
    return <BoardMemberInfoContext.Provider value={value}>{children}</BoardMemberInfoContext.Provider>;
};

export const useBoardMemberInfo = (): IBoardMemberInfoContext => {
    const context = useContext(BoardMemberInfoContext);
    if (!context) {
        throw new Error('useBoardMemberInfo must be used within a BoardMemberInfoProvider');
    }

    return context;
};
