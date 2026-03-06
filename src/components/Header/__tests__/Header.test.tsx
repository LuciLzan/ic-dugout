/**
 * @jest-environment jsdom
 */

import Header from "@/components/Header/Header";


import { render, screen } from "@testing-library/react";
import ScheduleList from "@/components/ScheduleList/ScheduleList";

test("Displays schedule title",async () => {
    render(<Header />);

    expect(screen.getByText("The IC Dugout")).toBeInTheDocument();
});