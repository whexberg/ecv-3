import { NextResponse } from 'next/server';

import { HistoryReportsRepo } from '@/lib/database/history-reports-repo';

export async function POST(): Promise<NextResponse> {
    try {
        const reports = await HistoryReportsRepo.getAll();
        return NextResponse.json(reports);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to retrieve data' }, { status: 500 });
    }
}
