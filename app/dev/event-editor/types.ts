export type Frequency = 'YEARLY' | 'MONTHLY' | 'WEEKLY' | 'DAILY' | 'HOURLY' | 'MINUTELY' | 'SECONDLY';

export type Weekday = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';

/**
 * Represents BYDAY values such as
 * - FR   (every Friday)
 * - 1FR  (first Friday)
 * - -1MO (last Monday)
 */
export type ByDay = Weekday | `${number}${Weekday}`; // e.g., 1FR, -1MO, 3TU

export interface RRuleOptions {
    /** Frequency of the recurrence rule */
    freq: Frequency;

    /** The interval at which to repeat (default: 1) */
    interval?: number;

    /** The inclusive week start day (default: MO) */
    wkst?: Weekday;

    /** Count of occurrences, mutually exclusive with `until` */
    count?: number;

    /** Recurrence end date (in UTC or local depending on your logic) */
    until?: Date;

    /** Start date of the recurrence */
    dtstart?: Date;

    /** "By" rule collections */
    bysetpos?: number[]; // e.g., [1, -1]
    bymonth?: number[]; // 1-12
    bymonthday?: number[]; // 1-31 or -31 to -1
    byyearday?: number[]; // 1-366 or -366 to -1
    byweekno?: number[]; // 1-53 or -53 to -1
    byweekday?: ByDay[]; // e.g., ["MO", "1FR", "-1SU"]
    byhour?: number[]; // 0-23
    byminute?: number[]; // 0-59
    bysecond?: number[]; // 0-59

    /** List of exception dates */
    exdate?: Date[];

    /** List of additional dates */
    rdate?: Date[];
}
