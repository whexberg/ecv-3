import { BoardMember } from '@/lib/board-member/models/board-member';
import { prisma } from '@/lib/prisma-client';
import { deserializeArray } from '@/lib/utils/serialization';

export const Repository = {
    getAll: async (): Promise<BoardMember[]> => {
        const result = await prisma.boardMember.findMany({});
        return deserializeArray(result, BoardMember);
    },
};
