/**
 * @jest-environment jsdom
 */




import { render, screen } from "@testing-library/react";

import MemberPage from "@/app/member/page";
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn()
        }
    },

}))

test("Test member page", () => {
    render(<MemberPage/>);

    expect(screen.getByText("Welcome to the inside scoop!")).toBeInTheDocument();
});