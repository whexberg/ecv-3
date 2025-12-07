import { NextResponse } from 'next/server';

import { HistoryReportRepository } from '@/lib/history-report/repository';

export async function POST(): Promise<NextResponse> {
    try {
        const reports = await HistoryReportRepository.getAll();
        return NextResponse.json(reports);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to retrieve data' }, { status: 500 });
    }
}
