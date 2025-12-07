import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { env } from 'prisma/config';

import { PrismaClient } from '@/lib/generated/prisma/client';
import { seedBoardMember } from '@/prisma/seed/board_member';
import { seedCalendarEvents } from '@/prisma/seed/event';
import { seedRecurrenceRules } from '@/prisma/seed/event_recurrence';
import { seedHistoryReport } from '@/prisma/seed/history_report';

const adapter = new PrismaBetterSqlite3({ url: env('DATABASE_URL') });
const prisma = new PrismaClient({ adapter });

async function main() {
    const events = await seedCalendarEvents();
    const recurrenceRules = await seedRecurrenceRules();
    await seedBoardMember();
    await seedHistoryReport();

    const boardMeeting = events.find((e) => e.title === 'Board Meeting');
    const generalMeeting = events.find((e) => e.title === 'General Meeting');
    const christmasToyDrive = events.find((e) => e.title === 'Receiving Home Toy Drive');
    const firstFriday = recurrenceRules.find((r) => r.label.includes('Board meeting'));
    const thirdFriday = recurrenceRules.find((r) => r.label.includes('General meeting'));
    const firstSaturdayDecember = recurrenceRules.find((r) => r.label.includes('Christmas shopping'));
    await prisma.eventRecurrenceLink.createMany({
        data: [
            { event_id: boardMeeting!.id, recurrence_id: firstFriday!.id },
            { event_id: generalMeeting!.id, recurrence_id: thirdFriday!.id },
            { event_id: christmasToyDrive!.id, recurrence_id: firstSaturdayDecember!.id },
        ],
    });

    await prisma.recurrenceException.createMany({
        data: [
            { event_id: generalMeeting!.id, date: '2025-12-19T20:03:00.000Z', reason: 'Christmas party' },
            { event_id: generalMeeting!.id, date: '2026-01-16T20:03:00.000Z', reason: 'Election night' },
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());
