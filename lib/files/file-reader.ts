import fs from 'fs/promises';
import path from 'path';

import { AsyncResult, Result } from '@/lib/result';

export class FileReader {
    private _allFilesCache: string[] = [];
    private _dir: string;
    private extensions: string[];
    private ignoreDirs: string[];

    constructor(
        directory: string,
        {
            extensions = [],
            ignoreDirs = [],
        }: {
            extensions?: string[];
            ignoreDirs?: string[];
        } = {},
    ) {
        this._dir = directory;
        this.extensions = extensions;
        this.ignoreDirs = ignoreDirs;
    }

    public setDirectory(directory: string) {
        this._dir = directory;
    }

    public async readFile(filePath: string): AsyncResult<string> {
        try {
            const contents = await fs.readFile(filePath, 'utf8');
            return Result.success(contents);
        } catch (err) {
            return Result.failure(`Failed to read file "${filePath}": ${(err as Error).message}`);
        }
    }

    /**
     * Recursively find all files that match the configured extension
     */
    public async getAllFiles(useCache = false): AsyncResult<string[], string> {
        if (useCache) return Result.success(this._allFilesCache);

        const result = await this.walk(this._dir);
        this._allFilesCache = result.isSuccess ? result.value : [];
        return result;
    }

    private async walk(dir: string): AsyncResult<string[], string> {
        try {
            const entries = await fs.readdir(dir, { withFileTypes: true });

            const results: string[] = [];
            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);

                if (entry.isDirectory() && !this.ignoreDirs.some((d) => entry.name.endsWith(d))) {
                    const result = await this.walk(fullPath);
                    if (result.isSuccess) results.push(...result.value);
                } else if (entry.isFile() && this.extensions.some((ext) => fullPath.endsWith(ext))) {
                    results.push(fullPath);
                }
            }

            return Result.success(results);
        } catch (err) {
            return Result.failure(`Failed to read directory "${dir}": ${(err as Error).message}`);
        }
    }
}
