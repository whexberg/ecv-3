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
        if (!DateTime.isDateTime(dt)) {
            throw new Error('Invalid date: ' + JSON.stringify(dt) + '');
        }

        return DateTime.local().toISODate() === dt.toLocal().toISODate();
    },
    isValidTime: (str: string) => /\d{2}:\d{2}:\d{2}.\d{3}-\d{2}:\d{2}/.test(str),
    toISODate: (d: Date) => d.toISOString().split('T')[0],
};
