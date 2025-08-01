'use client';

import { DateTime } from 'luxon';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Options, RRule } from 'rrule';
import { Weekday } from 'rrule/dist/esm/weekday';

import { CalendarEvent, EncodedCalendarEvent } from '@/src/lib/models/calendar-event';

type CalendarEvents = Record<string, CalendarEvent[]>;

export type ICalendarInfoContext = {
    calendarEvents: CalendarEvents;
    selectedDate: DateTime;
    setSelectedDate: (dt: DateTime) => void;
    getEventsByYear: (y: number) => CalendarEvent[];
    getEventsByMonth: (y: number, m: number) => CalendarEvent[];
    getEventsByDay: (y: number, m: number, d: number) => CalendarEvent[];
};

export const CalendarInfoContext = createContext<ICalendarInfoContext | undefined>(undefined);

export const CalendarInfoProvider = ({ children }: PropsWithChildren) => {
    const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.utc());
    const [calendarEvents, setCalendarEvents] = useState<CalendarEvents>({});

    const getEventsByYear = useCallback(
        (y: number): CalendarEvent[] =>
            Object.entries(calendarEvents)
                .filter(([k]) => k.startsWith(y.toString().padStart(4, '0')))
                .flatMap(([, v]) => v),
        [calendarEvents],
    );

    const getEventsByMonth = useCallback(
        (y: number, m: number): CalendarEvent[] =>
            Object.entries(calendarEvents)
                .filter(([k]) => k.startsWith(`${y.toString().padStart(4, '0')}-${m.toString().padStart(2, '0')}`))
                .flatMap(([, v]) => v),
        [calendarEvents],
    );

    const getEventsByDay = useCallback(
        (y: number, m: number, d: number): CalendarEvent[] =>
            Object.entries(calendarEvents)
                .filter(([k]) =>
                    k.startsWith(
                        `${y.toString().padStart(4, '0')}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`,
                    ),
                )
                .flatMap(([, v]) => v),
        [calendarEvents],
    );

    useEffect(() => {
        fetch('/api/calendar-events', { method: 'POST', body: JSON.stringify({ selectedDate: selectedDate.toISO() }) })
            .then((r) => r.json())
            .then((res: EncodedCalendarEvent[]) =>
                res.reduce((p, c) => {
                    const event = CalendarEvent.deserialize(c);
                    let expandedDays: string[] = [];
                    if (event.startTime) {
                        expandedDays = expandEventToDays(event);
                    } else if (event.frequency) {
                        expandedDays = expandRecurringEventToDays(
                            event,
                            selectedDate.startOf('month'),
                            selectedDate.endOf('month'),
                        );
                    }

                    for (const day of expandedDays) {
                        if (p[day] == null) p[day] = [event];
                        else p[day].push(event);
                    }
                    return p;
                }, {} as CalendarEvents),
            )
            .then(setCalendarEvents)
            .catch(console.error);
    }, [selectedDate]);

    const value = useMemo(() => {
        return {
            calendarEvents,
            selectedDate,
            setSelectedDate,
            getEventsByYear,
            getEventsByMonth,
            getEventsByDay,
        };
    }, [calendarEvents, getEventsByDay, getEventsByMonth, getEventsByYear, selectedDate]);
    return <CalendarInfoContext.Provider value={value}>{children}</CalendarInfoContext.Provider>;
};

export const useCalendarInfo = (): ICalendarInfoContext => {
    const context = useContext(CalendarInfoContext);
    if (!context) {
        throw new Error('useCalendarInfo must be used within a CalendarInfoProvider');
    }

    return context;
};

function expandEventToDays(event: CalendarEvent): string[] {
    if (!event.startTime) return [];
    if (!event.endTime || event.startTime === event.endTime) return [event.startTime];

    const start = DateTime.fromISO(event.startTime)!;
    const end = DateTime.fromISO(event.endTime)!;

    const days: string[] = [];
    let cursor = start;
    while (cursor <= end) {
        days.push(cursor.toISODate()!);
        cursor = cursor.plus({ days: 1 });
    }

    return days;
}

function expandRecurringEventToDays(event: CalendarEvent, rangeStart: DateTime, rangeEnd: DateTime): string[] {
    const parsedStart = DateTime.fromISO(event.startTime);

    const options: Partial<Options> = {
        freq: RRule[event.frequency as 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'],
        dtstart: parsedStart.isValid ? parsedStart.toJSDate() : DateTime.local().startOf('month').toUTC().toJSDate(),
        interval: event.interval || 1,
        until: event.until ? DateTime.fromISO(event.until).toJSDate() : undefined,
        count: event.count || undefined,
        bymonth: event.bymonth || undefined,
        bymonthday: event.bymonthday || undefined,
        byhour: event.byhour || undefined,
        byminute: event.byminute || undefined,
        bysecond: event.bysecond || undefined,
    };

    // Convert "1FR" or "3MO" etc. to RRule.Day[]
    if (event.byday) {
        options.byweekday = event.byday
            .map((str) => {
                const match = str.match(/^([1-4])?([A-Z]{2})$/);
                if (!match) return null;
                const [, ord, weekday] = match;
                if (weekday == null) return [];
                const rruleWeekday = RRule[weekday as 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU'];
                return ord ? rruleWeekday.nth(parseInt(ord)) : rruleWeekday;
            })
            .filter(Boolean) as Weekday[];
    }

    return new RRule(options)
        .between(rangeStart.toJSDate(), rangeEnd.toJSDate(), true)
        .map((dt) => DateTime.fromJSDate(dt).toISODate())
        .filter((dt) => dt !== null) as string[];
}
