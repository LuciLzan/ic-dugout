/**
 * @jest-environment jsdom
 */




import { render, screen } from "@testing-library/react";
import LoginPage from "@/app/login/page";

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn()
        }
    }
}))
test("Test login page", () => {
    render(<LoginPage/>);

    expect(screen.getByText("Login")).toBeInTheDocument();
});