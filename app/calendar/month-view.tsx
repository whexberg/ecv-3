import { ClockIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { DateTime } from 'luxon';

import { Loader } from '@/components/loader';
import { CalendarEvent } from '@/lib/models/calendar-event';

type Props = {
    events: {
        date: DateTime;
        events: CalendarEvent[];
        isCurrentMonth?: boolean;
        isToday?: boolean;
        isSelected?: boolean;
    }[];
    selectedDate: DateTime | null;
    onDateSelected: (dt: DateTime | null) => void;
    onEventSelected: (e: CalendarEvent) => void;
    loading?: boolean;
};

export function CalendarMonthView(props: Props) {
    if (props.loading) return <Loader />;
    return (
        <>
            <div className="lg:flex lg:flex-auto lg:flex-col">
                <div className="border-accent grid grid-cols-7 gap-px border-b text-center text-xs/6 font-semibold lg:flex-none">
                    <div className="flex justify-center py-2">
                        M<span className="sr-only sm:not-sr-only">on</span>
                    </div>
                    <div className="flex justify-center py-2">
                        T<span className="sr-only sm:not-sr-only">ue</span>
                    </div>
                    <div className="flex justify-center py-2">
                        W<span className="sr-only sm:not-sr-only">ed</span>
                    </div>
                    <div className="flex justify-center py-2">
                        T<span className="sr-only sm:not-sr-only">hu</span>
                    </div>
                    <div className="flex justify-center py-2">
                        F<span className="sr-only sm:not-sr-only">ri</span>
                    </div>
                    <div className="flex justify-center py-2">
                        S<span className="sr-only sm:not-sr-only">at</span>
                    </div>
                    <div className="flex justify-center py-2">
                        S<span className="sr-only sm:not-sr-only">un</span>
                    </div>
                </div>

                {/* Calendar Days */}

                {/*{props.loading ? (*/}
                {/*    <Loader />*/}
                {/*) : (*/}
                <div className="flex text-xs/6 md:flex-auto">
                    {/* Desktop View */}
                    <div className="hidden w-full md:grid md:grid-cols-7 md:grid-rows-6 md:gap-px">
                        {props.events.map((day) => (
                            <div
                                key={day.date.toISO()!}
                                data-is-today={day.isToday ? '' : undefined}
                                data-is-current-month={day.isCurrentMonth ? '' : undefined}
                                className={clsx(
                                    'bg-surface',
                                    'dark:bg-page',
                                    'dark:text-on-page',
                                    // 'group',
                                    'px-3',
                                    'py-2',
                                    'relative',
                                    'text-on-surface',
                                )}
                            >
                                <time
                                    dateTime={day.date.toISODate()!}
                                    className={clsx(
                                        'relative',
                                        'not-data-is-current-month:opacity-75',
                                        'in-data-is-today:flex',
                                        'in-data-is-today:size-6',
                                        'in-data-is-today:items-center',
                                        'in-data-is-today:justify-center',
                                        'in-data-is-today:rounded-full',
                                        'in-data-is-today:bg-accent',
                                        'in-data-is-today:font-semibold',
                                        'in-data-is-today:text-white',
                                        'dark:in-data-is-today:bg-accent',
                                    )}
                                >
                                    {day.date.day}
                                </time>
                                {day.events.length > 0 ? (
                                    <ol className="mt-2">
                                        {day.events.slice(0).map((event) => (
                                            <li
                                                key={event.id}
                                                onClick={props.onEventSelected.bind(null, event)}
                                                className="group flex cursor-pointer"
                                            >
                                                <p className="group-hover:text-accent dark:group-hover:text-accent text-page flex-auto truncate font-medium dark:text-white">
                                                    {event.title}
                                                </p>
                                                <time
                                                    dateTime={event.startDateTime?.toISODate() ?? undefined}
                                                    className="group-hover:text-accent dark:group-hover:text-accent ml-3 hidden flex-none text-gray-500 xl:block dark:text-gray-400"
                                                >
                                                    {event.startDateTime?.toFormat('h:mma')}
                                                </time>
                                            </li>
                                        ))}
                                        {/*{day.events.length > 2 ? (*/}
                                        {/*    <li className="text-gray-500 dark:text-gray-400">*/}
                                        {/*        + {day.events.length - 2} more*/}
                                        {/*    </li>*/}
                                        {/*) : null}*/}
                                    </ol>
                                ) : null}
                            </div>
                        ))}
                    </div>

                    {/* Mobile View */}
                    <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px md:hidden">
                        {props.events.map((day) => (
                            <button
                                key={day.date.toISO()!}
                                type="button"
                                data-is-today={day.isToday ? '' : undefined}
                                data-is-selected={day.isSelected ? '' : undefined}
                                data-is-current-month={day.isCurrentMonth ? '' : undefined}
                                className={clsx(
                                    'dark:data-is-current-month:bg-accent/10',
                                    'dark:data-is-current-month:hover:bg-accent-hover',
                                    'dark:data-is-current-month:text-surface',
                                    'dark:hover:bg-accent-hover/50',
                                    'dark:not-data-is-current-month:bg-page',

                                    'data-is-current-month:bg-surface',
                                    'data-is-current-month:hover:bg-accent-hover',
                                    'data-is-current-month:outline',
                                    'data-is-current-month:outline-page',
                                    'data-is-current-month:text-on-surface',
                                    'data-is-selected:text-white',

                                    'flex',
                                    'flex-col',
                                    'focus:z-10',
                                    'font-semibold',
                                    'group',
                                    'h-14',
                                    'hover:bg-accent-hover/50',
                                    'not-data-is-current-month:bg-page/10',
                                    'px-3',
                                    'py-2',
                                    'relative',
                                )}
                                onClick={props.onDateSelected.bind(null, day.date)}
                            >
                                <time
                                    dateTime={day.date.toISODate()!}
                                    className={clsx(
                                        'dark:in-data-is-selected:not-in-data-is-today:bg-surface',
                                        'dark:in-data-is-selected:not-in-data-is-today:text-on-surface',
                                        'group-not-data-is-current-month:opacity-75',
                                        'in-data-is-selected:flex',
                                        'in-data-is-selected:in-data-is-today:bg-accent',
                                        'in-data-is-selected:items-center',
                                        'in-data-is-selected:justify-center',
                                        'in-data-is-selected:not-in-data-is-today:bg-on-surface',
                                        'in-data-is-selected:not-in-data-is-today:text-surface',
                                        'in-data-is-selected:rounded-full',
                                        'ml-auto',
                                        'size-6',
                                    )}
                                >
                                    {day.date.day}
                                </time>
                                <span className="sr-only">{day.events.length} events</span>
                                {day.events.length > 0 ? (
                                    <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                                        {day.events.map((event) => (
                                            <span
                                                key={event.id}
                                                className="bg-accent dark:bg-surface mx-0.5 mb-1 size-1.5 rounded-full"
                                            />
                                        ))}
                                    </span>
                                ) : null}
                            </button>
                        ))}
                    </div>
                </div>
                {/*)}*/}
            </div>

            {/* Event details */}
            <div className="relative px-4 py-10 sm:px-6 lg:hidden dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:top-0 dark:after:h-px dark:after:bg-white/10">
                <ol
                    className={clsx(
                        'bg-accent',
                        'dark:-outline-offset-1',
                        'dark:bg-accent/50',
                        'dark:divide-surface/10',
                        'dark:outline-surface/10',
                        'dark:shadow-none',
                        'divide-page',
                        'divide-y',
                        'outline-1',
                        'outline-page/5',
                        'overflow-hidden',
                        'rounded-lg',
                        'shadow-sm',
                        'text-sm',
                    )}
                >
                    {props.events
                        .find((d) => d.date.toISODate() === props.selectedDate?.toISODate())
                        ?.events.map((event) => (
                            <li
                                key={event.id}
                                className="group hover:bg-accent-hover focus-within:bg-accent-hover flex cursor-pointer p-4 pr-6"
                                onClick={props.onEventSelected.bind(null, event)}
                            >
                                <div className="flex-auto">
                                    <p className="text-on-accent font-semibold">{event.title}</p>
                                    <time
                                        dateTime={event.startDateTime!.toISOTime()!}
                                        className="text-on-accent mt-2 flex items-center"
                                    >
                                        <ClockIcon aria-hidden="true" className="text-on-accent mr-2 size-5" />
                                        {event.timeRange()}
                                    </time>
                                </div>
                            </li>
                        ))}
                </ol>
            </div>
        </>
    );
}
