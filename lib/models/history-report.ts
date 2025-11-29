export type EncodedHistoryReport = {
    id?: string;
    title?: string;
    author?: string;
    date?: string;
    tags?: string[];
    body?: string;
    created_at?: string;
    updated_at?: string;
};

export type IHistoryReport = {
    id: string;
    title: string;
    author: string;
    date: string;
    tags: string[];
    body: string;
    createdAt: string;
    updatedAt: string;
};

export class HistoryReport implements IHistoryReport {
    id: string;
    title: string;
    author: string;
    date: string;
    tags: string[];
    body: string;
    createdAt: string;
    updatedAt: string;

    constructor(d: IHistoryReport) {
        this.id = d.id;
        this.title = d.title;
        this.author = d.author;
        this.date = d.date;
        this.tags = d.tags;
        this.body = d.body;
        this.createdAt = d.createdAt;
        this.updatedAt = d.updatedAt;
    }

    public static deserialize = (d?: EncodedHistoryReport): HistoryReport => {
        return new HistoryReport({
            id: d?.id ?? '',
            title: d?.title ?? '',
            author: d?.author ?? '',
            date: d?.date ?? '',
            tags: d?.tags ?? [],
            body: d?.body ?? '',
            createdAt: d?.created_at ?? '',
            updatedAt: d?.updated_at ?? '',
        });
    };

    public serialize = (): EncodedHistoryReport => {
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            date: this.date,
            tags: this.tags,
            body: this.body,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
        };
    };
}
