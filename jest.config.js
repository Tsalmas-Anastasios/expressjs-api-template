/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/test-suite.test.ts'],
    setupFiles: ['<rootDir>/src/__tests__/setup/config-env.ts'],
    setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup/tests.ts'],
    transform: {
        '^.+\.tsx?$': ['ts-jest', {}],
    },
};
