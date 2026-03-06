import '@testing-library/jest-dom'

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, ...props }: any) => {
        return <img src={src} alt={alt} />
    },
}))
