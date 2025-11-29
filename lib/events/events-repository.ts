import matter from 'gray-matter';
import { DateObjectUnits, DateTime } from 'luxon';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { Options, RRule, Weekday } from 'rrule';

import { MDXComponents } from '@/components/mdx-components';
import { FileReader } from '@/lib/files/file-reader';
import { AsyncResult, Result } from '@/lib/result';

export interface EventContact {
    name: string;
    email?: string;
    phone?: string;
}

export interface EventAttachment {
    filename: string;
    file_url?: string;
    file_type?: 'image' | 'pdf' | 'document' | 'other';
    description?: string;
    display_order?: number;
}

export interface RecurrenceRule {
    label: string;
    frequency: 'YEARLY' | 'MONTHLY' | 'WEEKLY' | 'DAILY' | 'HOURLY' | 'MINUTELY' | 'SECONDLY';
    interval?: number;
    count?: number;
    until?: string;
    by_day?: string[];
    by_month_day?: number[];
    by_year_day?: number[];
    by_week_number?: number[];
    by_month?: number[];
    by_set_position?: number[];
    by_hour?: number[];
    by_minute?: number[];
    by_second?: number[];
    week_start?: 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';
}

export interface EventMetadata {
    id: string;
    title: string;
    description?: string;
    location?: string;
    start_datetime?: DateObjectUnits;
    end_datetime?: DateObjectUnits;
    start_date_tbd?: boolean;
    end_date_tbd?: boolean;
    start_time_tbd?: boolean;
    end_time_tbd?: boolean;
    all_day?: boolean;
    timezone?: string;
    event_type?: 'meeting' | 'doins' | 'picnic' | 'ceremony' | 'social' | 'fundraiser' | 'historical' | 'other';
    is_members_only?: boolean;
    is_published?: boolean;
    parent_event_id?: string;
    recurrence?: RecurrenceRule;
    exceptions?: { date: string; reason?: string }[];
    additions?: { date: string; reason?: string }[];
    contacts?: EventContact[];
    attachments?: EventAttachment[];
    meta?: Record<string, unknown>;
}

export interface Event {
    id: string;
    metadata: EventMetadata;
    content: string;
    mdxContent?: React.ReactElement;
    slug: string;
    occurrence_date?: DateObjectUnits;
    is_exception_addition?: boolean;
}

export interface EventQueryOptions {
    published_only?: boolean;
    include_mdx?: boolean;
    event_type?: EventMetadata['event_type'];
    slug?: string;
    title_contains?: string;
    start_date?: DateTime;
    end_date?: DateTime;
    members_only?: boolean;
    limit?: number;
    offset?: number;
}

const EVENTS_DIR = path.join(process.cwd(), '/content/events');

export class EventsRepository extends FileReader {
    private _allEventsCache: Event[] | null = null;
    private _cacheTimestamp: number = 0;
    private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

    public async getUpcomingEvents(limit: number = 10): AsyncResult<Event[]> {
        const start_date = DateTime.now();
        const end_date = start_date.plus({ year: 1 });

        return this.queryEvents({ start_date, end_date, limit, published_only: true });
    }

    public async getAllEvents(includeMdx: boolean = false): AsyncResult<Event[]> {
        // Simple cache to avoid re-parsing files constantly
        const now = Date.now();
        if (this._allEventsCache && now - this._cacheTimestamp < this.CACHE_TTL) {
            let events = [...this._allEventsCache];
            if (includeMdx) {
                // If MDX is requested but not cached, compile it for each event
                events = await Promise.all(
                    this._allEventsCache.map(async (event) => {
                        if (!event.mdxContent) {
                            const mdxResult = await this.getCompiledMDX(event.content);
                            if (mdxResult.isSuccess) {
                                return { ...event, mdxContent: mdxResult.value.content };
                            }
                        }
                        return event;
                    }),
                );
            }

            return Result.success(events);
        }

        const eventFiles = await this.getAllFiles();
        if (Result.isFailure(eventFiles)) return eventFiles;

        const events = [];
        for (const f of eventFiles.value) {
            const parsed = await this.parseEventFile(f, includeMdx);
            if (parsed.isFailure) return parsed;
            events.push(parsed.value);
        }

        // Cache the results (without MDX to keep cache lean)
        this._allEventsCache = events.map((e) => ({ ...e, mdxContent: undefined }));
        this._cacheTimestamp = now;

        return Result.success(events);
    }

