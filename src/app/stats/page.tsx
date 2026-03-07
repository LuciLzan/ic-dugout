"use client"

import ScheduleList from "@/components/ScheduleList/ScheduleList";

export default function Scores() {
    return (
        <div>
            <ScheduleList display={["finished"]} order="reversed"></ScheduleList>
        </div>
    );
}
