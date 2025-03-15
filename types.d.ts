type Meta<T extends Record<string, unknown>> = { slug: string } & T;

type BoardProfile = {
    name: string;
    image: string;
    position: string;
    display_order: number;
};

type ParsedMDX<T extends Record<string, unknown>> = { content: ReactElement; meta: Meta<T> };

type CalendarEvent = {
    id: string;
    attendees: string[];
    description: string;
    isAllDay: boolean;
    links: Array<{ url: string; text: string }>;
    location: string;
    recurrence: 'daily' | 'weekly' | 'monthly' | 'yearly' | null;
    times: { end?: Date; start: Date | string };
    title: string;
};

type DateString = `${number}-${number}-${number}`;

type FileTree = { tree: { path: string }[] };
