import { NextRequest, NextResponse } from 'next/server';

import { HistoryReportRepository } from '@/lib/history-report/repository';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    try {
        const { id } = await params;
        const report = await HistoryReportRepository.getById(id);
        return NextResponse.json(report);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to retrieve data' }, { status: 500 });
    }
}
