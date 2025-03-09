import { format, parse } from 'date-fns';

export const DateUtils = {
    getFormattedDate: (str: string): string => {
        if (str === 'unknown') return str;

        const date = parse(str, 'yyyy-MM-dd', new Date());
        const fmt = format(date, 'MMMM dd, yyyy');
        const cy = DateUtils.getClamperYear(date);

        return `${fmt} C.Y. ${cy}`;
    },
    getClamperYear: (date: Date): number => date.getFullYear() + 4005,
};
