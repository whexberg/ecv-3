import { DateTime, Duration } from 'luxon';

export const DateUtils = {
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
};
