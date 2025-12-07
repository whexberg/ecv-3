import { NextResponse } from 'next/server';

import { Repository } from '@/lib/board-member/repository';
import { serializeArray } from '@/lib/utils/serialization';

export async function POST(): Promise<NextResponse> {
    try {
        const events = await Repository.getAll();

        return NextResponse.json(serializeArray(events));
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to retrieve data' }, { status: 500 });
    }
}
