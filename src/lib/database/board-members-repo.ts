import { getDatabase } from '@/src/lib/database/db';
import { EncodedBoardMember } from '@/src/lib/models/board-member';

export const BoardMembersRepo = {
    getAll: async (): Promise<EncodedBoardMember[]> => {
        const db = getDatabase();
        const result = await db.query(`SELECT *
                                       FROM board_members`);
        return result.rows as EncodedBoardMember[];
    },
};
