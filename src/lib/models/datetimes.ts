import { DateTime } from 'luxon';

export const DateTimeUtils = {
    isToday: (dt: DateTime): boolean => {
        if (!DateTime.isDateTime(dt)) {
            throw new Error('Invalid date: ' + JSON.stringify(dt) + '');
        }

        return DateTime.local().toISODate() === dt.toLocal().toISODate();
    },
    eachDayOfInterval: function (start: DateTime, end: DateTime): DateTime[] {
        const days: DateTime[] = [];
        let current = start.startOf('day');

        while (current <= end.startOf('day')) {
            days.push(current);
            current = current.plus({ days: 1 });
        }

        return days;
    },
    isValidTime: (str: string) => /\d{2}:\d{2}:\d{2}.\d{3}-\d{2}:\d{2}/.test(str),
    toISODate: (d: Date) => d.toISOString().split('T')[0],
};
