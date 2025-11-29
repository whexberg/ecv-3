'use client';

import { DateTime } from 'luxon';
import { useState } from 'react';

import EventDrawer from '@/app/calendar/components/event-drawer';
import { CalendarHeader } from '@/app/calendar/components/header';
import { useCalendarInfo } from '@/app/calendar/context';
import { CalendarMonthView } from '@/app/calendar/month-view';
import { CalendarEvent } from '@/lib/models/calendar-event';

export function CalendarView() {
    const { events, getEventsByMonth, getEventsByYear, getEventsByDay, getEventsByWeek } = useCalendarInfo();

    const [currentDate, setCurrentDate] = useState<DateTime<true>>(DateTime.now());
    const [selectedDate, setSelectedDate] = useState<DateTime | null>(DateTime.now());
    const [drawerEvent, setDrawerEvent] = useState<CalendarEvent>();
    const [view, setView] = useState<'day' | 'week' | 'month' | 'year'>('month');

    const handleNextClicked = () => {
        if (view === 'day') setCurrentDate((p) => p?.plus({ day: 1 }) ?? null);
        if (view === 'week') setCurrentDate((p) => p?.plus({ week: 1 }) ?? null);
        if (view === 'month') setCurrentDate((p) => p?.plus({ months: 1 }) ?? null);
        if (view === 'year') setCurrentDate((p) => p?.plus({ years: 1 }) ?? null);
    };
    const handlePrevClicked = () => {
        if (view === 'day') setCurrentDate((p) => p?.minus({ day: 1 }) ?? null);
        if (view === 'week') setCurrentDate((p) => p?.minus({ week: 1 }) ?? null);
        if (view === 'month') setCurrentDate((p) => p?.minus({ months: 1 }) ?? null);
        if (view === 'year') setCurrentDate((p) => p?.minus({ years: 1 }) ?? null);
    };
    const handleTodayClicked = () => {
        setCurrentDate(DateTime.now());
        setSelectedDate(DateTime.now());
    };

    const ViewComponent = CalendarMonthView;
    // view === 'day'
    //     ? CalendarDayView
    //     : view === 'week'
    //       ? CalendarWeekView
    //       : view === 'year'
    //         ? CalendarYearView
    //         : CalendarMonthView;

    let filteredEvents: Record<string, CalendarEvent[]> = {};
    if (view === 'day') filteredEvents = getEventsByDay(currentDate);
    if (view === 'week') filteredEvents = getEventsByWeek(currentDate);
    if (view === 'month') filteredEvents = getEventsByMonth(currentDate);
    if (view === 'year') filteredEvents = getEventsByYear(currentDate);

    const calculatedEvents = Object.entries(filteredEvents)
        .map(([key, value]) => {
            const date = DateTime.fromFormat(key, 'yyyy-MM-dd');
            return {
                date: date,
                events: value,
                isCurrentWeek: date.weekNumber === currentDate.weekNumber,
                isCurrentMonth: date.month === currentDate.month,
                isCurrentDay: date.day === currentDate.day,
                isCurrentYear: date.year === currentDate.year,
                isToday: key === DateTime.now().toISODate(),
                isSelected: key === selectedDate?.toISODate(),
            };
        }, [])
        .filter((e) => {
            if (view === 'day') return e.isCurrentDay;
            if (view === 'week') return e.isCurrentWeek;
            if (view === 'month') return e.isCurrentMonth;
            if (view === 'year') return e.isCurrentYear;

            return false;
        });

    const paddedDays = [];
    for (let i = 0; i < calculatedEvents[0].date.weekday; i++) {
        const date = calculatedEvents[0].date.minus({ days: calculatedEvents[0].date.weekday - i });
        paddedDays.push({
            date,
            events: filteredEvents[date.toISODate()!] ?? [],
            isCurrentWeek: false,
            isCurrentMonth: false,
            isCurrentDay: false,
            isCurrentYear: false,
            isToday: false,
            isSelected: false,
        });
    }
    calculatedEvents.unshift(...paddedDays);

    return (
        <div className="mx-auto flex h-full max-w-7xl flex-col">
            <CalendarHeader
                selectedDate={currentDate}
                view={view}
                onViewChange={setView}
                onNextClicked={handleNextClicked}
                onPrevClicked={handlePrevClicked}
                onTodayClicked={handleTodayClicked}
            />
            <ViewComponent
                loading={!events || Object.keys(events).length === 0}
                events={calculatedEvents}
                selectedDate={selectedDate}
                onDateSelected={setSelectedDate}
                onEventSelected={setDrawerEvent}
            />
            <EventDrawer
                open={drawerEvent !== undefined}
                onClose={() => setDrawerEvent(undefined)}
                eventInfo={drawerEvent}
            />
        </div>
    );
}
