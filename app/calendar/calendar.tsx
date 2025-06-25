'use client';

import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

import { CalendarEvent, CalendarEventRow } from '@/lib/models/calendar-event';
import { DateTimeUtils } from '@/lib/models/datetimes';

export function Calendar() {
    const [events, setEvents] = useState<Record<string, CalendarEvent[]>>({});
    const [currentDate, setCurrentDate] = useState<DateTime>(DateTime.utc());
    const [selectedDate, setSelectedDate] = useState<DateTime | null>(DateTime.utc());
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Set to local time after hydration
        setCurrentDate(DateTime.local());
        setSelectedDate(DateTime.local());
    }, []);

    const handlePreviousMonth = () => setCurrentDate(currentDate.minus({ month: 1 }));
    const handleNextMonth = () => setCurrentDate(currentDate.plus({ month: 1 }));

    // Use the client-aware date for calculations
    const displayDate = isClient ? currentDate : DateTime.utc();
    const startOfCurrentMonth = displayDate.startOf('month');
    const endOfCurrentMonth = displayDate.endOf('month');

    const daysInMonth = DateTimeUtils.eachDayOfInterval(startOfCurrentMonth, endOfCurrentMonth);
    const renderedBuffer = new Array(startOfCurrentMonth.weekday)
        .fill(null)
        .map((_, i) => <div key={i} className="p-2 text-center" />);

    const selectedEvents: CalendarEvent[] = selectedDate ? events[selectedDate.toISODate() ?? ''] : [];

    useEffect(() => {
        fetch('/api/calendar-events')
            .then((r) => r.json())
            .then((res: CalendarEventRow[]) => {
                const events = res.reduce(
                    (p, c) => {
                        const event = CalendarEvent.deserialize(c);
                        const start = event.startDate as keyof typeof p;
                        p[start] ??= [];
                        p[start].push(CalendarEvent.deserialize(c));
                        return p;
                    },
                    {} as Record<string, CalendarEvent[]>,
                );
                setEvents(events);
            });
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-8">
                <div className="">
                    <h2 className="min-w-56 text-center text-xl font-bold">{displayDate.toFormat('MMMM yyyy')}</h2>
                </div>
                <div className="flex gap-4">
                    {(displayDate.year === (isClient ? DateTime.local() : DateTime.utc()).year &&
                        displayDate.month === (isClient ? DateTime.local() : DateTime.utc()).month &&
                        displayDate.day === (isClient ? DateTime.local() : DateTime.utc()).day) || (
                        <button
                            onClick={() => setCurrentDate(DateTime.local())}
                            className="border px-4 py-2 hover:bg-red-800"
                        >
                            Go to today
                        </button>
                    )}
                    <button onClick={handlePreviousMonth} className="p-4 text-xl">
                        {'<'}
                    </button>
                    <button onClick={handleNextMonth} className="p-4 text-xl">
                        {'>'}
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-start justify-between gap-4 p-4 lg:flex-row" suppressHydrationWarning>
                <div className="w-full lg:w-3/4">
                    <div className="grid grid-cols-7 gap-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dow) => (
                            <div key={dow} className="text-center font-semibold">
                                {dow}
                            </div>
                        ))}

                        {renderedBuffer}

                        {daysInMonth.map((day: DateTime) => {
                            const dateStr = day.toISODate() ?? '';
                            const daysEvents = events[dateStr]?.sort(CalendarEvent.sortFn) || [];

                            return (
                                <div
                                    key={day.toISO()}
                                    className={`h-32 cursor-pointer overflow-hidden p-2 ${isClient && DateTimeUtils.isToday(day) ? 'bg-red-800 text-white' : 'hover:bg-red-800'}`}
                                    onClick={() => setSelectedDate(day)}
                                >
                                    {day.toFormat('d')}
                                    <div className="flex flex-col gap-1">
                                        {daysEvents.map((e, idx, arr) => {
                                            if (idx < 2) {
                                                return (
                                                    <div
                                                        key={e.title + e.startDate + 'T' + e.startTime}
                                                        className={
                                                            DateTimeUtils.isToday(day)
                                                                ? 'bg-white px-1.5 py-0.5 text-xs text-red-800'
                                                                : 'bg-red-800 px-1.5 py-0.5 text-xs text-white'
                                                        }
                                                    >
                                                        <div className="hidden font-bold lg:block">{e.title}</div>
                                                    </div>
                                                );
                                            }

                                            if (idx === 2) {
                                                return (
                                                    <div
                                                        key={e.title}
                                                        className="bg-red-800 px-0.5 py-0.5 text-xs font-bold text-white lg:px-1.5"
                                                    >
                                                        <p className="hidden lg:block">{arr.length - 2} more...</p>
                                                        <p className="block lg:hidden">+{arr.length - 2}</p>
                                                    </div>
                                                );
                                            }

                                            return null;
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {(selectedDate && (
                    <div className="flex max-h-[600px] w-full flex-col gap-4 overflow-y-auto p-4 text-white lg:w-1/4">
                        <div className="flex w-full flex-col items-center justify-center text-center">
                            <h1 className="text-2xl font-bold">{selectedDate.toFormat('MMM d, yyyy')}</h1>
                            <p>Events</p>
                        </div>
                        {selectedEvents?.length ? (
                            selectedEvents.map((event, i) => (
                                <div key={`${event.startTime}-${i}`} className="border-2 border-white p-4">
                                    <h2 className="text-xl font-bold text-red-800">{event.title}</h2>
                                    <div className="mb-2 text-red-800">{event.timeRange()}</div>
                                    <div className="text-sm">{event.description}</div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center">NO EVENTS TODAY</div>
                        )}
                    </div>
                )) || (
                    <div className="flex w-1/4 flex-col items-center justify-center p-4">
                        Select a date to see events
                    </div>
                )}
            </div>
        </>
    );
}
