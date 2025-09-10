export function CalendarWeekView() {
    return (
        <div className="isolate flex flex-auto flex-col overflow-auto bg-white dark:bg-gray-900">
            <div style={{ width: '165%' }} className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
                <div className="sticky top-0 z-30 flex-none bg-white shadow-sm ring-1 ring-black/5 sm:pr-8 dark:bg-gray-900 dark:shadow-none dark:ring-white/20">
                    <div className="grid grid-cols-7 text-sm/6 text-gray-500 sm:hidden dark:text-gray-400">
                        <button type="button" className="flex flex-col items-center pt-2 pb-3">
                            M{' '}
                            <span className="mt-1 flex size-8 items-center justify-center font-semibold text-gray-900 dark:text-white">
                                10
                            </span>
                        </button>
                        <button type="button" className="flex flex-col items-center pt-2 pb-3">
                            T{' '}
                            <span className="mt-1 flex size-8 items-center justify-center font-semibold text-gray-900 dark:text-white">
                                11
                            </span>
                        </button>
                        <button type="button" className="flex flex-col items-center pt-2 pb-3">
                            W{' '}
                            <span className="mt-1 flex size-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white dark:bg-indigo-500">
                                12
                            </span>
                        </button>
                        <button type="button" className="flex flex-col items-center pt-2 pb-3">
                            T{' '}
                            <span className="mt-1 flex size-8 items-center justify-center font-semibold text-gray-900 dark:text-white">
                                13
                            </span>
                        </button>
                        <button type="button" className="flex flex-col items-center pt-2 pb-3">
                            F{' '}
                            <span className="mt-1 flex size-8 items-center justify-center font-semibold text-gray-900 dark:text-white">
                                14
                            </span>
                        </button>
                        <button type="button" className="flex flex-col items-center pt-2 pb-3">
                            S{' '}
                            <span className="mt-1 flex size-8 items-center justify-center font-semibold text-gray-900 dark:text-white">
                                15
                            </span>
                        </button>
                        <button type="button" className="flex flex-col items-center pt-2 pb-3">
                            S{' '}
                            <span className="mt-1 flex size-8 items-center justify-center font-semibold text-gray-900 dark:text-white">
                                16
                            </span>
                        </button>
                    </div>

                    <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm/6 text-gray-500 sm:grid dark:divide-white/10 dark:border-white/10 dark:text-gray-400">
                        <div className="col-end-1 w-14" />
                        <div className="flex items-center justify-center py-3">
                            <span>
                                Mon{' '}
                                <span className="items-center justify-center font-semibold text-gray-900 dark:text-white">
                                    10
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center justify-center py-3">
                            <span>
                                Tue{' '}
                                <span className="items-center justify-center font-semibold text-gray-900 dark:text-white">
                                    11
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center justify-center py-3">
                            <span className="flex items-baseline">
                                Wed{' '}
                                <span className="ml-1.5 flex size-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white dark:bg-indigo-500">
                                    12
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center justify-center py-3">
                            <span>
                                Thu{' '}
                                <span className="items-center justify-center font-semibold text-gray-900 dark:text-white">
                                    13
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center justify-center py-3">
                            <span>
                                Fri{' '}
                                <span className="items-center justify-center font-semibold text-gray-900 dark:text-white">
                                    14
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center justify-center py-3">
                            <span>
                                Sat{' '}
                                <span className="items-center justify-center font-semibold text-gray-900 dark:text-white">
                                    15
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center justify-center py-3">
                            <span>
                                Sun{' '}
                                <span className="items-center justify-center font-semibold text-gray-900 dark:text-white">
                                    16
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-auto">
                    <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-white/5" />
                    <div className="grid flex-auto grid-cols-1 grid-rows-1">
                        {/* Horizontal lines */}
                        <div
                            style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
                            className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100 dark:divide-white/5"
                        >
                            <div className="row-end-1 h-7" />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    12AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    1AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    2AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    3AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    4AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    5AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    6AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    7AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    8AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    9AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    10AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    11AM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    12PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    1PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    2PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    3PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    4PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    5PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    6PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    7PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    8PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    9PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    10PM
                                </div>
                            </div>
                            <div />
                            <div>
                                <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
                                    11PM
                                </div>
                            </div>
                            <div />
                        </div>

                        {/* Vertical lines */}
                        <div className="col-start-1 col-end-2 row-start-1 hidden grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7 dark:divide-white/5">
                            <div className="col-start-1 row-span-full" />
                            <div className="col-start-2 row-span-full" />
                            <div className="col-start-3 row-span-full" />
                            <div className="col-start-4 row-span-full" />
                            <div className="col-start-5 row-span-full" />
                            <div className="col-start-6 row-span-full" />
                            <div className="col-start-7 row-span-full" />
                            <div className="col-start-8 row-span-full w-8" />
                        </div>

                        {/* Events */}
                        <ol
                            style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
                            className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                        >
                            <li
                                style={{ gridRow: '74 / span 12' }}
                                className="relative mt-px flex sm:col-start-3 dark:before:pointer-events-none dark:before:absolute dark:before:inset-1 dark:before:z-0 dark:before:rounded-lg dark:before:bg-gray-900"
                            >
                                <a
                                    href="#"
                                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs/5 hover:bg-blue-100 dark:bg-blue-600/15 dark:hover:bg-blue-600/20"
                                >
                                    <p className="order-1 font-semibold text-blue-700 dark:text-blue-300">Breakfast</p>
                                    <p className="text-blue-500 group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                                        <time dateTime="2022-01-12T06:00">6:00 AM</time>
                                    </p>
                                </a>
                            </li>
                            <li
                                style={{ gridRow: '92 / span 30' }}
                                className="relative mt-px flex sm:col-start-3 dark:before:pointer-events-none dark:before:absolute dark:before:inset-1 dark:before:z-0 dark:before:rounded-lg dark:before:bg-gray-900"
                            >
                                <a
                                    href="#"
                                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs/5 hover:bg-pink-100 dark:bg-pink-600/15 dark:hover:bg-pink-600/20"
                                >
                                    <p className="order-1 font-semibold text-pink-700 dark:text-pink-300">
                                        Flight to Paris
                                    </p>
                                    <p className="text-pink-500 group-hover:text-pink-700 dark:text-pink-400 dark:group-hover:text-pink-300">
                                        <time dateTime="2022-01-12T07:30">7:30 AM</time>
                                    </p>
                                </a>
                            </li>
                            <li
                                style={{ gridRow: '122 / span 24' }}
                                className="relative mt-px hidden sm:col-start-6 sm:flex dark:before:pointer-events-none dark:before:absolute dark:before:inset-1 dark:before:z-0 dark:before:rounded-lg dark:before:bg-gray-900"
                            >
                                <a
                                    href="#"
                                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs/5 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15"
                                >
                                    <p className="order-1 font-semibold text-gray-700 dark:text-gray-300">
                                        Meeting with design team at Disney
                                    </p>
                                    <p className="text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
                                        <time dateTime="2022-01-15T10:00">10:00 AM</time>
                                    </p>
                                </a>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}
