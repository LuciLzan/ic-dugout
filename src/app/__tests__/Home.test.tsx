/**
 * @jest-environment jsdom
 */

import Header from "@/components/Header/Header";


import { render, screen } from "@testing-library/react";
import ScheduleList from "@/components/ScheduleList/ScheduleList";
import Home from "@/app/page";

test("Test for hero", () => {
    render(<Home/>);

    expect(screen.getByText("Welcome to the IC Dugout!")).toBeInTheDocument();
});