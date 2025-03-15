'use client';

import { addMonths, eachDayOfInterval, endOfMonth, format, isToday, parse, startOfMonth, subMonths } from 'date-fns';
import { useState } from 'react';

export default function Calendar({ events }: { events: Record<string, CalendarEvent[]> }) {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const handlePreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    // Get the start and end of the current month
    const startOfCurrentMonth = startOfMonth(currentDate);
    const endOfCurrentMonth = endOfMonth(currentDate);

    // Generate an array of all days in the current month
    const daysInMonth = eachDayOfInterval({ start: startOfCurrentMonth, end: endOfCurrentMonth });
    const renderedBuffer = new Array(startOfCurrentMonth.getDay())
        .fill(null)
        .map((_, i) => <div key={i} className="p-2 text-center" />);
    const selectedEvents: CalendarEvent[] = selectedDate ? events[format(selectedDate, 'yyyy-MM-dd')] : [];

    return (
        <>
            <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-8">
                <div className="">
                    <h2 className="min-w-56 text-center text-xl font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
                </div>
                <div className="flex gap-4">
                    {isToday(currentDate) || (
                        <button
                            onClick={() => setCurrentDate(new Date())}
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
            <div className="flex flex-col items-start justify-between gap-4 p-4 lg:flex-row">
                <div className="w-full lg:w-3/4">
                    <div className="grid grid-cols-7 gap-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dow) => (
                            <div key={dow} className="text-center font-semibold">
                                {dow}
                            </div>
                        ))}

                        {renderedBuffer}

                        {daysInMonth.map((day: Date) => {
                            const dateStr = format(day, 'yyyy-MM-dd');
                            const daysEvents =
                                events[dateStr]?.sort((a, b) => {
                                    const fmt = 'yyyy-MM-dd hh:mma';
                                    const t1 = parse(`${dateStr} ${a.times?.start}`, fmt, new Date());
                                    const t2 = parse(`${dateStr} ${b.times?.start}`, fmt, new Date());
                                    return t1.getTime() - t2.getTime();
                                }) || [];

                            return (
                                <div
                                    key={day.toISOString()}
                                    className={`h-32 cursor-pointer overflow-hidden p-2 ${isToday(day) ? 'bg-red-800 text-white' : 'hover:bg-red-800'}`}
                                    onClick={() => setSelectedDate(day)}
                                >
                                    {format(day, 'd')}
                                    <div className="flex flex-col gap-1">
                                        {daysEvents.map((e, idx, arr) => {
                                            if (idx < 2) {
                                                return (
                                                    <div
                                                        key={e.title + e.times.start}
                                                        className={
                                                            isToday(day)
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
                            <h1 className="text-2xl font-bold">{format(selectedDate, 'MMM d, yyyy')}</h1>
                            <p>Events</p>
                        </div>
                        {selectedEvents?.length ? (
                            selectedEvents.map((event, i) => {
                                const times = event.isAllDay
                                    ? 'All Day'
                                    : typeof event.times.start === 'string'
                                      ? event.times.start
                                      : event.times.end
                                        ? `${format(event.times.start, 'h:mm a')} - ${format(event.times.end, 'h:mm a')}`
                                        : format(event.times.start, 'h:mm a');
                                return (
                                    <div key={`${event.times.start}-${i}`} className="border-2 border-white p-4">
                                        <h2 className="text-xl font-bold text-red-800">{event.title}</h2>
                                        <div className="mb-2 text-red-800">{times}</div>
                                        <div className="text-sm">{event.description}</div>
                                    </div>
                                );
                            })
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

// export const getStaticProps: GetStaticProps<EventPageProps> = async () => ({ props: { events: await loadEvents() } });
