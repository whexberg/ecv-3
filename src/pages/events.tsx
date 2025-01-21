'use client';

import { useState } from 'react';
import { addMonths, eachDayOfInterval, endOfMonth, format, isToday, parse, startOfMonth, subMonths } from 'date-fns';
import { GetStaticProps } from 'next';
import { CalendarEvent, loadEvents } from '@/data/load-events';

type EventPageProps = {
    events: Record<string, CalendarEvent[]>;
};

const EventsPage = ({ events }: EventPageProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const handlePreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    // Get the start and end of the current month
    const startOfCurrentMonth = startOfMonth(currentDate);
    const endOfCurrentMonth = endOfMonth(currentDate);

    // Generate an array of all days in the current month
    const daysInMonth = eachDayOfInterval({ start: startOfCurrentMonth, end: endOfCurrentMonth });

    const renderedBuffer = [];
    for (let i = 0; i < startOfCurrentMonth.getDay(); i++) {
        renderedBuffer.push(<div key={i} className="text-center p-2" />);
    }

    let selectedEvents: CalendarEvent[] = [];
    if (selectedDate) selectedEvents = events[format(selectedDate, 'yyyy-MM-dd')];

    return (
        <>
            <h1 className="text-center mb-12 font-bold text-3xl">Events</h1>
            <div className="grid grid-cols-3 gap-8">
                <div className="flex justify-start items-center">
                    {isToday(currentDate) || (
                        <button
                            onClick={() => setCurrentDate(new Date())}
                            className="border px-4 py-2 hover:bg-primary "
                        >
                            Go to today
                        </button>
                    )}
                </div>
                <div className="flex justify-center items-center">
                    <button onClick={handlePreviousMonth} className="text-xl p-4">
                        {'<'}
                    </button>
                    <h2 className="text-xl font-bold min-w-56 text-center">{format(currentDate, 'MMMM yyyy')}</h2>
                    <button onClick={handleNextMonth} className="text-xl p-4">
                        {'>'}
                    </button>
                </div>
                <div></div>
            </div>
            <div className="flex flex-col lg:flex-row items-start justify-between p-4 gap-4">
                <div className="w-full lg:w-3/4">
                    <div className="grid grid-cols-7 gap-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dow) => (
                            <div key={dow} className="text-center font-semibold">
                                {dow}
                            </div>
                        ))}

                        {renderedBuffer}

                        {daysInMonth.map((day: Date) => (
                            <div
                                key={day.toISOString()}
                                className={`h-32 overflow-hidden cursor-pointer p-2 ${isToday(day) ? 'bg-primary text-white' : 'hover:bg-primary'}`}
                                onClick={() => setSelectedDate(day)}
                            >
                                {format(day, 'd')}
                                <div className="flex flex-col gap-1">
                                    {events[format(day, 'yyyy-MM-dd')]?.map((event, idx, arr) => {
                                        if (idx < 2) {
                                            const date = parse(event.date, 'yyyy-MM-dd', new Date());

                                            return (
                                                <div
                                                    key={event.title}
                                                    className={
                                                        isToday(date)
                                                            ? 'text-xs bg-white text-primary px-1.5 py-0.5'
                                                            : 'text-xs bg-primary text-white px-1.5 py-0.5'
                                                    }
                                                >
                                                    <div className="font-bold hidden lg:block">{event.title}</div>
                                                </div>
                                            );
                                        }

                                        if (idx === 2) {
                                            return (
                                                <div
                                                    key={event.title}
                                                    className="text-xs font-bold bg-primary text-white px-0.5 lg:px-1.5 py-0.5"
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
                        ))}
                    </div>
                </div>
                {(selectedDate && (
                    <div className="w-full lg:w-1/4 p-4 flex flex-col gap-4 text-white max-h-[600px] overflow-y-auto">
                        <div className="w-full flex flex-col justify-center items-center text-center">
                            <h1 className="text-2xl font-bold">{format(selectedDate, 'MMM d, yyyy')}</h1>
                            <p>Events</p>
                        </div>
                        {selectedEvents?.length ? (
                            selectedEvents.map((event, i) => {
                                return (
                                    <div key={`${event.date}-${i}`} className="border-2 border-white p-4">
                                        <h2 className="text-xl font-bold text-red-500">{event.title}</h2>
                                        <div className="mb-2 text-red-500">{event.times?.start}</div>
                                        <div className="text-sm">{event.description}</div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center">NO EVENTS TODAY</div>
                        )}
                    </div>
                )) || (
                    <div className="w-1/4 p-4 flex flex-col justify-center items-center">
                        Select a date to see events
                    </div>
                )}
            </div>
        </>
    );
};

export default EventsPage;

export const getStaticProps: GetStaticProps<EventPageProps> = async () => ({ props: { events: await loadEvents() } });
