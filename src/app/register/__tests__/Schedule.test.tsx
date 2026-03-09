/**
 * @jest-environment jsdom
 */




import { render, screen } from "@testing-library/react";
import LoginPage from "@/app/login/page";
import RegisterPage from "@/app/register/page";
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn()
        }
    }
}))

test("Test register page", () => {
    render(<RegisterPage></RegisterPage>);

    expect(screen.getByText("Create Account")).toBeInTheDocument();
});