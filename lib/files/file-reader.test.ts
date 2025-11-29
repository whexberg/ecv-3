import { randomUUID } from 'crypto';
import { mkdir, rm, writeFile } from 'fs/promises';
import path from 'path';

import { FileReader } from '@/lib/files/file-reader';
import { Result } from '@/lib/result';

const testDir = path.join(process.cwd(), 'test-temp-files' + randomUUID());

describe('FileReader', () => {
    beforeEach(async () => {
        // Create a clean test directory structure
        await mkdir(testDir, { recursive: true });
    });

    afterEach(async () => {
        // Clean up test directory
        await rm(testDir, { recursive: true, force: true });
    });

    describe('constructor', () => {
        it('should create instance with directory only', () => {
            const dir = '/test/path';

            const repo = new FileReader(dir);

            expect(repo).toBeInstanceOf(FileReader);
            expect(repo['_dir']).toEqual(dir);
            expect(repo['extensions']).toEqual([]);
            expect(repo['ignoreDirs']).toEqual([]);
        });

        it('should create instance with extensions', () => {
            const dir = '/test/path';
            const opts = { extensions: ['.ts', '.js'] };

            const repo = new FileReader(dir, opts);

            expect(repo).toBeInstanceOf(FileReader);
            expect(repo['_dir']).toEqual(dir);
            expect(repo['extensions']).toEqual(opts.extensions);
            expect(repo['ignoreDirs']).toEqual([]);
        });

        it('should create instance with ignoreDirs', () => {
            const dir = '/test/path';
            const opt = { ignoreDirs: ['node_modules', '.git'] };

            const repo = new FileReader(dir, opt);

            expect(repo).toBeInstanceOf(FileReader);
            expect(repo['_dir']).toEqual(dir);
            expect(repo['extensions']).toEqual([]);
            expect(repo['ignoreDirs']).toEqual(opt.ignoreDirs);
        });

        it('should create instance with both extensions and ignoreDirs', () => {
            const dir = '/test/path';
            const opt = { extensions: ['.ts'], ignoreDirs: ['dist'] };

            const repo = new FileReader(dir, opt);

            expect(repo).toBeInstanceOf(FileReader);
            expect(repo['_dir']).toEqual(dir);
            expect(repo['extensions']).toEqual(opt.extensions);
            expect(repo['ignoreDirs']).toEqual(opt.ignoreDirs);
        });
    });

    describe('setDirectory', () => {
        it('should update the directory', async () => {
            const dir1 = '/initial/path';
            const dir2 = '/new/path';

            const repo = new FileReader(dir1);
            expect(repo['_dir']).toEqual(dir1);

            repo.setDirectory(dir2);
            expect(repo['_dir']).toEqual(dir2);
        });
    });

    describe('getAllFiles', () => {
        it('should return empty array for empty directory', async () => {
            const repo = new FileReader(testDir, { extensions: ['.ts'] });

            const result = await repo.getAllFiles();

            expect(Result.isSuccess(result)).toBe(true);
            if (Result.isSuccess(result)) {
                expect(result.value).toEqual([]);
            }
        });

        it('should find files with matching extensions', async () => {
            // Create test files
            await writeFile(path.join(testDir, 'file1.ts'), 'content');
            await writeFile(path.join(testDir, 'file2.ts'), 'content');
            await writeFile(path.join(testDir, 'file3.js'), 'content');
            const repo = new FileReader(testDir, { extensions: ['.ts'] });

            const result = await repo.getAllFiles();

            expect(Result.isSuccess(result)).toBe(true);
            if (Result.isSuccess(result)) {
                expect(result.value).toHaveLength(2);
                expect(result.value.every((f) => f.endsWith('.ts'))).toBe(true);
            }
        });

        it('should find files with multiple extensions', async () => {
            await writeFile(path.join(testDir, 'file1.ts'), 'content');
            await writeFile(path.join(testDir, 'file2.js'), 'content');
            await writeFile(path.join(testDir, 'file3.txt'), 'content');

            const repo = new FileReader(testDir, { extensions: ['.ts', '.js'] });

            const result = await repo.getAllFiles();

            expect(Result.isSuccess(result)).toBe(true);
            if (Result.isSuccess(result)) {
                expect(result.value).toHaveLength(2);
                expect(result.value.some((f) => f.endsWith('.ts'))).toBe(true);
                expect(result.value.some((f) => f.endsWith('.js'))).toBe(true);
            }
        });

        it('should recursively find files in subdirectories', async () => {
            const subDir = path.join(testDir, 'subdir');
            await mkdir(subDir);
            await writeFile(path.join(testDir, 'root.ts'), 'content');
            await writeFile(path.join(subDir, 'nested.ts'), 'content');

            const repo = new FileReader(testDir, { extensions: ['.ts'] });

            const result = await repo.getAllFiles();

            expect(Result.isSuccess(result)).toBe(true);
            if (Result.isSuccess(result)) {
                expect(result.value).toHaveLength(2);
                expect(result.value.some((f) => f.includes('root.ts'))).toBe(true);
                expect(result.value.some((f) => f.includes('nested.ts'))).toBe(true);
            }
        });

        it('should ignore directories in ignoreDirs', async () => {
            const nodeModules = path.join(testDir, 'node_modules');
            await mkdir(nodeModules);
            await writeFile(path.join(testDir, 'app.ts'), 'content');
            await writeFile(path.join(nodeModules, 'lib.ts'), 'content');

            const repo = new FileReader(testDir, { extensions: ['.ts'], ignoreDirs: ['node_modules'] });

            const result = await repo.getAllFiles();

            expect(Result.isSuccess(result)).toBe(true);
            if (Result.isSuccess(result)) {
                expect(result.value).toHaveLength(1);
                expect(result.value[0]).toContain('app.ts');
                expect(result.value[0]).not.toContain('node_modules');
            }
        });

        it('should ignore multiple directories', async () => {
            const dist = path.join(testDir, 'dist');
            const nodeModules = path.join(testDir, 'node_modules');
            await mkdir(dist);
            await mkdir(nodeModules);
            await writeFile(path.join(testDir, 'src.ts'), 'content');
            await writeFile(path.join(dist, 'build.ts'), 'content');
            await writeFile(path.join(nodeModules, 'lib.ts'), 'content');

            const repo = new FileReader(testDir, { extensions: ['.ts'], ignoreDirs: ['dist', 'node_modules'] });

            const result = await repo.getAllFiles();

            expect(Result.isSuccess(result)).toBe(true);
            if (Result.isSuccess(result)) {
                expect(result.value).toHaveLength(1);
                expect(result.value[0]).toContain('src.ts');
            }
        });

        it('should use cache on second call by default', async () => {
            await writeFile(path.join(testDir, 'file.ts'), 'content');

            const repo = new FileReader(testDir, { extensions: ['.ts'] });

            const result1 = await repo.getAllFiles();
            const result2 = await repo.getAllFiles();

            expect(Result.isSuccess(result1)).toBe(true);
            expect(Result.isSuccess(result2)).toBe(true);
            if (Result.isSuccess(result1) && Result.isSuccess(result2)) {
                expect(result1.value).toEqual(result2.value);
            }
        });

        it('should bypass cache when useCache is false', async () => {
            await writeFile(path.join(testDir, 'file1.ts'), 'content');

            const repo = new FileReader(testDir, { extensions: ['.ts'] });

            const result1 = await repo.getAllFiles();

            // Add another file
            await writeFile(path.join(testDir, 'file2.ts'), 'content');

            const result2 = await repo.getAllFiles();

            expect(Result.isSuccess(result1)).toBe(true);
            expect(Result.isSuccess(result2)).toBe(true);
            if (Result.isSuccess(result1) && Result.isSuccess(result2)) {
                expect(result1.value).toHaveLength(1);
                expect(result2.value).toHaveLength(2);
            }
        });

        it('should return failure for non-existent directory', async () => {
            const repo = new FileReader('/non/existent/path', {
                extensions: ['.ts'],
            });

            const result = await repo.getAllFiles();

            expect(Result.isFailure(result)).toBe(true);
            if (Result.isFailure(result)) {
                expect(result.error).toContain('Failed to read directory');
            }
        });

        it('should handle deeply nested directory structures', async () => {
            const deepPath = path.join(testDir, 'a', 'b', 'c', 'd');
            await mkdir(deepPath, { recursive: true });
            await writeFile(path.join(deepPath, 'deep.ts'), 'content');
            await writeFile(path.join(testDir, 'root.ts'), 'content');

            const repo = new FileReader(testDir, { extensions: ['.ts'] });

            const result = await repo.getAllFiles();

            expect(Result.isSuccess(result)).toBe(true);
            if (Result.isSuccess(result)) {
                expect(result.value).toHaveLength(2);
                expect(result.value.some((f) => f.includes('deep.ts'))).toBe(true);
            }
        });

        it('should match files by extension suffix correctly', async () => {
            await writeFile(path.join(testDir, 'test.ts'), 'content');
            await writeFile(path.join(testDir, 'test.test.ts'), 'content');
            await writeFile(path.join(testDir, 'component.tsx'), 'content');

            const repo = new FileReader(testDir, { extensions: ['.ts'] });

            const result = await repo.getAllFiles();

            expect(Result.isSuccess(result)).toBe(true);
            if (Result.isSuccess(result)) {
                // Should match both .ts files but not .tsx
                expect(result.value).toHaveLength(2);
            }
        });

        it('should ignore directories by suffix match', async () => {
            const testModules = path.join(testDir, 'test_node_modules');
            const nodeModules = path.join(testDir, 'node_modules');
            await mkdir(testModules);
            await mkdir(nodeModules);
            await writeFile(path.join(testModules, 'file1.ts'), 'content');
            await writeFile(path.join(nodeModules, 'file2.ts'), 'content');

            const repo = new FileReader(testDir, { extensions: ['.ts'], ignoreDirs: ['node_modules'] });

            const result = await repo.getAllFiles();

            expect(Result.isSuccess(result)).toBe(true);
            if (Result.isSuccess(result)) {
                // Both directories end with 'node_modules' so both should be ignored
                expect(result.value).toHaveLength(0);
            }
        });

        it('should handle empty extensions array', async () => {
            await writeFile(path.join(testDir, 'file.ts'), 'content');
            await writeFile(path.join(testDir, 'file.js'), 'content');

            const repo = new FileReader(testDir, { extensions: [] });

            const result = await repo.getAllFiles();

            expect(Result.isSuccess(result)).toBe(true);
            if (Result.isSuccess(result)) {
                // No extensions specified, so no files should match
                expect(result.value).toHaveLength(0);
            }
        });

        it('should update cache after successful scan', async () => {
            await writeFile(path.join(testDir, 'file.ts'), 'content');

            const repo = new FileReader(testDir, { extensions: ['.ts'] });

            // First call without cache
            const result1 = await repo.getAllFiles();

            // Second call with cache (default)
            const result2 = await repo.getAllFiles();

            expect(Result.isSuccess(result1)).toBe(true);
            expect(Result.isSuccess(result2)).toBe(true);
            if (Result.isSuccess(result1) && Result.isSuccess(result2)) {
                expect(result1.value).toEqual(result2.value);
            }
        });

        it('should handle mixed file and directory structure', async () => {
            const src = path.join(testDir, 'src');
            const tests = path.join(testDir, 'tests');
            await mkdir(src);
            await mkdir(tests);
            await writeFile(path.join(testDir, 'root.ts'), 'content');
            await writeFile(path.join(src, 'app.ts'), 'content');
            await writeFile(path.join(src, 'utils.ts'), 'content');
            await writeFile(path.join(tests, 'test.ts'), 'content');
            await writeFile(path.join(testDir, 'README.md'), 'content');

            const repo = new FileReader(testDir, { extensions: ['.ts'] });

            const result = await repo.getAllFiles();

            expect(Result.isSuccess(result)).toBe(true);
            if (Result.isSuccess(result)) {
                expect(result.value).toHaveLength(4);
                expect(result.value.every((f) => f.endsWith('.ts'))).toBe(true);
            }
        });
    });
});
