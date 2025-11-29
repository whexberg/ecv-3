import { NextRequest, NextResponse } from 'next/server';

import { HistoryReportsRepo } from '@/lib/database/history-reports-repo';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    try {
        const { id } = await params;
        const report = await HistoryReportsRepo.getById(id);
        return NextResponse.json(report);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to retrieve data' }, { status: 500 });
    }
}
