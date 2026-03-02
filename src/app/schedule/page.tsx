"use client"
import ScheduleList from "@/components/ScheduleList/ScheduleList";

export default function Schedule() {


    return (
        <div>
            <ScheduleList include={["upcoming","live"]}/>
        </div>
    );
}
