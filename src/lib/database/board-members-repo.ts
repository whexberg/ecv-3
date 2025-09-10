import { Kysely } from 'kysely';

import { DBUtils } from '@/src/lib/database/db';
import { EncodedBoardMember } from '@/src/lib/models/board-member';

import { DB } from './db-types';

export const BoardMembersRepo = {
    getAll: async (): Promise<EncodedBoardMember[]> => {
        const db: Kysely<DB> = DBUtils.getDB();
        const result = await db.selectFrom('board_members').selectAll().execute();
        return result.map((row) => row) as EncodedBoardMember[];
    },
};
