import { Kysely, Selectable } from 'kysely';

import { DBUtils } from '@/lib/database/db';
import { EncodedHistoryReport } from '@/lib/models/history-report';

import { DB } from './db-types';

export const HistoryReportsRepo = {
    getAll: async (): Promise<EncodedHistoryReport[]> => {
        const db: Kysely<DB> = DBUtils.getDB();
        const result = await db.selectFrom('history_reports').selectAll().execute();
        return result.map((row: Selectable<DB['history_reports']>) => {
            if (row.date == null) return row as EncodedHistoryReport;
            return row as EncodedHistoryReport;
        });
    },
    getById: async (id: string): Promise<EncodedHistoryReport> => {
        const db: Kysely<DB> = DBUtils.getDB();
        const result = await db
            .selectFrom('history_reports')
            .selectAll()
            .where('id', '=', id)
            .limit(1)
            .executeTakeFirst();
        return result as EncodedHistoryReport;
    },
};
