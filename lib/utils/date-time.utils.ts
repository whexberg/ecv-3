import { DateTime, Duration } from 'luxon';

export const DateTimeUtils = {
    eachDayOfInterval: function (start: DateTime, end: DateTime): DateTime[] {
        const days: DateTime[] = [];
        let current = start.startOf('day');

        while (current <= end.startOf('day')) {
            days.push(current);
            current = current.plus({ days: 1 });
        }

        return days;
    },

    /**
     * Extracts all numeric components from any date or datetime string.
     * Returns each number as a Number, in the order they appear.
     *
     * Examples:
     *  extractDateNumbers("2025-02-08")               -> [2025, 2, 8]
     *  extractDateNumbers("02/08/2025")               -> [2, 8, 2025]
     *  extractDateNumbers("2025-02-08T04:03:00Z")     -> [2025, 2, 8, 4, 3, 0]
     *  extractDateNumbers("Feb 8, 2025 4:03 PM")      -> [8, 2025, 4, 3]
     */
    extractDateNumbers: (input: string) => {
        const matches = input.match(/\d+/g) ?? [];
        const [year = 0, month = 0, day = 0, hour = 0, minute = 0, second = 0, millisecond = 0] = matches.map((str) =>
            parseInt(str.replace(/^0+/, '') || '0'),
        );

        return { year, month, day, hour, minute, second, millisecond };
    },
    getFormattedDate: (str: string): string => {
        if (!str || str === 'unknown') return 'unknown';

        const date = DateTime.fromFormat(str, 'yyyy-MM-dd');
        const cy = date.year + 4005;

        return `${date.toFormat('MMMM dd, yyyy')} C.Y. ${cy}`;
    },
    getTimeUntil: (target: DateTime) => {
        const now = DateTime.now();
        const duration = Duration.fromObject({
            days: target.diff(now, 'days').days,
            hours: target.diff(now, 'hours').hours % 24,
            minutes: target.diff(now, 'minutes').minutes % 60,
            seconds: target.diff(now, 'seconds').seconds % 60,
        });

        return {
            days: duration.days,
            hours: duration.hours,
            minutes: duration.minutes,
            seconds: duration.seconds,
        };
    },
    isToday: (dt: DateTime): boolean => {
        if (!DateTime.isDateTime(dt)) throw new Error('Invalid date: ' + JSON.stringify(dt) + '');
        return DateTime.local().toISODate() === dt.toLocal().toISODate();
    },
    isValidTime: (str: string) => /\d{2}:\d{2}:\d{2}.\d{3}-\d{2}:\d{2}/.test(str),
    parseTimeStamp: (timestamp: string = '', zone?: string) => {
        const options = zone ? { zone } : {};
        let dt = DateTime.fromSQL(timestamp, options);
        if (dt.isValid) return dt;

        dt = DateTime.fromISO(timestamp, options);
        if (dt.isValid) return dt;

        throw new Error('format not supported: ' + timestamp);
    },
    parseDateTime,
    toISODate: (d: Date) => d.toISOString().split('T')[0],
    toISOTime: (d: Date) => d.toISOString().split('T')[1].replace('Z', ''),

    serializeDateTime: (v?: DateTime | null): string | null => (v && v.isValid ? v.toJSDate().toISOString() : null),
};

type ParsingOptions = { zone?: string; keepTime?: boolean; asDate?: boolean; allowNull?: boolean };

function parseDateTime(
    v: string | Date | null | undefined,
    options: { zone?: string; keepTime?: boolean; asDate?: false; allowNull?: false },
): DateTime;
function parseDateTime(
    v: string | Date | null | undefined,
    options: { zone?: string; keepTime?: boolean; asDate?: false; allowNull: true },
): DateTime | null;
function parseDateTime(
    v: string | Date | null | undefined,
    options: { zone?: string; keepTime?: boolean; asDate: true; allowNull?: false },
): Date;
function parseDateTime(
    v: string | Date | null | undefined,
    options: { zone?: string; keepTime?: boolean; asDate: true; allowNull: true },
): Date | null;
function parseDateTime(
    v?: string | Date | null,
    { zone, keepTime, asDate, allowNull }: ParsingOptions = {},
): DateTime | Date | null {
    if (DateTime.isDateTime(v)) return v;
    let value: DateTime | null = null;
    if (v) {
        if (v instanceof Date) v = v.toISOString();

        if (zone) {
            if (keepTime) {
                const { year, month, day, hour, minute, second, millisecond } = DateTimeUtils.extractDateNumbers(v);
                value = DateTime.fromObject({ year, month, day, hour, minute, second, millisecond }, { zone });
            }
        } else {
            value = DateTimeUtils.parseTimeStamp(v, zone);
        }
    }

    if (value == null || !value?.isValid) {
        if (allowNull) return null;
        throw new Error('Invalid date ' + v);
    }

    return asDate ? value.toJSDate() : value;
}