    public async getEventBySlug(slug: string, includeMdx: boolean = true): AsyncResult<Event | null> {
        const result = await this.queryEvents({ slug, include_mdx: includeMdx });
        if (result.isFailure) return result;

        return Result.success(result.value.length > 0 ? result.value[0] : null);
    }

    /**
     * Main query method that supports various filtering options
     */
    public async queryEvents(options: EventQueryOptions = {}): AsyncResult<Event[]> {
        const events = await this.getAllEvents(options.include_mdx ?? false);
        if (events.isFailure) return events;

        let filteredEvents: Event[] = [];

        // First, expand recurring events if date range is specified
        if (options.start_date && options.end_date) {
            for (const event of events.value) {
                // Filter by published status before expansion
                if (options.published_only && !event.metadata.is_published) continue;

                filteredEvents.push(...this.expandRecurringEvent(event, options.start_date, options.end_date));
            }
        } else {
            // No date range, just use base events
            filteredEvents = events.value.map((event) => ({
                ...event,
                occurrence_date: event.metadata.start_datetime,
            }));
        }

        // Apply filters
        filteredEvents = filteredEvents.filter((event) => {
            // Published filter
            if (options.published_only && !event.metadata.is_published) return false;

            // Event type filter
            if (options.event_type && event.metadata.event_type !== options.event_type) return false;

            // Slug filter (exact match)
            if (options.slug && event.slug !== options.slug) return false;

            // Title contains filter (case insensitive)
            if (
                options.title_contains &&
                !event.metadata.title.toLowerCase().includes(options.title_contains.toLowerCase())
            ) {
                return false;
            }

            // Members only filter
            if (options.members_only !== undefined && event.metadata.is_members_only !== options.members_only) {
                return false;
            }

            return true;
        });

        // Sort by occurrence date
        filteredEvents.sort(eventSort);

        // Apply pagination
        if (options.offset) {
            filteredEvents = filteredEvents.slice(options.offset);
        }
        if (options.limit) {
            filteredEvents = filteredEvents.slice(0, options.limit);
        }

        return Result.success(filteredEvents);
    }

    /**
     * Get events for a specific date (including recurring occurrences)
     */
    public async getEventsForDate(
        date: DateTime,
        options: Omit<EventQueryOptions, 'start_date' | 'end_date'> = {},
    ): AsyncResult<Event[]> {
        const startOfDay = date.startOf('day');
        const endOfDay = date.endOf('day');

        return this.queryEvents({
            ...options,
            start_date: startOfDay,
            end_date: endOfDay,
        });
    }

    /**
     * Get events for a specific month
     */
    public async getEventsForMonth(
        year: number,
        month: number,
        options: Omit<EventQueryOptions, 'start_date' | 'end_date'> = {},
    ): AsyncResult<Event[]> {
        const startDate = DateTime.local(year, month, 1);
        const endDate = startDate.endOf('month');

        return this.queryEvents({
            ...options,
            start_date: startDate,
            end_date: endDate,
        });
    }

