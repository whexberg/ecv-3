'use client';

import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { ApiError } from '@/lib/api-service';
import { BoardMemberApiService } from '@/lib/board-member/api-service';
import { BoardMember, EncodedBoardMember } from '@/lib/board-member/models/board-member';
import { Result } from '@/lib/result';
import { deserialize } from '@/lib/utils/serialization';

export type IBoardMemberInfoContext = { boardMembers: Record<string, BoardMember> };

export const Context = createContext<IBoardMemberInfoContext | undefined>(undefined);

export const BoardMemberInfoProvider = ({ children }: PropsWithChildren) => {
    const [boardMembers, setBoardMembers] = useState<Record<string, BoardMember>>({});

    useEffect(() => {
        BoardMemberApiService.instance
            .getBoardMembers()
            .then((res: Result<EncodedBoardMember[], ApiError>) => {
                if (res.isFailure) return console.log(res);
                const bm = res.value.reduce(
                    (previous, current) => {
                        const bm = deserialize(current, BoardMember);
                        return { ...previous, [bm.position]: bm };
                    },
                    {} as Record<string, BoardMember>,
                );
                setBoardMembers(bm);
            })
            .catch(console.error);
    }, []);

    const value = useMemo(() => {
        return { boardMembers };
    }, [boardMembers]);
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useBoardMemberInfo = (): IBoardMemberInfoContext => {
    const context = useContext(Context);
    if (!context) {
        throw new Error('useBoardMemberInfo must be used within a BoardMemberInfoProvider');
    }

    return context;
};
