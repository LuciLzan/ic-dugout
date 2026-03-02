"use client"

import ScheduleList from "@/components/ScheduleList/ScheduleList";

export default function Scores() {
    return (
        <div>
            <ScheduleList include={["finished"]}></ScheduleList>
        </div>
    );
}
