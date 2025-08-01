'use client';

import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { EncodedHistoryReport, HistoryReport } from '@/src/lib/models/history-report';

export type IHistoryReportsContext = {
    historyReports: HistoryReport[];
};

export const HistoryReportsContext = createContext<IHistoryReportsContext | undefined>(undefined);

export const HistoryReportsProvider = ({ children }: PropsWithChildren) => {
    const [historyReports, setHistoryReports] = useState<HistoryReport[]>([]);

    useEffect(() => {
        fetch('/api/history-reports', { method: 'POST' })
            .then((r) => r.json())
            .then((res: EncodedHistoryReport[]) =>
                res.map(HistoryReport.deserialize).sort((a, b) => b.date.localeCompare(a.date)),
            )
            .then(setHistoryReports)
            .catch(console.error);
    }, []);

    const value = useMemo(() => {
        return { historyReports };
    }, [historyReports]);
    return <HistoryReportsContext.Provider value={value}>{children}</HistoryReportsContext.Provider>;
};

export const useHistoryReports = (): IHistoryReportsContext => {
    const context = useContext(HistoryReportsContext);
    if (!context) {
        throw new Error('useHistoryReports must be used within a HistoryReportsProvider');
    }

    return context;
};
