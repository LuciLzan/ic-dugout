"use client"

import ScheduleList from "@/components/ScheduleList/ScheduleList";

export default function Scores() {
    return (
        <div>
            <h1>Scores</h1>

            <p>Recent game results:</p>

            <ScheduleList include={["finished"]}></ScheduleList>
        </div>
    );
}
