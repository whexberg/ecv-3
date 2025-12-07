import { EncodedHistoryReport, HistoryReport } from '@/lib/history-report/history-report';
import { prisma } from '@/lib/prisma-client';
import { deserialize, deserializeArray } from '@/lib/utils/serialization';

export const HistoryReportRepository = {
    getAll: async (): Promise<EncodedHistoryReport[]> => {
        const result = await prisma.historyReport.findMany({});
        return deserializeArray(result, HistoryReport);
    },
    getById: async (id: string): Promise<EncodedHistoryReport> => {
        const result = await prisma.historyReport.findFirst({ where: { id } });
        return deserialize(result, HistoryReport);
    },
};