    /**
     * Search events by title, description, or content
     */
    public async searchEvents(searchTerm: string, options: EventQueryOptions = {}): AsyncResult<Event[]> {
        const events = await this.getAllEvents(false); // Don't need MDX for search
        if (events.isFailure) return events;

        const searchLower = searchTerm.toLowerCase();
        const matchingEvents = events.value.filter((event) => {
            return (
                event.metadata.title.toLowerCase().includes(searchLower) ||
                event.metadata.description?.toLowerCase().includes(searchLower) ||
                event.content.toLowerCase().includes(searchLower)
            );
        });

        // If date range specified, expand recurring events
        let filteredEvents: Event[] = [];
        if (options.start_date && options.end_date) {
            for (const event of matchingEvents) {
                filteredEvents.push(...this.expandRecurringEvent(event, options.start_date, options.end_date));
            }
        } else {
            filteredEvents = matchingEvents.map((event) => ({
                ...event,
                occurrence_date: event.metadata.start_datetime,
            }));
        }

        // Apply other filters through queryEvents logic
        return this.queryEvents({
            ...options,
            // Override with our pre-filtered events by using a custom approach
        }).then((result) => {
            if (result.isFailure) return result;

            // Filter the result to only include our matching events
            const finalEvents = result.value.filter((event) =>
                matchingEvents.some((match) => match.slug === event.slug),
            );

            return Result.success(finalEvents);
        });
    }

    /**
     * Clear the internal cache (useful for development or when files change)
     */
    public clearCache(): void {
        this._allEventsCache = null;
        this._cacheTimestamp = 0;
    }

