import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node", // default environment
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",

        "\\.(css|scss|sass)$": "identity-obj-proxy",
        "\\.(png|jpg|jpeg|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.ts"
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.tsx"],
};

export default config;