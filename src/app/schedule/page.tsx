"use client"
import ScheduleList from "@/components/ScheduleList/ScheduleList";

export default function Schedule() {


    return (
        <div>
            <h1>Schedule</h1>

            <ScheduleList include={["upcoming","live"]}/>
        </div>
    );
}
