/**
 * @jest-environment jsdom
 */
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(Response.json({})),
    })
) as jest.Mock;

import {render, screen, waitFor} from "@testing-library/react";
import ScheduleList from "@/components/ScheduleList/ScheduleList";

test("Displays schedule title", async () => {
    render(<ScheduleList display={["finished"]} />);

    await waitFor(async ()=> {
        expect(screen.getByText("Games")).toBeInTheDocument();
    })
});