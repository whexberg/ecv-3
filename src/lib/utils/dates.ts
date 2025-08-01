import { DateTime, Duration } from 'luxon';

export const DateUtils = {
    getFormattedDate: (str: string): string => {
        if (str === 'unknown') return str;

        const date = DateTime.fromFormat(str, 'yyyy-MM-dd');
        const cy = DateUtils.getClamperYear(date);

        return `${date.toFormat('MMMM dd, yyyy')} C.Y. ${cy}`;
    },

    getClamperYear: (date: DateTime): number => date.year + 4005,

    isDateString: (v: unknown): v is DateString => typeof v === 'string' && /\d{4}-\d{2}-\d{2}/.test(v),

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
};
