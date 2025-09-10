'use client';

import { Dialog, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { CalendarEvent } from '@/src/lib/models/calendar-event';

type Props = {
    open: boolean;
    onClose: () => void;
    eventInfo?: CalendarEvent;
};

export default function EventDrawer({ open, onClose, eventInfo }: Props) {
    return (
        <Dialog open={open} onClose={onClose} className="relative z-10">
            <div className="bg-page/95 fixed inset-0 transition-opacity" aria-hidden="true" />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                        >
                            <div className="bg-surface dark:bg-page relative flex h-full flex-col overflow-y-auto shadow-xl dark:after:absolute dark:after:inset-y-0 dark:after:left-0 dark:after:w-px dark:after:bg-white/10">
                                <div className="px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2 id="slide-over-heading" className="text-base font-semibold">
                                            {eventInfo?.title}
                                        </h2>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button type="button" onClick={onClose} className="relative rounded-md">
                                                <span className="absolute -inset-2.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="size-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Main */}
                                <div>
                                    <div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
                                        <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                                            <div>
                                                <dt className="text-sm font-medium sm:w-40 sm:shrink-0">Description</dt>
                                                <dd className="mt-1 text-sm sm:col-span-2">
                                                    <p>{eventInfo?.description}</p>
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium sm:w-40 sm:shrink-0">When?</dt>
                                                <dd className="mt-1 text-sm sm:col-span-2">{eventInfo?.timeRange()}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium sm:w-40 sm:shrink-0">Location</dt>
                                                <dd className="mt-1 text-sm sm:col-span-2">{eventInfo?.location}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
