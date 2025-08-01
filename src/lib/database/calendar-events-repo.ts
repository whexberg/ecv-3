import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import { getDatabase } from '@/src/lib/database/db';
import { EncodedCalendarEvent } from '@/src/lib/models/calendar-event';

export const CalendarEventsRepo = {
    createEvent: async (
        event: Omit<EncodedCalendarEvent, 'id' | 'created_at' | 'updated_at'> & { id?: string },
    ): Promise<EncodedCalendarEvent> => {
        const db = getDatabase();
        const id = event.id ?? uuidv4;

        const result = await db.query(
            `
                INSERT INTO calendar_events (id,
                                             title,
                                             description,
                                             location,
                                             start_time,
                                             end_time,
                                             frequency,
                                             interval,
                                             byweekday,
                                             bymonthday,
                                             bymonth,
                                             byday,
                                             until,
                                             count,
                                             meta)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                RETURNING *
            `,
            [
                id,
                event.title,
                event.description ?? '',
                event.location ?? '',
                event.start_time ?? 'TBD',
                event.end_time ?? '',
                event.frequency,
                event.interval ?? 0,
                event.byweekday,
                event.bymonthday,
                event.bymonth,
                event.until,
                event.count,
                event.meta ?? '{}',
            ],
        );

        return result.rows[0] as EncodedCalendarEvent;
    },

    getEventById: async (id: string): Promise<EncodedCalendarEvent | null> => {
        const result = await getDatabase().query(
            `SELECT *
             FROM calendar_events
             WHERE id = $1`,
            [id],
        );
        return result.rows[0] as EncodedCalendarEvent;
    },

    getAllEvents: async (): Promise<EncodedCalendarEvent[]> => {
        const db = getDatabase();
        const result = await db.query(`SELECT * FROM calendar_events`);
        return result.rows as EncodedCalendarEvent[];
    },

    getEventsByDate: async (date: string): Promise<EncodedCalendarEvent[]> => {
        const dt = DateTime.fromISO(date);

        const db = getDatabase();
        const result = await db.query(
            `SELECT *
             FROM calendar_events
             WHERE start_time >= ?
               AND end_time <= ?`,
            [dt.startOf('day').toISO(), dt.plus({ days: 1 }).startOf('day').toISO()],
        );

        return result.rows as EncodedCalendarEvent[];
    },

    updateEvent: async (
        id: string,
        updates: Partial<Omit<EncodedCalendarEvent, 'id' | 'created_at' | 'updated_at'>>,
    ): Promise<EncodedCalendarEvent | null> => {
        const existing = (await CalendarEventsRepo.getEventById(id)) as EncodedCalendarEvent | null;
        if (!existing) return null;

        const db = getDatabase();
        const result = await db.query(
            `UPDATE calendar_events
             SET title       = $2,
                 description = $3,
                 location    = $4,
                 start_time  = $5,
                 end_time    = $6,
                 frequency   = $7,
                 interval    = $8,
                 byweekday   = $9,
                 bymonthday  = $10,
                 bymonth     = $11,
                 until       = $12,
                 count       = $13,
                 meta        = 14
             WHERE id = $1
             RETURNING *`,
            [
                id,
                updates.title ?? existing.title,
                updates.description ?? existing.description,
                updates.location ?? existing.location,
                updates.start_time ?? existing.start_time,
                updates.end_time ?? existing.end_time,
                updates.frequency ?? existing.frequency,
                updates.interval ?? existing.interval,
                updates.byweekday ?? existing.byweekday,
                updates.bymonthday ?? existing.bymonthday,
                updates.bymonth ?? existing.bymonth,
                updates.until ?? existing.until,
                updates.count ?? existing.count,
                updates.meta ?? existing.meta,
            ],
        );

        return result.rows[0] as EncodedCalendarEvent;
    },

    deleteEvent: async (id: string): Promise<boolean> => {
        const db = getDatabase();
        const result = await db.query(
            `DELETE
             FROM calendar_events
             WHERE id = ?`,
            [id],
        );
        return result.rows.length > 0;
    },
};
