import path from 'node:path';

import * as dateFns from 'date-fns';
import { Cinzel } from 'next/font/google';

import CustomImage from '@/components/custom-image';
import Video from '@/components/video';
import { FileUtils } from '@/lib/utils/files';

const cinzel = Cinzel({ weight: ['400', '500', '600', '700', '800', '900'], subsets: ['latin'] });

type HistoryReportMeta = Meta<{
    title: string;
    date: string;
    tags: string[];
    author: string;
}>;

export async function getHistoryReportByName(filename: string): Promise<ParsedMDX<HistoryReportMeta> | undefined> {
    const filePath = path.join(process.cwd(), 'content/history-reports', filename);

    return FileUtils.parseMDXFile<HistoryReportMeta>(filePath, {
        components: {
            CustomImage,
            Video,
            h1: (props) => (
                <h1 className={`text-3xl py-4 mt-8 ${cinzel.className}`} {...props}>
                    {props.children}
                </h1>
            ),
            h2: (props) => (
                <h2 className={`text-2xl py-2 mt-8 ${cinzel.className}`} {...props}>
                    {props.children}
                </h2>
            ),
            h3: (props) => (
                <h3 className={`text-xl ${cinzel.className}`} {...props}>
                    {props.children}
                </h3>
            ),
            h4: (props) => (
                <h4 className={`text-lg ${cinzel.className}`} {...props}>
                    {props.children}
                </h4>
            ),
            p: (props) => (
                <p className={`m-2 ${cinzel.className}`} {...props}>
                    {props.children}
                </p>
            ),
            CQA: (props) => (
                <p className={`text-red-700 my-4 ${cinzel.className}`} {...props}>
                    CREDO QUIA ABSURDUM
                </p>
            ),
            FYIK: (props) => (
                <p className={`text-red-700 font-bold my-4 ${cinzel.className}`} {...props}>
                    FYIK
                </p>
            ),
            KurteousSignOff: (props) => (
                <div
                    className={`my-20 font-bold flex flex-col items-center justify-center gap-4 ${cinzel.className}`}
                    {...props}
                >
                    <p className="text-3xl" {...props}>
                        WHAT SAY THE BRETHREN!
                    </p>
                    <p className="text-red-700" {...props}>
                        FYIK
                    </p>
                    <p {...props}>{'"CREDO QUIA ABSURDUM"'}</p>
                </div>
            ),
        },
    });
}

export async function getHistoryReportsMeta(): Promise<HistoryReportMeta[] | undefined> {
    const filenames = FileUtils.getMDXFilenames(path.join(process.cwd(), 'content/history-reports'));

    const reportMetas: HistoryReportMeta[] = [];
    for (const filename of filenames) {
        const parsedReport = await getHistoryReportByName(filename);
        if (parsedReport) reportMetas.push(parsedReport.meta);
    }

    return reportMetas.sort((a, b) => {
        if (a.date === 'unknown') return 1;
        if (b.date === 'unknown') return -1;
        const aDate = dateFns.parse(a.date, 'yyyy-MM-dd', new Date());
        const bDate = dateFns.parse(b.date, 'yyyy-MM-dd', new Date());
        return dateFns.isBefore(aDate, bDate) ? 1 : -1;
    });
}
