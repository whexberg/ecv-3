import path from 'node:path';

import { FileUtils } from '@/src/lib/utils/files';

export async function getBoardProfileByName(filename: string): Promise<ParsedMDX<BoardProfile> | undefined> {
    const filePath = path.join(process.cwd(), 'src/content/profiles/board-members/', filename);
    return FileUtils.parseMDXFile<BoardProfile>(filePath);
}

export async function getBoardProfiles(): Promise<BoardProfile[] | undefined> {
    const filenames = [
        'humbug.mdx',
        'vice-humbug.mdx',
        'gold-dust-receiver.mdx',
        'recorder.mdx',
        'damned-fool-door-keep.mdx',
        'board-member-1.mdx',
        'board-member-2.mdx',
        'board-member-3.mdx',
        'hangman.mdx',
        'clampatriarch.mdx',
        'historian.mdx',
        'historian-emeritus.mdx',
        'cyber-recorder.mdx',
    ];

    const profiles: BoardProfile[] = [];
    for (const file of filenames) {
        const profile = await getBoardProfileByName(file);
        if (profile) profiles.push(profile.meta);
    }

    return profiles;
}
