/**
 * @jest-environment jsdom
 */

import Hero from "@/components/Hero/Hero";

import { render, screen } from "@testing-library/react";
import ScheduleList from "@/components/ScheduleList/ScheduleList";

test("Displays Hero title", () => {
    render(<Hero  />);

    expect(screen.getByText("Welcome to the IC Dugout!")).toBeInTheDocument();
});

test("Displays Hero Links", () => {
    render(<Hero  />);

    expect(screen.getByText("View Schedule")).toBeInTheDocument();
});