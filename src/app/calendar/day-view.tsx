import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

type Props = { events: { date: string; isCurrentMonth?: boolean; isToday?: boolean; isSelected?: boolean }[] };

export function CalendarDayView(props: Props) {
    return (
        <div className="isolate flex flex-auto overflow-hidden bg-white dark:bg-gray-900">
            <div className="flex flex-auto flex-col overflow-auto">
                <div className="sticky top-0 z-10 grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow-sm ring-1 ring-black/5 md:hidden dark:bg-gray-900 dark:text-gray-400 dark:shadow-none dark:ring-white/20">
                    <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
                        <span>W</span>
                        {/* Default: "text-gray-900 dark:text-white", Selected: "bg-gray-900 text-white", Today (Not Selected): "text-indigo-600", Today (Selected): "bg-indigo-600 text-white" */}
                        <span className="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-gray-900 dark:text-white">
                            19
                        </span>
                    </button>
                    <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
                        <span>T</span>
                        <span className="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-indigo-600 dark:text-indigo-400">
                            20
                        </span>
                    </button>
                    <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
                        <span>F</span>
                        <span className="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-gray-900 dark:text-white">
                            21
                        </span>
                    </button>
                    <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
                        <span>S</span>
                        <span className="mt-3 flex size-8 items-center justify-center rounded-full bg-gray-900 text-base font-semibold text-white dark:bg-white dark:text-gray-900">
                            22
                        </span>
                    </button>
                    <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
                        <span>S</span>
                        <span className="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-gray-900 dark:text-white">
                            23
                        </span>
                    </button>
                    <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
                        <span>M</span>
                        <span className="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-gray-900 dark:text-white">
                            24
                        </span>
                    </button>
                    <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
                        <span>T</span>
                        <span className="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-gray-900 dark:text-white">
                            25
                        </span>
                    </button>
                </div>
                <div className="flex w-full flex-auto">
                    <div className="w-14 flex-none bg-white ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-white/5" />
                    <div className="grid flex-auto grid-cols-1 grid-rows-1">
                        {/* Horizontal lines */}
                        <div
                            style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
                            className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100 dark:divide-white/5"
                        >
                            <div className="row-end-1 h-7" />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    12AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    1AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    2AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    3AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    4AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    5AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    6AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    7AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    8AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    9AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    10AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    11AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    12PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    1PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    2PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    3PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    4PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    5PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    6PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    7PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    8PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    9PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    10PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    11PM
                                </div>
                            </div>
                            <div />
                        </div>

                        {/* Events */}
                        <ol
                            style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
                            className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
                        >
                            <li
                                style={{ gridRow: '74 / span 12' }}
                                className="relative mt-px flex dark:before:pointer-events-none dark:before:absolute dark:before:inset-1 dark:before:z-0 dark:before:rounded-lg dark:before:bg-gray-900"
                            >
                                <a
                                    href="#"
                                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs/5 hover:bg-blue-100 dark:bg-blue-600/15 dark:hover:bg-blue-600/20"
                                >
                                    <p className="order-1 font-semibold text-blue-700 dark:text-blue-300">Breakfast</p>
                                    <p className="text-blue-500 group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                                        <time dateTime="2022-01-22T06:00">6:00 AM</time>
                                    </p>
                                </a>
                            </li>
                            <li
                                style={{ gridRow: '92 / span 30' }}
                                className="relative mt-px flex dark:before:pointer-events-none dark:before:absolute dark:before:inset-1 dark:before:z-0 dark:before:rounded-lg dark:before:bg-gray-900"
                            >
                                <a
                                    href="#"
                                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs/5 hover:bg-pink-100 dark:bg-pink-600/15 dark:hover:bg-pink-600/20"
                                >
                                    <p className="order-1 font-semibold text-pink-700 dark:text-pink-300">
                                        Flight to Paris
                                    </p>
                                    <p className="order-1 text-pink-500 group-hover:text-pink-700 dark:text-pink-400 dark:group-hover:text-pink-300">
                                        John F. Kennedy International Airport
                                    </p>
                                    <p className="text-pink-500 group-hover:text-pink-700 dark:text-pink-400 dark:group-hover:text-pink-300">
                                        <time dateTime="2022-01-22T07:30">7:30 AM</time>
                                    </p>
                                </a>
                            </li>
                            <li
                                style={{ gridRow: '134 / span 18' }}
                                className="relative mt-px flex dark:before:pointer-events-none dark:before:absolute dark:before:inset-1 dark:before:z-0 dark:before:rounded-lg dark:before:bg-gray-900"
                            >
                                <a
                                    href="#"
                                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-indigo-50 p-2 text-xs/5 hover:bg-indigo-100 dark:bg-indigo-600/15 dark:hover:bg-indigo-600/20"
                                >
                                    <p className="order-1 font-semibold text-indigo-700 dark:text-indigo-300">
                                        Sightseeing
                                    </p>
                                    <p className="order-1 text-indigo-500 group-hover:text-indigo-700 dark:text-indigo-400 dark:group-hover:text-indigo-300">
                                        Eiffel Tower
                                    </p>
                                    <p className="text-indigo-500 group-hover:text-indigo-700 dark:text-indigo-400 dark:group-hover:text-indigo-300">
                                        <time dateTime="2022-01-22T11:00">11:00 AM</time>
                                    </p>
                                </a>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block dark:border-white/10">
                <div className="flex items-center text-center text-gray-900 dark:text-white">
                    <button
                        type="button"
                        className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white"
                    >
                        <span className="sr-only">Previous month</span>
                        <ChevronLeftIcon aria-hidden="true" className="size-5" />
                    </button>
                    <div className="flex-auto text-sm font-semibold">January 2022</div>
                    <button
                        type="button"
                        className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white"
                    >
                        <span className="sr-only">Next month</span>
                        <ChevronRightIcon aria-hidden="true" className="size-5" />
                    </button>
                </div>
                <div className="mt-6 grid grid-cols-7 text-center text-xs/6 text-gray-500 dark:text-gray-400">
                    <div>M</div>
                    <div>T</div>
                    <div>W</div>
                    <div>T</div>
                    <div>F</div>
                    <div>S</div>
                    <div>S</div>
                </div>
                <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow-sm ring-1 ring-gray-200 dark:bg-white/10 dark:shadow-none dark:ring-white/10">
                    {props.events.map((day) => (
                        <button
                            key={day.date}
                            type="button"
                            data-is-today={day.isToday ? '' : undefined}
                            data-is-selected={day.isSelected ? '' : undefined}
                            data-is-current-month={day.isCurrentMonth ? '' : undefined}
                            className="py-1.5 not-data-is-current-month:bg-gray-50 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-100 focus:z-10 data-is-current-month:bg-white not-data-is-selected:data-is-current-month:not-data-is-today:text-gray-900 data-is-current-month:hover:bg-gray-100 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-600 nth-36:rounded-bl-lg nth-7:rounded-tr-lg dark:not-data-is-current-month:bg-gray-900/75 dark:not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 dark:hover:bg-gray-900/25 dark:data-is-current-month:bg-gray-900/90 dark:not-data-is-selected:data-is-current-month:not-data-is-today:text-white dark:data-is-current-month:hover:bg-gray-900/50 dark:data-is-selected:text-gray-900 dark:data-is-today:not-data-is-selected:text-indigo-400"
                        >
                            <time
                                dateTime={day.date}
                                className="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-600 dark:in-data-is-selected:not-in-data-is-today:bg-white dark:in-data-is-selected:in-data-is-today:bg-indigo-500"
                            >
                                {day.date.split('-')?.pop()?.replace(/^0/, '')}
                            </time>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
