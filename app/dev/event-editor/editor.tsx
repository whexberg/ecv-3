'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface RecurrenceRule {
    label: string;
    frequency: 'YEARLY' | 'MONTHLY' | 'WEEKLY' | 'DAILY' | 'HOURLY' | 'MINUTELY' | 'SECONDLY';
    interval?: number;
    count?: number;
    until?: string;
    by_day?: string[];
    by_month_day?: number[];
    by_month?: number[];
    by_year_day?: number[];
    by_week_number?: number[];
    by_set_position?: number[];
    by_hour?: number[];
    by_minute?: number[];
    by_second?: number[];
    week_start?: 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';
}

interface Contact {
    name: string;
    email?: string;
    phone?: string;
}

interface Attachment {
    filename: string;
    file_url?: string;
    file_type?: 'image' | 'pdf' | 'document' | 'other';
    description?: string;
    display_order?: number;
}

interface Exception {
    date: string;
    reason?: string;
}

interface Addition {
    date: string;
    reason?: string;
}

interface EventData {
    // Required
    id: string;
    title: string;

    // Optional basic info
    slug?: string;
    description?: string;
    location?: string;

    // Date & time
    start_datetime?: string;
    end_datetime?: string;
    timezone?: string;
    start_date_tbd?: boolean;
    end_date_tbd?: boolean;
    start_time_tbd?: boolean;
    end_time_tbd?: boolean;
    all_day?: boolean;

    // Classification
    event_type?: 'meeting' | 'doins' | 'picnic' | 'ceremony' | 'social' | 'fundraiser' | 'historical' | 'other';
    is_members_only?: boolean;
    is_published?: boolean;

    // Hierarchy
    parent_event_id?: string;

    // Recurrence
    recurrence?: RecurrenceRule;

    // Arrays
    exceptions?: Exception[];
    additions?: Addition[];
    contacts?: Contact[];
    attachments?: Attachment[];

    // Custom metadata
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meta?: { [key: string]: any };

    // Content
    content?: string;
}

