'use client';

import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { ApiError } from '@/lib/api-service';
import { HistoryReportApiService } from '@/lib/history-report/api-service';
import { HistoryReport } from '@/lib/history-report/history-report';
import { Result } from '@/lib/result';

export type IHistoryReportsContext = {
    historyReports: HistoryReport[];
    initialized: boolean;
};

export const HistoryReportsContext = createContext<IHistoryReportsContext | undefined>(undefined);

export const HistoryReportsProvider = ({ children }: PropsWithChildren) => {
    const [historyReports, setHistoryReports] = useState<HistoryReport[]>([]);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        HistoryReportApiService.instance
            .getHistoryReports()
            .then((res: Result<HistoryReport[], ApiError>) => {
                if (res.isFailure) return console.log(res);
                const reports = res.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setHistoryReports(reports);
                setInitialized(true);
            })
            .catch(console.error);
    }, []);

    const value = useMemo(() => {
        return { historyReports, initialized };
    }, [historyReports, initialized]);
    return <HistoryReportsContext.Provider value={value}>{children}</HistoryReportsContext.Provider>;
};

export const useHistoryReports = (): IHistoryReportsContext => {
    const context = useContext(HistoryReportsContext);
    if (!context) {
        throw new Error('useHistoryReports must be used within a HistoryReportsProvider');
    }

    return context;
};
