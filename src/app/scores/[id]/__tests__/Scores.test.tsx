/**
 * @jest-environment jsdom
 */




import {act, render, screen, waitFor} from "@testing-library/react";
import Scores from "@/app/scores/[id]/page";



global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(Response.json({})),
    })
) as jest.Mock;

test("Test page",async () => {
    await act(async () => {
        render(<Scores/>);
    })

    await waitFor(() => {
        expect(screen.getByText("Game Stats")).toBeInTheDocument();
    })
});