import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { DateTime } from 'luxon';

import { Button } from '@/components/button';

export type ViewType = 'year' | 'month' | 'week' | 'day';

type Props = {
    onNextClicked: () => void;
    onPrevClicked: () => void;
    onTodayClicked: () => void;
    onViewChange: (view: ViewType) => void;
    selectedDate: DateTime | null;
    view: ViewType;
};

export const CalendarHeader = (props: Props) => (
    <header className="border-accent flex flex-col items-center justify-between gap-4 border-b px-6 py-4 md:flex-row">
        {props.view === 'day' ? (
            <div>
                <h1 className="text-base font-semibold text-gray-900 dark:text-white">
                    <time dateTime={props.selectedDate?.toFormat('yyyy-MM-dd')} className="sm:hidden">
                        {props.selectedDate?.toFormat('DD')}
                    </time>
                    <time dateTime={props.selectedDate?.toFormat('yyyy-MM-dd')} className="hidden sm:inline">
                        {props.selectedDate?.toFormat('DDD')}
                    </time>
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{props.selectedDate?.toFormat('EEEE')}</p>
            </div>
        ) : props.view === 'year' ? (
            <h1 className="text-base font-semibold">
                <time dateTime={props.selectedDate?.toFormat('yyyy')}>{props.selectedDate?.toFormat('yyyy')}</time>
            </h1>
        ) : (
            <h1 className="text-base font-semibold">
                <time dateTime={props.selectedDate?.toFormat('yyyy-MM')}>
                    {props.selectedDate?.toFormat('MMMM yyyy')}
                </time>
            </h1>
        )}

        <div className="flex items-center">
            <div className="outline-accent relative flex items-center rounded-md md:items-stretch">
                <Button
                    onClick={props.onPrevClicked}
                    className="flex h-9 w-12 items-center justify-center rounded-l-md rounded-r-none pr-1 md:w-9 md:pr-0"
                >
                    <span className="sr-only">Previous {props.view}</span>
                    <ChevronLeftIcon aria-hidden="true" className="size-5" />
                </Button>
                <Button onClick={props.onTodayClicked} className="rounded-none">
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
        </div>
    </header>
);
