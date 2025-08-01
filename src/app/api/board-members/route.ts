import { NextResponse } from 'next/server';

import { BoardMembersRepo } from '@/src/lib/database/board-members-repo';

export async function POST(): Promise<NextResponse> {
    try {
        const events = await BoardMembersRepo.getAll();

        return NextResponse.json(events);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to retrieve data' }, { status: 500 });
    }
}
