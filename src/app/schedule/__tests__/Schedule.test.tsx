/**
 * @jest-environment jsdom
 */

import Header from "@/components/Header/Header";


import { render, screen } from "@testing-library/react";
import ScheduleList from "@/components/ScheduleList/ScheduleList";
import Home from "@/app/page";
import Scores from "@/app/stats/page";
import Schedule from "@/app/schedule/page";

test("Test page", () => {
    render(<Schedule/>);

    expect(screen.getByText("Games")).toBeInTheDocument();
});