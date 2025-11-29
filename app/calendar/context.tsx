'use client';

import { DateTime } from 'luxon';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { CalendarEvent, ICalendarEvent } from '@/lib/models/calendar-event';
import { Serialized } from '@/lib/models/map-types';

type CalendarEvents = Record<string, CalendarEvent[]>;

export type ICalendarInfoContext = {
    events: CalendarEvents;
    selectedDate: DateTime;
    setSelectedDate: (dt: DateTime) => void;
    getEventsByDay: (dt: DateTime) => CalendarEvents;
    getEventsByMonth: (dt: DateTime) => CalendarEvents;
    getEventsByWeek: (dt: DateTime) => CalendarEvents;
    getEventsByYear: (dt: DateTime) => CalendarEvents;
};

export const CalendarInfoContext = createContext<ICalendarInfoContext | undefined>(undefined);

export const CalendarInfoProvider = ({ children }: PropsWithChildren) => {
    const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.utc());
    const [events, setEvents] = useState<CalendarEvents>({});

    const getEventsByYear = useCallback(
        (dt: DateTime): CalendarEvents => {
            const filtered = {} as CalendarEvents;
            for (let i = 0; i < dt.daysInYear; i++) {
                const dateStr = dt.startOf('year').plus({ days: i }).toISODate()!;
                filtered[dateStr] = events[dateStr] ?? [];
            }
            return filtered;
        },
        [events],
    );

    const getEventsByMonth = useCallback(
        (dt: DateTime): CalendarEvents => {
            const filtered = {} as CalendarEvents;
            for (
                let i = 0;
                i < dt.daysInMonth! + dt.minus({ month: 1 }).daysInMonth! + dt.plus({ month: 1 }).daysInMonth!;
                i++
            ) {
                const dateStr = dt.minus({ month: 1 }).startOf('month').plus({ days: i }).toISODate()!;
                filtered[dateStr] = events[dateStr] ?? [];
            }
            return filtered;
        },
        [events],
    );

    const getEventsByDay = useCallback(
        (dt: DateTime): CalendarEvents => ({ [dt.toISODate()!]: events[dt.toISODate()!] ?? [] }) as CalendarEvents,
        [events],
    );

    const getEventsByWeek = useCallback(
        (dt: DateTime): CalendarEvents => {
            const filtered = {} as CalendarEvents;
            for (let i = 0; i < 7; i++) {
                const dateStr = dt.startOf('week').plus({ days: i }).toISODate()!;
                filtered[dateStr] = events[dateStr] ?? [];
            }
            return filtered;
        },
        [events],
    );

    useEffect(() => {
        fetch('/api/calendar-events', { method: 'POST', body: JSON.stringify({ selectedDate: selectedDate.toISO() }) })
            .then((r) => r.json())
            .then((res: Serialized<ICalendarEvent>[]) =>
                res.reduce((p, c) => {
                    const event = CalendarEvent.deserialize(c);
                    if (!event.startDateTime) return p;
                    const date = event.startDateTime!.toISODate()!;
                    p[date] = [...(p[date] ?? []), event];
                    return p;
                }, {} as CalendarEvents),
            )
            .then(setEvents)
            .catch(console.error);
    }, [selectedDate]);

    const value = useMemo(() => {
        return {
            events,
            getEventsByDay,
            getEventsByMonth,
            getEventsByWeek,
            getEventsByYear,
            selectedDate,
            setSelectedDate,
        };
    }, [events, getEventsByDay, getEventsByMonth, getEventsByWeek, getEventsByYear, selectedDate]);
    return <CalendarInfoContext.Provider value={value}>{children}</CalendarInfoContext.Provider>;
};

export const useCalendarInfo = (): ICalendarInfoContext => {
    const context = useContext(CalendarInfoContext);
    if (!context) {
        throw new Error('useCalendarInfo must be used within a CalendarInfoProvider');
    }

    return context;
};
