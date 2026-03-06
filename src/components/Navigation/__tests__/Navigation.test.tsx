/**
 * @jest-environment jsdom
 */


import { render, screen } from "@testing-library/react";
import ScheduleList from "@/components/ScheduleList/ScheduleList";
import Navigation from "@/components/Navigation/Navigation";

test("Displays Navigation Links", () => {
    render(<Navigation  />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Schedule")).toBeInTheDocument();
    expect(screen.getByText("Scores")).toBeInTheDocument();
    expect(screen.getByText("Stats")).toBeInTheDocument();
});