const EventEditor: React.FC = () => {
    const [eventData, setEventData] = useState<EventData>({
        id: uuidv4(),
        title: '',
        timezone: 'America/Los_Angeles',
        is_published: true,
        all_day: false,
        event_type: 'meeting',
        is_members_only: false,
    });

    const [showRecurrence, setShowRecurrence] = useState(false);
    const [, setShowAdvanced] = useState(false);
    const [importText, setImportText] = useState('');
    const [showImport, setShowImport] = useState(false);
    const [importError, setImportError] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateField = (field: keyof EventData, value: any) => {
        setEventData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateRecurrence = (field: keyof RecurrenceRule, value: any) => {
        setEventData((prev) => ({
            ...prev,
            recurrence: {
                ...prev.recurrence,
                [field]: value,
            } as RecurrenceRule,
        }));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parseYAML = (yamlString: string): any => {
        try {
            const lines = yamlString.split('\n');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result: any = {};
            // const currentIndent = 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let currentObject: any = result;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const objectStack: any[] = [result];
            const indentStack: number[] = [0];

            for (const line of lines) {
                const trimmedLine = line.trim();

                // Skip empty lines and comments
                if (!trimmedLine || trimmedLine.startsWith('#')) continue;

                // Calculate indentation
                const indent = line.length - line.trimStart().length;

                // Handle array items
                if (trimmedLine.startsWith('- ')) {
                    const value = trimmedLine.substring(2).trim();
                    if (!Array.isArray(currentObject)) {
                        currentObject = [];
                        objectStack[objectStack.length - 1] = currentObject;
                    }
                    currentObject.push(value);
                    continue;
                }

                // Handle key-value pairs
                const colonIndex = trimmedLine.indexOf(':');
                if (colonIndex === -1) continue;

                const key = trimmedLine.substring(0, colonIndex).trim();
                const valueString = trimmedLine.substring(colonIndex + 1).trim();

                // Adjust object stack based on indentation
                while (indent <= indentStack[indentStack.length - 1] && indentStack.length > 1) {
                    indentStack.pop();
                    objectStack.pop();
                }
                currentObject = objectStack[objectStack.length - 1];

                if (valueString === '' || valueString === '|' || valueString === '>') {
                    // Start of nested object or multiline string
                    const nestedObject = {};
                    currentObject[key] = nestedObject;
                    objectStack.push(nestedObject);
                    indentStack.push(indent);
                    currentObject = nestedObject;
                } else if (valueString.startsWith('[') && valueString.endsWith(']')) {
                    // Array value
                    const arrayContent = valueString.slice(1, -1);
                    currentObject[key] = arrayContent.split(',').map((s) => s.trim());
                } else {
                    // Simple value
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    let value: any = valueString;

                    // Parse boolean values
                    if (value === 'true') value = true;
                    else if (value === 'false') value = false;
                    // Parse numbers
                    else if (!isNaN(Number(value)) && value !== '') value = Number(value);

                    currentObject[key] = value;
                }
            }

            return result;
        } catch (error) {
            throw new Error(`YAML parsing error: ${error}`);
        }
    };

    const importFromMarkdown = () => {
        try {
            setImportError('');

            if (!importText.trim()) {
                setImportError('Please paste markdown content to import');
                return;
            }

            // Split frontmatter and content
            const parts = importText.split('---');
            if (parts.length < 3) {
                setImportError('Invalid markdown format. Expected frontmatter between --- markers');
                return;
            }

            const frontmatterString = parts[1];
            const contentString = parts.slice(2).join('---').trim();

            // Parse YAML frontmatter
            const frontmatter = parseYAML(frontmatterString);

            // Create new event data
            const newEventData: EventData = {
                id: frontmatter.id || uuidv4(),
                title: frontmatter.title || '',
                slug: frontmatter.slug,
                description: frontmatter.description,
                location: frontmatter.location,
                start_datetime: frontmatter.start_datetime,
                end_datetime: frontmatter.end_datetime,
                timezone: frontmatter.timezone || 'America/Los_Angeles',
                all_day: frontmatter.all_day || false,
                start_date_tbd: frontmatter.start_date_tbd || false,
                end_date_tbd: frontmatter.end_date_tbd || false,
                start_time_tbd: frontmatter.start_time_tbd || false,
                end_time_tbd: frontmatter.end_time_tbd || false,
                event_type: frontmatter.event_type || 'meeting',
                is_members_only: frontmatter.is_members_only || false,
                is_published: frontmatter.is_published !== undefined ? frontmatter.is_published : true,
                parent_event_id: frontmatter.parent_event_id,
                recurrence: frontmatter.recurrence,
                exceptions: frontmatter.exceptions,
                additions: frontmatter.additions,
                contacts: frontmatter.contacts,
                attachments: frontmatter.attachments,
                meta: frontmatter.meta,
                content: contentString,
            };

            setEventData(newEventData);

            // Update UI state based on imported data
            if (newEventData.recurrence) {
                setShowRecurrence(true);
            }

            setShowImport(false);
            setImportText('');
        } catch (error) {
            setImportError(`Import failed: ${error}`);
        }
    };

    const _addContact = () => {
        const newContact: Contact = { name: '' };
        setEventData((prev) => ({
            ...prev,
            contacts: [...(prev.contacts || []), newContact],
        }));
    };

    const _updateContact = (index: number, field: keyof Contact, value: string) => {
        setEventData((prev) => ({
            ...prev,
            contacts: prev.contacts?.map((contact, i) => (i === index ? { ...contact, [field]: value } : contact)),
        }));
    };

    const _removeContact = (index: number) => {
        setEventData((prev) => ({
            ...prev,
            contacts: prev.contacts?.filter((_, i) => i !== index),
        }));
    };

    const _addException = () => {
        const newException: Exception = { date: '' };
        setEventData((prev) => ({
            ...prev,
            exceptions: [...(prev.exceptions || []), newException],
        }));
    };

    const _updateException = (index: number, field: keyof Exception, value: string) => {
        setEventData((prev) => ({
            ...prev,
            exceptions: prev.exceptions?.map((exception, i) =>
                i === index ? { ...exception, [field]: value } : exception,
            ),
        }));
    };

    const _removeException = (index: number) => {
        setEventData((prev) => ({
            ...prev,
            exceptions: prev.exceptions?.filter((_, i) => i !== index),
        }));
    };

    const generateYAML = () => {
        const yamlLines = ['---'];

        // Required fields
        yamlLines.push(`id: ${eventData.id}`);
        yamlLines.push(`title: ${eventData.title}`);

        // Optional basic info
        if (eventData.slug) yamlLines.push(`slug: ${eventData.slug}`);
        if (eventData.description) yamlLines.push(`description: ${eventData.description}`);
        if (eventData.location) yamlLines.push(`location: ${eventData.location}`);

        yamlLines.push('');

        // Date & time
        if (eventData.start_datetime) yamlLines.push(`start_datetime: ${eventData.start_datetime}`);
        if (eventData.end_datetime) yamlLines.push(`end_datetime: ${eventData.end_datetime}`);
        if (eventData.timezone) yamlLines.push(`timezone: ${eventData.timezone}`);
        if (eventData.all_day) yamlLines.push(`all_day: ${eventData.all_day}`);

        yamlLines.push('');

        // Classification
        if (eventData.event_type) yamlLines.push(`event_type: ${eventData.event_type}`);
        yamlLines.push(`is_members_only: ${eventData.is_members_only}`);
        yamlLines.push(`is_published: ${eventData.is_published}`);

        // Recurrence
        if (eventData.recurrence && showRecurrence) {
            yamlLines.push('');
            yamlLines.push('recurrence:');
            yamlLines.push(`    label: ${eventData.recurrence.label}`);
            yamlLines.push(`    frequency: ${eventData.recurrence.frequency}`);
            if (eventData.recurrence.interval) yamlLines.push(`    interval: ${eventData.recurrence.interval}`);
            if (eventData.recurrence.by_day && eventData.recurrence.by_day.length > 0) {
                yamlLines.push(`    by_day: [${eventData.recurrence.by_day.join(', ')}]`);
            }
            if (eventData.recurrence.by_set_position && eventData.recurrence.by_set_position.length > 0) {
                yamlLines.push(`    by_set_position: [${eventData.recurrence.by_set_position.join(', ')}]`);
            }
            if (eventData.recurrence.until) yamlLines.push(`    until: ${eventData.recurrence.until}`);
            if (eventData.recurrence.week_start) yamlLines.push(`    week_start: ${eventData.recurrence.week_start}`);
        }

        yamlLines.push('---');
        yamlLines.push('');
        yamlLines.push(eventData.content || 'Add your event content here...');

        return yamlLines.join('\n');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateYAML());
    };

    const clearForm = () => {
        setEventData({
            id: uuidv4(),
            title: '',
            timezone: 'America/Los_Angeles',
            is_published: true,
            all_day: false,
            event_type: 'meeting',
            is_members_only: false,
        });
        setShowRecurrence(false);
        setShowAdvanced(false);
    };

    return (
        <div className="mx-auto max-w-7xl rounded-lg p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-on-page text-3xl font-bold">Event Editor</h1>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setShowImport(!showImport)}
                        className="cursor-pointer rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                    >
                        Import
                    </button>
                    <button
                        type="button"
                        onClick={clearForm}
                        className="cursor-pointer rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                    >
                        Clear
                    </button>
                </div>
            </div>

            {/* Import Section */}
            {showImport && (
                <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
                    <h2 className="mb-3 text-lg font-semibold text-green-800">Import from Markdown</h2>
                    <div className="space-y-3">
                        <textarea
                            value={importText}
                            onChange={(e) => setImportText(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                            rows={10}
                            placeholder="Paste your existing event markdown here (including frontmatter)..."
                        />
                        {importError && <div className="rounded bg-red-50 p-2 text-sm text-red-600">{importError}</div>}
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={importFromMarkdown}
                                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                            >
                                Import & Parse
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowImport(false);
                                    setImportText('');
                                    setImportError('');
                                }}
                                className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Left Column - Form */}
                <div className="space-y-6">
                    {/* Required Fields */}
                    <div className="rounded-lg bg-red-50 p-4">
                        <h2 className="mb-3 text-lg font-semibold text-red-800">Required Fields</h2>

                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">Event ID</label>
                            <input
                                type="text"
                                value={eventData.id}
                                onChange={(e) => updateField('id', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => updateField('id', uuidv4())}
                                className="mt-1 text-sm text-blue-600 hover:text-blue-800"
                            >
                                Generate New UUID
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">Title *</label>
                            <input
                                type="text"
                                value={eventData.title}
                                onChange={(e) => updateField('title', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="rounded-lg bg-blue-50 p-4">
                        <h2 className="mb-3 text-lg font-semibold text-blue-800">Basic Information</h2>

                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">Slug</label>
                            <input
                                type="text"
                                value={eventData.slug || ''}
                                onChange={(e) => updateField('slug', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="event-url-slug"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={eventData.description || ''}
                                onChange={(e) => updateField('description', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                rows={3}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                value={eventData.location || ''}
                                onChange={(e) => updateField('location', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Full address or venue name"
                            />
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="rounded-lg bg-green-50 p-4">
                        <h2 className="mb-3 text-lg font-semibold text-green-800">Date & Time</h2>

                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Start Date & Time
                                </label>
                                <input
                                    type="datetime-local"
                                    value={eventData.start_datetime || ''}
                                    onChange={(e) => updateField('start_datetime', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">End Date & Time</label>
                                <input
                                    type="datetime-local"
                                    value={eventData.end_datetime || ''}
                                    onChange={(e) => updateField('end_datetime', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">Timezone</label>
                            <select
                                value={eventData.timezone || 'America/Los_Angeles'}
                                onChange={(e) => updateField('timezone', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            >
                                <option value="America/Los_Angeles">America/Los_Angeles</option>
                                <option value="America/New_York">America/New_York</option>
                                <option value="America/Chicago">America/Chicago</option>
                                <option value="America/Denver">America/Denver</option>
                                <option value="UTC">UTC</option>
                            </select>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="all_day"
                                checked={eventData.all_day || false}
                                onChange={(e) => updateField('all_day', e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="all_day" className="text-sm text-gray-700">
                                All-day event
                            </label>
                        </div>
                    </div>

                    {/* Event Classification */}
                    <div className="rounded-lg bg-purple-50 p-4">
                        <h2 className="mb-3 text-lg font-semibold text-purple-800">Event Classification</h2>

                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">Event Type</label>
                            <select
                                value={eventData.event_type || 'meeting'}
                                onChange={(e) => updateField('event_type', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            >
                                <option value="meeting">Meeting</option>
                                <option value="doins">Doins</option>
                                <option value="picnic">Picnic</option>
                                <option value="ceremony">Ceremony</option>
                                <option value="social">Social</option>
                                <option value="fundraiser">Fundraiser</option>
                                <option value="historical">Historical</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="mb-2 flex items-center">
                            <input
                                type="checkbox"
                                id="is_members_only"
                                checked={eventData.is_members_only || false}
                                onChange={(e) => updateField('is_members_only', e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="is_members_only" className="text-sm text-gray-700">
                                Members only
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_published"
                                checked={eventData.is_published || false}
                                onChange={(e) => updateField('is_published', e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="is_published" className="text-sm text-gray-700">
                                Published
                            </label>
                        </div>
                    </div>

                    {/* Recurrence */}
                    <div className="rounded-lg bg-orange-50 p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-orange-800">Recurrence</h2>
                            <button
                                type="button"
                                onClick={() => setShowRecurrence(!showRecurrence)}
                                className="rounded bg-orange-200 px-3 py-1 text-sm text-orange-800 hover:bg-orange-300"
                            >
                                {showRecurrence ? 'Hide' : 'Add Recurrence'}
                            </button>
                        </div>

                        {showRecurrence && (
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Label (human-readable description)
                                    </label>
                                    <input
                                        type="text"
                                        value={eventData.recurrence?.label || ''}
                                        onChange={(e) => updateRecurrence('label', e.target.value)}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                        placeholder="e.g., Every Monday evening"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Frequency
                                        </label>
                                        <select
                                            value={eventData.recurrence?.frequency || 'WEEKLY'}
                                            onChange={(e) => updateRecurrence('frequency', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                        >
                                            <option value="YEARLY">Yearly</option>
                                            <option value="MONTHLY">Monthly</option>
                                            <option value="WEEKLY">Weekly</option>
                                            <option value="DAILY">Daily</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Interval</label>
                                        <input
                                            type="number"
                                            value={eventData.recurrence?.interval || 1}
                                            onChange={(e) => updateRecurrence('interval', parseInt(e.target.value))}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                            min={1}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Days of Week (for weekly/monthly)
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((day) => (
                                            <label key={day} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={eventData.recurrence?.by_day?.includes(day) || false}
                                                    onChange={(e) => {
                                                        const currentDays = eventData.recurrence?.by_day || [];
                                                        const newDays = e.target.checked
                                                            ? [...currentDays, day]
                                                            : currentDays.filter((d) => d !== day);
                                                        updateRecurrence('by_day', newDays);
                                                    }}
                                                    className="mr-1"
                                                />
                                                <span className="text-sm">{day}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Position in Month (e.g., 3 for 3rd occurrence, -1 for last)
                                    </label>
                                    <input
                                        type="text"
                                        value={eventData.recurrence?.by_set_position?.join(', ') || ''}
                                        onChange={(e) => {
                                            const positions = e.target.value
                                                .split(',')
                                                .map((s) => parseInt(s.trim()))
                                                .filter((n) => !isNaN(n));
                                            updateRecurrence(
                                                'by_set_position',
                                                positions.length > 0 ? positions : undefined,
                                            );
                                        }}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                        placeholder="e.g., 1, 3 or -1"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Until Date (optional)
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={eventData.recurrence?.until || ''}
                                        onChange={(e) => updateRecurrence('until', e.target.value)}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="rounded-lg bg-gray-50 p-4">
                        <h2 className="mb-3 text-lg font-semibold text-gray-800">Event Content</h2>
                        <textarea
                            value={eventData.content || ''}
                            onChange={(e) => updateField('content', e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                            rows={8}
                            placeholder="Write your event description using Markdown..."
                        />
                    </div>
                </div>

                {/* Right Column - Preview */}
                <div className="space-y-4">
                    <div className="rounded-lg bg-gray-100 p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">Generated YAML</h2>
                            <button
                                type="button"
                                onClick={copyToClipboard}
                                className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                            >
                                Copy to Clipboard
                            </button>
                        </div>
                        <pre className="max-h-96 overflow-x-auto rounded border bg-white p-4 text-xs">
                            {generateYAML()}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventEditor;
