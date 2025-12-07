'use client';

import { DateTime } from 'luxon';
import { useState } from 'react';

import EventDrawer from '@/app/calendar/components/event-drawer';
import { CalendarHeader } from '@/app/calendar/components/header';
import { CalendarMonthView } from '@/app/calendar/month-view';
import { useCalendarInfo } from '@/lib/calendar-events/context';
import { CalendarEvent } from '@/lib/calendar-events/models/calendar-event';

export function CalendarView() {
    const {
        events,
        getEventsByDay,
        getEventsByMonth,
        getEventsByWeek,
        getEventsByYear,
        selectedDate,
        setSelectedDate,
    } = useCalendarInfo();

    const [currentDate, setCurrentDate] = useState<DateTime<true>>(DateTime.now());
    // const [selectedDate, setSelectedDate] = useState<DateTime | null>(DateTime.now());
    const [drawerEvent, setDrawerEvent] = useState<CalendarEvent>();
    const [view, setView] = useState<'day' | 'week' | 'month' | 'year'>('month');

    const handleNextClicked = () => {
        setCurrentDate(currentDate.plus({ [view]: 1 }).startOf(view));
        setSelectedDate(selectedDate.plus({ [view]: 1 }).startOf(view));
    };

    const handlePrevClicked = () => {
        setCurrentDate(currentDate.minus({ [view]: 1 }).startOf(view));
        setSelectedDate(selectedDate.minus({ [view]: 1 }).startOf(view));
    };

    const handleTodayClicked = () => {
        setCurrentDate(DateTime.local().startOf('day'));
        setSelectedDate(DateTime.local().startOf('day'));
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
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col">
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
                eventInfo={drawerEvent!}
            />
        </div>
    );
}
