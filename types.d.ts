type Meta<T extends Record<string, unknown>> = { slug: string } & T;

type BoardProfile = {
    name: string;
    image: string;
    position: string;
    display_order: number;
};

type ParsedMDX<T extends Record<string, unknown>> = { content: ReactElement; meta: Meta<T> };

type DateString = `${number}-${number}-${number}`;

type FileTree = { tree: { path: string }[] };
