export const DateUtils = {
    getFormattedDate: (dateString: string): string => {
        if (dateString === 'unknown') return dateString;

        const date = new Date(dateString);
        return `${new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date)} C.Y. ${DateUtils.getClamperYear(date)}`;
    },
    getClamperYear: (date: Date): number => date.getFullYear() + 4005,
};
