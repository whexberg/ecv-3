import { randomUUID } from 'crypto';
import { mkdir, rm, writeFile } from 'fs/promises';
import path from 'path';

import { EventsRepository } from '@/lib/events-repository';
import { Result } from '@/lib/result';

jest.mock('next-mdx-remote/rsc', () => ({}));
jest.mock('rehype-autolink-headings', () => ({}));
jest.mock('rehype-slug', () => ({}));
jest.mock('remark-gfm', () => ({}));

const testDir = path.join(process.cwd(), 'test-temp-files' + randomUUID());

describe('EventsRepository', () => {
    beforeEach(async () => {
        // Create a clean test directory structure
        await mkdir(testDir, { recursive: true });
    });

    afterEach(async () => {
        // Clean up test directory
        await rm(testDir, { recursive: true, force: true });
    });

    describe('getAllEvents', () => {
        it('should do something', async () => {
            const pathname = path.join(testDir, 'this-is-the-slug.mdx');
            const content = `---
title: "Hello"
tags: ["a", "b"]
start_datetime: '1234-12-23T11:11:11'
end_datetime: '1234-12-23T11:11:11'
---
# Content
`;
            await writeFile(pathname, content);

            const result = await new EventsRepository(testDir, { extensions: ['.mdx'] }).getAllEvents(false);

            expect(Result.isSuccess(result)).toBe(true);
            if (Result.isSuccess(result)) {
                expect(result.value).toHaveLength(1);
                expect(result.value[0].slug).toBe('this-is-the-slug');
            }
        });
    });
});
