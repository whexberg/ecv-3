import { DateTime } from 'luxon';

import { Deserialized, Serializable, Serialized } from '@/src/lib/models/map-types';

export type RecurrenceFrequency = 'SECONDLY' | 'MINUTELY' | 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export type WeekDay = 'SU' | 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA';

export interface IRecurrenceRule {
    id: Serializable<string, 'id', string>;
    label: Serializable<string>;
    frequency: Serializable<RecurrenceFrequency>;
    interval: Serializable<number>;
    count: Serializable<number | null>;
    until: Serializable<DateTime | null, 'until', string | null>;

    bySecond: Serializable<number[] | null, 'by_second'>;
    byMinute: Serializable<number[] | null, 'by_minute'>;
    byHour: Serializable<number[] | null, 'by_hour'>;
    byDay: Serializable<string[] | null, 'by_day'>;
    byMonthDay: Serializable<number[] | null, 'by_month_day'>;
    byYearDay: Serializable<number[] | null, 'by_year_day'>;
    byWeekNumber: Serializable<number[] | null, 'by_week_number'>;
    byMonth: Serializable<number[] | null, 'by_month'>;
    bySetPosition: Serializable<number[] | null, 'by_set_position'>;
    weekStart: Serializable<WeekDay, 'week_start'>;

    createdAt: Serializable<DateTime, 'created_at', string>;
    updatedAt: Serializable<DateTime, 'updated_at', string>;
}

export class RecurrenceRule implements Deserialized<IRecurrenceRule> {
    id: string;
    label: string;
    frequency: RecurrenceFrequency;
    interval: number;
    count: number | null;
    until: DateTime | null;

    bySecond: number[] | null;
    byMinute: number[] | null;
    byHour: number[] | null;
    byDay: string[] | null;
    byMonthDay: number[] | null;
    byYearDay: number[] | null;
    byWeekNumber: number[] | null;
    byMonth: number[] | null;
    bySetPosition: number[] | null;
    weekStart: WeekDay;

    createdAt: DateTime;
    updatedAt: DateTime;

