import {NextResponse} from "next/dist/server/web/spec-extension/response";
import {scrapeSchedule} from "@/services/IllinoisCollegeAPI";



export async function GET() {
    const games = await scrapeSchedule()
    return NextResponse.json(games);
}


