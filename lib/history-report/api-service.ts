import { ApiService } from '@/lib/api-service';
import { EncodedHistoryReport, HistoryReport } from '@/lib/history-report/history-report';
import { AsyncResult, Result } from '@/lib/result';
import { deserialize } from '@/lib/utils/serialization';

export type ApiError = {
    message: string;
    status: number;
    endpoint: string;
};

export class HistoryReportApiService extends ApiService {
    private static _instance: HistoryReportApiService;

    private constructor() {
        super();
    }

    public static get instance(): HistoryReportApiService {
        HistoryReportApiService._instance ??= new HistoryReportApiService();
        return HistoryReportApiService._instance;
    }

    // Board Members API
    public async getHistoryReports(): AsyncResult<HistoryReport[], ApiError> {
        const response = await this.POST<EncodedHistoryReport[]>('/api/history-reports');

        if (response.isFailure) return response;
        return Result.success(response.value.map((c) => deserialize(c, HistoryReport)));
    }
}
