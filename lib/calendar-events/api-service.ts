import { DateTime } from 'luxon';

import { ApiService } from '@/lib/api-service';
import { CalendarEvent } from '@/lib/calendar-events/models/calendar-event';
import { TimeUnit } from '@/lib/calendar-events/service';
import { AsyncResult, Result } from '@/lib/result';
import { deserialize, serialize } from '@/lib/utils/serialization';

export type CalendarEventsRequest = {
    viewType: TimeUnit;
    baseDate: string; // ISO string
};

export type ApiError = {
    message: string;
    status: number;
    endpoint: string;
};

export class CalendarEventsApiService extends ApiService {
    private static _instance: CalendarEventsApiService;

    private constructor() {
        super();
    }

    public static get instance(): CalendarEventsApiService {
        CalendarEventsApiService._instance ??= new CalendarEventsApiService();
        return CalendarEventsApiService._instance;
    }

    public async getCalendarEventsByView(
        viewType: TimeUnit,
        baseDate: DateTime,
    ): AsyncResult<CalendarEvent[], ApiError> {
        const response = await this.POST<CalendarEvent[]>(
            '/api/calendar-events',
            JSON.stringify({ viewType, baseDate }),
        );

        if (response.isFailure) return response;
        return Result.success(response.value.map((c) => deserialize(c, CalendarEvent)));
    }

    public async createCalendarEvent(event: CalendarEvent): AsyncResult<CalendarEvent, ApiError> {
        const response = await this.PUT<CalendarEvent>('/api/calendar-events', JSON.stringify(serialize(event)));

        if (response.isFailure) return response;
        return Result.success(deserialize(response.value, CalendarEvent));
    }

    public async updateCalendarEvent(event: CalendarEvent): AsyncResult<CalendarEvent, ApiError> {
        const response = await this.PATCH<CalendarEvent>(
            `/api/calendar-events/${event.id}`,
            JSON.stringify(serialize(event)),
        );

        if (response.isFailure) return response;
        return Result.success(deserialize(response.value, CalendarEvent));
    }

    public async deleteCalendarEvent(eventId: string): AsyncResult<void, ApiError> {
        return this.DELETE<void>(`/api/calendar-events/${eventId}`);
    }
}
