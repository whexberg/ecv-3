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

    isDateString: (v: unknown): v is DateString => typeof v === 'string' && /\d{4}-\d{2}-\d{2}/.test(v),
};
