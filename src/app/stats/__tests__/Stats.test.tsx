/**
 * @jest-environment jsdom
 */

import Header from "@/components/Header/Header";


import { render, screen } from "@testing-library/react";
import ScheduleList from "@/components/ScheduleList/ScheduleList";
import Home from "@/app/page";
import Scores from "@/app/stats/page";

test("Test page", () => {
    render(<Scores/>);

    expect(screen.getByText("Games")).toBeInTheDocument();
});