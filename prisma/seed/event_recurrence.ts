import { DateTime } from 'luxon';

import { EventRecurrenceCreateManyInput } from '@/lib/generated/prisma/models';
import { prisma } from '@/lib/prisma-client';

export function seedRecurrenceRules() {
    const data: EventRecurrenceCreateManyInput[] = [
        {
            id: '41911e75-735c-42cf-a30e-9afc33afc9aa',
            label: 'Board meeting on the 1st Friday',
            rrule: 'FREQ=MONTHLY;INTERVAL=1;BYDAY=1FR;BYHOUR=20;BYMINUTE=3;BYSECOND=0',
            start: DateTime.fromObject(
                { year: 2025, month: 2, day: 1, hour: 20, minute: 3 },
                { zone: 'America/Los_Angeles' },
            ).toJSDate(),
            until: DateTime.fromObject(
                { year: 2026, month: 2, day: 1, hour: 20, minute: 3 },
                { zone: 'America/Los_Angeles' },
            ).toJSDate(),
            tzid: 'America/Los_Angeles',
        },
        {
            id: '825ee271-44bb-4b48-a77d-bd0f0ddd9369',
            label: 'General meeting on the 3rd Friday',
            rrule: 'FREQ=MONTHLY;INTERVAL=1;BYDAY=3FR;BYHOUR=20;BYMINUTE=3;BYSECOND=0',
            start: DateTime.fromObject(
                { year: 2025, month: 2, day: 1, hour: 20, minute: 3 },
                { zone: 'America/Los_Angeles' },
            )
                .toUTC()
                .toJSDate(),
            until: DateTime.fromObject(
                { year: 2026, month: 2, day: 1, hour: 20, minute: 3 },
                { zone: 'America/Los_Angeles' },
            )
                .toUTC()
                .toJSDate(),
            tzid: 'America/Los_Angeles',
        },
        {
            id: 'c1b4210e-3c2f-416e-b332-2be8846af01e',
            label: 'Christmas shopping on 1st Saturday of December',
            // NOTE: Should time components should be in local time!!!!
            rrule: 'FREQ=YEARLY;INTERVAL=1;BYMONTH=12;BYDAY=1SA;BYHOUR=7;BYMINUTE=03;BYSECOND=0',
            start: DateTime.fromObject(
                { year: 2025, month: 12, day: 6, hour: 7, minute: 3 },
                { zone: 'America/Los_Angeles' },
            ).toJSDate(),
            tzid: 'America/Los_Angeles',
        },
    ];

    return prisma.eventRecurrence.createManyAndReturn({ data });
}
