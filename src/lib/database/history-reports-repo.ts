import { getDatabase } from '@/src/lib/database/db';
import { EncodedHistoryReport } from '@/src/lib/models/history-report';

export const HistoryReportsRepo = {
    getAll: async (): Promise<EncodedHistoryReport[]> => {
        const db = getDatabase();
        const result = await db.query(`SELECT * FROM history_reports`);
        return result.rows.map((row: EncodedHistoryReport) => {
            row.date = (row.date as unknown as Date)?.toISOString().split('T')[0];
            return row;
        });
    },
    getById: async (id: string): Promise<EncodedHistoryReport> => {
        const db = getDatabase();
        const result = await db.query(`SELECT * FROM history_reports WHERE id = $1 LIMIT 1`, [id]);
        return result.rows.map((row: EncodedHistoryReport) => {
            row.date = (row.date as unknown as Date)?.toISOString().split('T')[0];
            return row;
        })[0] as EncodedHistoryReport;
    },
};
