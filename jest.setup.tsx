import '@testing-library/jest-dom'

import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, ...props }: any) => {
        return <img src={src} alt={alt} />
    },
}))
