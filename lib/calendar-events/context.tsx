'use client';

import { DateTime } from 'luxon';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { CalendarEventsApiService } from '@/lib/calendar-events/api-service';
import { CalendarEvent } from '@/lib/calendar-events/models/calendar-event';

type CalendarEvents = Record<string, CalendarEvent[]>;

export type ICalendarInfoContext = {
    events: CalendarEvents;
    selectedDate: DateTime<true>;
    setSelectedDate: (dt: DateTime<true>) => void;
    getEventsByDay: (dt: DateTime<true>) => CalendarEvents;
    getEventsByMonth: (dt: DateTime<true>) => CalendarEvents;
    getEventsByWeek: (dt: DateTime<true>) => CalendarEvents;
    getEventsByYear: (dt: DateTime<true>) => CalendarEvents;
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
        if (!selectedDate) return;
        CalendarEventsApiService.instance
            .getCalendarEventsByView('year', DateTime.utc(selectedDate.year, 1, 1))
            .then((res) => {
                if (res.isFailure) return console.log(res);

                const events = res.value.reduce((p, c) => {
                    if (!c.startAt) return p;
                    const date = c.startAt!.toISODate()!;
                    p[date] = [...(p[date] ?? []), c];
                    return p;
                }, {} as CalendarEvents);

                setEvents(events);
            })
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
