import { readFileSync } from 'node:fs';

import type { Config } from 'jest';
import { createDefaultPreset, pathsToModuleNameMapper } from 'ts-jest';

const tsconfig = JSON.parse(readFileSync('./tsconfig.json', 'utf-8'));

const tsJestTransformCfg = createDefaultPreset().transform;

const config: Config = {
    testEnvironment: 'node',
    transform: { ...tsJestTransformCfg },
    moduleNameMapper: pathsToModuleNameMapper(
        tsconfig.compilerOptions.paths,
        { prefix: '<rootDir>/' }, // match your baseUrl
    ),
};

export default config;