    private async getCompiledMDX(content: string) {
        try {
            const mdxOutput = await compileMDX({
                source: content,
                options: {
                    parseFrontmatter: false, // We already parsed it with gray-matter
                    mdxOptions: {
                        remarkPlugins: [remarkGfm],
                        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
                    },
                },
                components: MDXComponents,
            });
            return Result.success(mdxOutput);
        } catch (err) {
            const message = typeof err == 'object' && err != null && 'message' in err ? err.message : 'unknown error';
            return Result.failure(message);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private parseMetadata(data: Record<string, any>): Result<EventMetadata> {
        return Result.success({
            ...data,
            start_datetime: data.start_datetime
                ? DateTime.fromFormat(data.start_datetime, "yyyy-MM-dd'T'HH:mm:ss", {
                      zone: data.timezone,
                  }).toObject()
                : undefined,
            end_datetime: data.end_datetime
                ? DateTime.fromFormat(data.end_datetime, "yyyy-MM-dd'T'HH:mm:ss", {
                      zone: data.timezone,
                  }).toObject()
                : undefined,
        } as EventMetadata);
    }

    private async parseEventFile(filePath: string, includeMdx: boolean = true): AsyncResult<Event> {
        const slug = path.basename(filePath, path.extname(filePath));
        const raw = await this.readFile(filePath);
        if (raw.isFailure) return raw;

        try {
            const { data, content } = matter(raw.value, {});

            const metadata = this.parseMetadata(data);
            if (metadata.isFailure) return metadata;

            let mdxContent = undefined;
            if (includeMdx) {
                const mdxResult = await this.getCompiledMDX(content);
                if (mdxResult.isSuccess) {
                    mdxContent = mdxResult.value.content;
                }
            }

            return Result.success({
                id: this.calculateEventId(slug, DateTime.fromObject(metadata.value.start_datetime ?? {}).toISO() ?? ''),
                content,
                mdxContent,
                metadata: metadata.value,
                slug,
            } as Event);
        } catch (err) {
            const message = typeof err == 'object' && err != null && 'message' in err ? err.message : 'unknown error';
            return Result.failure(`Failed to read file '${filePath}': ${message}`);
        }
    }

    private createRRule(event: Event): RRule | null {
        if (!event.metadata.recurrence || !event.metadata.start_datetime) {
            return null;
        }

        const rec = event.metadata.recurrence;
        const dtstart = DateTime.fromObject(event.metadata.start_datetime).toJSDate();

        const options: Partial<Options> = {
            freq: RRule[rec.frequency],
            dtstart,
            interval: rec.interval || 1,
        };

        if (rec.count) options.count = rec.count;
        if (rec.until) options.until = new Date(rec.until);
        if (rec.by_day) {
            options.byweekday = rec.by_day.map((day) => {
                const dayMap: Record<string, Weekday> = {
                    MO: RRule.MO,
                    TU: RRule.TU,
                    WE: RRule.WE,
                    TH: RRule.TH,
                    FR: RRule.FR,
                    SA: RRule.SA,
                    SU: RRule.SU,
                };
                // Handle nth day like "2TU" or "-1FR"
                const match = day.match(/^(-?\d+)?([A-Z]{2})$/);
                if (match) {
                    const [, nth, dayCode] = match;
                    const weekday = dayMap[dayCode];
                    return nth ? weekday.nth(parseInt(nth)) : weekday;
                }
                return dayMap[day];
            });
        }
        if (rec.by_month_day) options.bymonthday = rec.by_month_day;
        if (rec.by_year_day) options.byyearday = rec.by_year_day;
        if (rec.by_week_number) options.byweekno = rec.by_week_number;
        if (rec.by_month) options.bymonth = rec.by_month;
        if (rec.by_set_position) options.bysetpos = rec.by_set_position;
        if (rec.by_hour) options.byhour = rec.by_hour;
        if (rec.by_minute) options.byminute = rec.by_minute;
        if (rec.by_second) options.bysecond = rec.by_second;

        return new RRule(options);
    }

    private expandRecurringEvent(event: Event, startDate: DateTime, endDate: DateTime): Event[] {
        const occurrences: Event[] = [];

        // Handle non-recurring events
        if (!event.metadata.recurrence) {
            if (event.metadata.start_datetime) {
                const eventDate = DateTime.fromObject(event.metadata.start_datetime);
                if (eventDate >= startDate && eventDate <= endDate) {
                    occurrences.push({
                        ...event,
                        occurrence_date: event.metadata.start_datetime,
                    });
                }
            }
            return occurrences;
        }

        // Create RRule
        const rrule = this.createRRule(event);
        if (!rrule) return occurrences;

        // Get all occurrences in range
        const dates = rrule.between(startDate.toJSDate(), endDate.toJSDate(), true);

        // Create exception set
        const exceptionDates = new Set(
            (event.metadata.exceptions || []).map((ex) => new Date(ex.date).toISOString().split('T')[0]),
        );

        // Add regular occurrences (minus exceptions)
        for (const date of dates) {
            const dateStr = date.toISOString().split('T')[0];
            if (!exceptionDates.has(dateStr)) {
                occurrences.push({
                    ...event,
                    occurrence_date: DateTime.fromJSDate(date, { zone: event.metadata.timezone }).toObject(),
                });
            }
        }

        // Add additional occurrences
        if (event.metadata.additions) {
            for (const addition of event.metadata.additions) {
                const addDate = DateTime.fromISO(addition.date);
                if (addDate >= startDate && addDate <= endDate) {
                    occurrences.push({ ...event, occurrence_date: addDate.toObject(), is_exception_addition: true });
                }
            }
        }

        return occurrences.sort(eventSort);
    }

    // Kept for backward compatibility
    private async getEventsInRange(
        startDate: DateTime,
        endDate: DateTime,
        options: { published_only?: boolean } = {},
    ): AsyncResult<Event[]> {
        return this.queryEvents({
            start_date: startDate,
            end_date: endDate,
            published_only: options.published_only,
        });
    }

    private calculateEventId(slug: string, date: string) {
        const input = `${slug}:${date}`;

        let hash = 5381;
        for (let i = 0; i < input.length; i++) {
            hash = (hash * 33) ^ input.charCodeAt(i);
        }

        // Convert to unsigned 32bit integer, then to base36 for shortness
        return (hash >>> 0).toString(36);
    }
}

export const eventsRepository = new EventsRepository(EVENTS_DIR, {
    extensions: ['.md', '.mdx'],
    ignoreDirs: [EVENTS_DIR + '/templates'],
});

const eventSort = (a: Event, b: Event) =>
    DateTime.fromObject(a.occurrence_date ?? {}).toMillis() - DateTime.fromObject(b.occurrence_date ?? {}).toMillis();
