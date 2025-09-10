'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { DateTime } from 'luxon';

import { Button } from '@/src/components/button';

export type ViewType = 'year' | 'month' | 'week' | 'day';

type Props = {
    selectedDate: DateTime | null;
    onViewChange: (view: ViewType) => void;
    view: ViewType;
    onNextClicked: () => void;
    onPrevClicked: () => void;
    onTodayClicked: () => void;
};

export const CalendarHeader = (props: Props) => {
    // const onYearViewClicked = () => props.onViewChange('year');
    // const onMonthViewClicked = () => props.onViewChange('month');
    // const onWeekViewClicked = () => props.onViewChange('week');
    // const onDayViewClicked = () => props.onViewChange('day');
    // const ViewSelector = () => {
    //     return (
    //         <Menu as="div" className="relative">
    //             <MenuButton
    //                 as={Button}
    //                 className="flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-xs"
    //             >
    //                 {props.view.at(0)?.toUpperCase() + props.view.slice(1) + ' view'}
    //                 <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5" />
    //             </MenuButton>
    //
    //             <MenuItems
    //                 transition
    //                 className="dark:bg-page bg-surface dark:outline-surface/10 outline-page/5 absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md shadow-lg outline-1 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:-outline-offset-1"
    //             >
    //                 <div className="py-1">
    //                     <MenuItem
    //                         as="div"
    //                         onClick={onDayViewClicked}
    //                         className="hover:bg-accent/50 block cursor-pointer px-4 py-2 text-sm"
    //                     >
    //                         Day view
    //                     </MenuItem>
    //                     <MenuItem
    //                         as="div"
    //                         onClick={onWeekViewClicked}
    //                         className="hover:bg-accent/50 block cursor-pointer px-4 py-2 text-sm"
    //                     >
    //                         Week view
    //                     </MenuItem>
    //                     <MenuItem
    //                         as="div"
    //                         onClick={onMonthViewClicked}
    //                         className="hover:bg-accent/50 block cursor-pointer px-4 py-2 text-sm"
    //                     >
    //                         Month view
    //                     </MenuItem>
    //                     <MenuItem
    //                         as="div"
    //                         onClick={onYearViewClicked}
    //                         className="hover:bg-accent/50 block cursor-pointer px-4 py-2 text-sm"
    //                     >
    //                         Year view
    //                     </MenuItem>
    //                 </div>
    //             </MenuItems>
    //         </Menu>
    //     );
    // };
    // const MobileViewSelector = () => {
    //     return (
    //         <Menu as="div" className="relative">
    //             <MenuButton className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white">
    //                 <span className="sr-only">Open menu</span>
    //                 <EllipsisHorizontalIcon aria-hidden="true" className="size-5" />
    //             </MenuButton>
    //
    //             <MenuItems
    //                 transition
    //                 className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:divide-white/10 dark:bg-gray-800 dark:-outline-offset-1 dark:outline-white/10"
    //             >
    //                 <div className="py-1">
    //                     <MenuItem
    //                         as="div"
    //                         className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
    //                     >
    //                         Go to today
    //                     </MenuItem>
    //                 </div>
    //                 <div className="py-1">
    //                     <MenuItem
    //                         onClick={onDayViewClicked}
    //                         as="div"
    //                         className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
    //                     >
    //                         Day view
    //                     </MenuItem>
    //                     <MenuItem
    //                         onClick={onWeekViewClicked}
    //                         as="div"
    //                         className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
    //                     >
    //                         Week view
    //                     </MenuItem>
    //                     <MenuItem
    //                         onClick={onMonthViewClicked}
    //                         as="div"
    //                         className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
    //                     >
    //                         Month view
    //                     </MenuItem>
    //                     <MenuItem
    //                         onClick={onYearViewClicked}
    //                         as="div"
    //                         className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
    //                     >
    //                         Year view
    //                     </MenuItem>
    //                 </div>
    //             </MenuItems>
    //         </Menu>
    //     );
    // };

    const HeaderElementLeft = () => {
        switch (props.view) {
            case 'day':
                return (
                    <div>
                        <h1 className="text-base font-semibold text-gray-900 dark:text-white">
                            <time dateTime={props.selectedDate?.toFormat('yyyy-MM-dd')} className="sm:hidden">
                                {props.selectedDate?.toFormat('DD')}
                            </time>
                            <time dateTime={props.selectedDate?.toFormat('yyyy-MM-dd')} className="hidden sm:inline">
                                {props.selectedDate?.toFormat('DDD')}
                            </time>
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {props.selectedDate?.toFormat('EEEE')}
                        </p>
                    </div>
                );
            case 'year':
                return (
                    <h1 className="text-base font-semibold">
                        <time dateTime={props.selectedDate?.toFormat('yyyy')}>
                            {props.selectedDate?.toFormat('yyyy')}
                        </time>
                    </h1>
                );
            case 'week':
            case 'month':
                return (
                    <h1 className="text-base font-semibold">
                        <time dateTime={props.selectedDate?.toFormat('yyyy-MM')}>
                            {props.selectedDate?.toFormat('MMMM yyyy')}
                        </time>
                    </h1>
                );
        }
    };

    return (
        <header className="border-accent flex items-center justify-between border-b px-6 py-4">
            <HeaderElementLeft />

            <div className="flex items-center">
                <div className="outline-accent relative flex items-center rounded-md md:items-stretch">
                    <Button
                        onClick={props.onPrevClicked}
                        className="flex h-9 w-12 items-center justify-center rounded-l-md rounded-r-none pr-1 md:w-9 md:pr-0"
                    >
                        <span className="sr-only">Previous {props.view}</span>
                        <ChevronLeftIcon aria-hidden="true" className="size-5" />
                    </Button>
                    <Button onClick={props.onTodayClicked} className="hidden rounded-none md:block">
                        Today
                    </Button>
                    <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden dark:bg-white/10" />
                    <Button
                        onClick={props.onNextClicked}
                        className="flex h-9 w-12 items-center justify-center rounded-l-none rounded-r-md pl-1 md:w-9 md:pl-0"
                    >
                        <span className="sr-only">Next {props.view}</span>
                        <ChevronRightIcon aria-hidden="true" className="size-5" />
                    </Button>
                </div>

                {/*<div className="hidden md:ml-4 md:flex md:items-center">*/}
                {/*    <ViewSelector />*/}
                {/*</div>*/}
                {/*<div className="ml-6 md:hidden">*/}
                {/*    <MobileViewSelector />*/}
                {/*</div>*/}
            </div>
        </header>
    );
};
