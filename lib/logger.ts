/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTime } from 'luxon';

const Colors = {
    black: { fg: 30, bg: 40 },
    red: { fg: 31, bg: 41 },
    green: { fg: 32, bg: 42 },
    yellow: { fg: 33, bg: 43 },
    blue: { fg: 34, bg: 44 },
    magenta: { fg: 35, bg: 45 },
    cyan: { fg: 36, bg: 46 },
    white: { fg: 37, bg: 47 },
    gray: { fg: 90, bg: 100 },
    brightRed: { fg: 91, bg: 101 },
    brightGreen: { fg: 92, bg: 102 },
    brightYellow: { fg: 93, bg: 103 },
    brightBlue: { fg: 94, bg: 104 },
    brightMagenta: { fg: 95, bg: 105 },
    brightCyan: { fg: 96, bg: 106 },
    brightWhite: { fg: 97, bg: 107 },
};

const fmtText = (text: string, ...codes: number[]) => `\x1b[${codes.join(';')}m${text}\x1B[m`;
const getTimeStamp = () => DateTime.now().toFormat('[HH:mm:ss]');

export const Logger = {
    log: (...args: any[]) =>
        console.log(`${fmtText(getTimeStamp(), Colors.gray.fg)} ${fmtText('INF', Colors.brightBlue.fg)}`, ...args),

    warn: (...args: any[]) =>
        console.warn(`${fmtText(getTimeStamp(), Colors.gray.fg)} ${fmtText('WRN', Colors.red.fg)}`, ...args),

    error: (...args: any[]) =>
        console.error(`${fmtText(getTimeStamp(), Colors.gray.fg)} ${fmtText('ERR', Colors.red.fg)}`, ...args),
};
