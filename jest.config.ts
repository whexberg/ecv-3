import { readFileSync } from 'node:fs';

import { createDefaultPreset, pathsToModuleNameMapper } from 'ts-jest';

const tsconfig = JSON.parse(readFileSync('./tsconfig.json', 'utf-8'));

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('jest').Config} **/
const config = {
    testEnvironment: 'node',
    transform: { ...tsJestTransformCfg },
    moduleNameMapper: pathsToModuleNameMapper(
        tsconfig.compilerOptions.paths,
        { prefix: '<rootDir>/' }, // match your baseUrl
    ),
};

export default config;
