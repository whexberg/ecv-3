type Meta<T extends Record<string, unknown>> = { slug: string } & T;

type BoardProfile = {
    name: string;
    image: string;
    position: string;
    display_order: number;
};

type ParsedMDX<T extends Record<string, unknown>> = { content: ReactElement; meta: Meta<T> };

type CalendarEvent = {
    date?: string;
    times?: { start?: string; end?: string };
    title: string;
    description: string;
    links: {
        url: string;
        text: string;
    }[];
};

type DateString = `${number}-${number}-${number}`;

type FileTree = { tree: { path: string }[] };
