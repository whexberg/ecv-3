'use client';
import { DateTime } from 'luxon';
import { useSearchParams } from 'next/navigation';
import { ComponentProps } from 'react';

import { Event, eventsRepository } from '@/lib/events/events-repository';

const RecurringEvent = ({
    fill = '#e3e3e3',
    height = 24,
    viewBox = '0 -960 960 960',
    width = 24,
    ...props
}: ComponentProps<'svg'>) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox={viewBox} width={width} fill={fill} {...props}>
            <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v240h-80v-80H200v400h280v80H200ZM760 0q-73 0-127.5-45.5T564-160h62q13 44 49.5 72T760-60q58 0 99-41t41-99q0-58-41-99t-99-41q-29 0-54 10.5T662-300h58v60H560v-160h60v57q27-26 63-41.5t77-15.5q83 0 141.5 58.5T960-200q0 83-58.5 141.5T760 0ZM200-640h560v-80H200v80Zm0 0v-80 80Z" />
        </svg>
    );
};

export function EventComponent({ event }: { event: Event }) {
    const params = useSearchParams();
    const occurrence_date = params.get('s')!;
    const start_datetime = DateTime.fromISO(occurrence_date);

    console.log(event);

    return (
        <div className="mx-auto max-w-4xl p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-4 text-center text-5xl font-bold">{event.metadata.title}</h1>

                {event.metadata.description && (
                    <p className="text-on-page my-4 text-center text-xl">{event.metadata.description}</p>
                )}

                <div className="flex flex-col flex-wrap items-center gap-2 text-gray-600">
                    {event.metadata.location && (
                        <div className="flex items-center gap-2 text-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height={20}
                                viewBox="0 -960 960 960"
                                width={20}
                                fill="#e3e3e3"
                            >
                                <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                            </svg>
                            <span>{event.metadata.location}</span>
                        </div>
                    )}

                    {event.metadata.start_datetime && (
                        <div className="flex items-center gap-2 text-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height={20}
                                viewBox="0 -960 960 960"
                                width={20}
                                fill="#e3e3e3"
                            >
                                <path d="M200-640h560v-80H200v80Zm0 0v-80 80Zm0 560q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v227q-19-9-39-15t-41-9v-43H200v400h252q7 22 16.5 42T491-80H200Zm520 40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm67-105 28-28-75-75v-112h-40v128l87 87Z" />
                            </svg>
                            <span>
                                {start_datetime?.isValid &&
                                    start_datetime.toJSDate().toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: '2-digit',
                                    })}
                            </span>
                        </div>
                    )}

                    {/* <div className="flex flex-wrap gap-2">
                        {event.metadata.event_type && (
                            <span className="bg-surface text-on-surface w-fit rounded-full px-3 py-1 text-sm">
                                {event.metadata.event_type}
                            </span>
                        )}

                        {event.metadata.is_members_only && (
                            <span className="bg-surface text-on-surface w-fit rounded-full px-3 py-1 text-sm">
                                Members Only
                            </span>
                        )}
                    </div> */}
                </div>
            </div>

            {/* Recurrence Info */}
            {event.metadata.recurrence && (
                <div className="my-8 flex items-center gap-4 border-l-4 p-2">
                    <RecurringEvent />
                    <div>
                        <p className="font-semibold">This is a recurring Event</p>
                        <p className="text-sm text-gray-500">{event.metadata.recurrence.label}</p>
                    </div>
                </div>
            )}

            {/* MDX Content - Just render it directly! */}
            <div className="prose prose-lg max-w-none">{event.mdxContent}</div>

            {/* Contacts */}
            {event.metadata.contacts && event.metadata.contacts.length > 0 && (
                <div className="mt-12 rounded-lg bg-gray-50 p-6">
                    <h2 className="mb-4 text-2xl font-semibold">Contact Information</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {event.metadata.contacts.map((contact, idx) => (
                            <div key={idx} className="rounded-lg bg-white p-4">
                                <p className="text-lg font-medium">{contact.name}</p>
                                {contact.email && (
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        {contact.email}
                                    </a>
                                )}
                                {contact.phone && (
                                    <a href={`tel:${contact.phone}`} className="block text-sm text-gray-600">
                                        {contact.phone}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Attachments */}
            {event.metadata.attachments && event.metadata.attachments.length > 0 && (
                <div className="mt-8">
                    <h2 className="mb-4 text-2xl font-semibold">Attachments</h2>
                    <div className="space-y-2">
                        {event.metadata.attachments.map((attachment, idx) => (
                            <a
                                key={idx}
                                href={attachment.file_url}
                                className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 transition hover:bg-gray-100"
                            >
                                <span className="text-2xl">
                                    {attachment.file_type === 'pdf' && '📄'}
                                    {attachment.file_type === 'image' && '🖼️'}
                                    {attachment.file_type === 'document' && '📝'}
                                    {attachment.file_type === 'other' && '📎'}
                                </span>
                                <div>
                                    <p className="font-medium">{attachment.filename}</p>
                                    {attachment.description && (
                                        <p className="text-sm text-gray-600">{attachment.description}</p>
                                    )}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