    constructor(props: Deserialized<IRecurrenceRule>) {
        this.id = props.id;
        this.label = props.label;
        this.frequency = props.frequency;
        this.interval = props.interval;
        this.count = props.count;
        this.until = props.until;
        this.bySecond = props.bySecond;
        this.byMinute = props.byMinute;
        this.byHour = props.byHour;
        this.byDay = props.byDay;
        this.byMonthDay = props.byMonthDay;
        this.byYearDay = props.byYearDay;
        this.byWeekNumber = props.byWeekNumber;
        this.byMonth = props.byMonth;
        this.bySetPosition = props.bySetPosition;
        this.weekStart = props.weekStart;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    public clone = (data?: Partial<Deserialized<IRecurrenceRule>>): RecurrenceRule => {
        const values = {
            id: this.id,
            label: this.label,
            frequency: this.frequency,
            interval: this.interval,
            count: this.count,
            until: this.until ? DateTime.fromObject(this.until.toObject()) : null,
            bySecond: this.bySecond ? [...this.bySecond] : null,
            byMinute: this.byMinute ? [...this.byMinute] : null,
            byHour: this.byHour ? [...this.byHour] : null,
            byDay: this.byDay ? [...this.byDay] : null,
            byMonthDay: this.byMonthDay ? [...this.byMonthDay] : null,
            byYearDay: this.byYearDay ? [...this.byYearDay] : null,
            byWeekNumber: this.byWeekNumber ? [...this.byWeekNumber] : null,
            byMonth: this.byMonth ? [...this.byMonth] : null,
            bySetPosition: this.bySetPosition ? [...this.bySetPosition] : null,
            weekStart: this.weekStart,
            createdAt: DateTime.fromObject(this.createdAt.toObject()),
            updatedAt: DateTime.fromObject(this.updatedAt.toObject()),
            ...data,
        } satisfies Deserialized<IRecurrenceRule>;

        return new RecurrenceRule(values);
    };

    public static deserialize = (row: Serialized<IRecurrenceRule>): RecurrenceRule => {
        const until = row.until ? RecurrenceRule.parseTimeStamp(row.until) : null;

        const values = {
            id: row.id ?? '',
            label: row.label ?? '',
            frequency: row.frequency,
            interval: row.interval ?? 1,
            count: row.count,
            until,
            bySecond: row.by_second,
            byMinute: row.by_minute,
            byHour: row.by_hour,
            byDay: row.by_day,
            byMonthDay: row.by_month_day,
            byYearDay: row.by_year_day,
            byWeekNumber: row.by_week_number,
            byMonth: row.by_month,
            bySetPosition: row.by_set_position,
            weekStart: row.week_start as WeekDay,
            createdAt: RecurrenceRule.parseTimeStamp(row.created_at),
            updatedAt: RecurrenceRule.parseTimeStamp(row.updated_at),
        } satisfies Deserialized<IRecurrenceRule>;

        return new RecurrenceRule(values);
    };

    public serialize = (): Serialized<IRecurrenceRule> => {
        const until = this.until ? this.until.toFormat('yyyy-MM-dd HH:mm:ss.SSS') : null;

        const values = {
            id: this.id,
            label: this.label,
            frequency: this.frequency,
            interval: this.interval,
            count: this.count,
            until,
            by_second: this.bySecond,
            by_minute: this.byMinute,
            by_hour: this.byHour,
            by_day: this.byDay,
            by_month_day: this.byMonthDay,
            by_year_day: this.byYearDay,
            by_week_number: this.byWeekNumber,
            by_month: this.byMonth,
            by_set_position: this.bySetPosition,
            week_start: this.weekStart,
            created_at: this.createdAt.toISO()!,
            updated_at: this.updatedAt.toISO()!,
        } satisfies Serialized<IRecurrenceRule>;

        return values;
    };

    public getHumanReadableDescription = (): string => {
        const parts: string[] = [];

        // Base frequency
        const frequencyMap = {
            SECONDLY: 'second',
            MINUTELY: 'minute',
            HOURLY: 'hour',
            DAILY: 'day',
            WEEKLY: 'week',
            MONTHLY: 'month',
            YEARLY: 'year',
        };

        const unit = frequencyMap[this.frequency];
        if (this.interval === 1) {
            parts.push(`Every ${unit}`);
        } else {
            parts.push(`Every ${this.interval} ${unit}s`);
        }

        // Add constraints
        if (this.byDay) {
            const dayNames = this.byDay.map((day) => {
                const dayMap = {
                    SU: 'Sunday',
                    MO: 'Monday',
                    TU: 'Tuesday',
                    WE: 'Wednesday',
                    TH: 'Thursday',
                    FR: 'Friday',
                    SA: 'Saturday',
                };
                return dayMap[day.slice(-2) as WeekDay] || day;
            });
            parts.push(`on ${dayNames.join(', ')}`);
        }

        if (this.byMonth) {
            const monthNames = this.byMonth.map((month) => {
                const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return monthMap[month - 1] || month.toString();
            });
            parts.push(`in ${monthNames.join(', ')}`);
        }

        if (this.byMonthDay) {
            parts.push(`on day ${this.byMonthDay.join(', ')} of month`);
        }

        // End condition
        if (this.count) {
            parts.push(`for ${this.count} occurrence${this.count > 1 ? 's' : ''}`);
        } else if (this.until) {
            parts.push(`until ${this.until.toFormat('MMM dd, yyyy')}`);
        }

        return parts.join(' ');
    };

    public static parseTimeStamp = (timestamp: string = '', zone?: string) => {
        if (/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{6}\+[0-9]{2}/.test(timestamp)) {
            const dt = DateTime.fromSQL(timestamp, { zone });
            if (!dt.isValid) throw new Error('Unable to parse timestamp: ' + timestamp);
            return dt;
        }

        if (/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}/.test(timestamp)) {
            const dt = DateTime.fromFormat(timestamp, 'yyyy-MM-dd hh:mm:ss.SSS', { zone });
            if (!dt.isValid) throw new Error('Unable to parse timestamp: ' + timestamp);
            return dt;
        }

        if (/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/.test(timestamp)) {
            const dt = DateTime.fromFormat(timestamp, 'yyyy-MM-dd hh:mm:ss', { zone });
            if (!dt.isValid) throw new Error('Unable to parse timestamp: ' + timestamp);
            return dt;
        }

        const dt = DateTime.fromISO(timestamp, { zone });
        if (dt.isValid) return dt;

        throw new Error('Invalid timestamp: ' + timestamp);
    };

    /**
     * Validates that mutually exclusive fields are properly set
     */
    public validate = (): { isValid: boolean; errors: string[] } => {
        const errors: string[] = [];

        // count and until are mutually exclusive
        if (this.count !== null && this.until !== null) {
            errors.push('count and until are mutually exclusive');
        }

        // Validate array ranges
        if (this.bySecond && this.bySecond.some((s) => s < 0 || s > 59)) {
            errors.push('bySecond values must be between 0 and 59');
        }

        if (this.byMinute && this.byMinute.some((m) => m < 0 || m > 59)) {
            errors.push('byMinute values must be between 0 and 59');
        }

        if (this.byHour && this.byHour.some((h) => h < 0 || h > 23)) {
            errors.push('byHour values must be between 0 and 23');
        }

        if (this.byMonth && this.byMonth.some((m) => m < 1 || m > 12)) {
            errors.push('byMonth values must be between 1 and 12');
        }

        if (this.interval <= 0) {
            errors.push('interval must be greater than 0');
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    };
}
