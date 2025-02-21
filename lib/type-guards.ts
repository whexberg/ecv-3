export const isDateString = (v: unknown): v is DateString => {
    return typeof v === 'string' && /\d{4}-\d{2}-\d{2}/.test(v);
};
