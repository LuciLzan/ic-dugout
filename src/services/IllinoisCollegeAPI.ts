import * as cheerio from "cheerio";
import {getGameIDByName, getSchoolLogo} from "@/services/NCAAApi";

export interface Game {
    date: string;
    unix_date:Date
    opponent: string;
    id: number;
    time: string;
    isConference: boolean;
    home_team: {
        name: string;
        record?: { wins: number; losses: number };
        logo: string;
    };
    away_team: {
        name: string;
        record?: { wins: number; losses: number };
        logo: string;
    };
    location: string;
    details: {
        status: "upcoming" | "live" | "finished";
        home_score?: number;
        away_score?: number;
    };
}

export async function scrapeSchedule(): Promise<Game[]> {
    const url = "https://illinoiscollegeathletics.com/sports/softball/schedule/2026";

    //For image later
    const slugMappingsRaw= await fetch("https://ncaa-api.henrygd.me/schools-index").then(res => res.json()).catch((err) => null);
    const slugMappings = slugMappingsRaw as {slug:string,name:string,long:string}[];




    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    let games: any[] = [];

    $(".sidearm-schedule-game").each((_, el) => {
        const gameEl = $(el);

        // DATE & TIME
        const dateTime = gameEl.find(".sidearm-schedule-game-opponent-date").text().trim()
            .replace("Noon","12:00 PM")//Strange edge case lol;
        const date = dateTime.match(/\w\w\w \d+/)?.at(0) || ""
        const time = dateTime.match(/\d*:..\s../)?.at(0) || ""



        // LOCATION
        const location = gameEl.find(".sidearm-schedule-game-location").text().trim();

        // CONFERENCE FLAG – look for MWC marker in text
        const isConference = gameEl.text().toLowerCase().includes("mwс"); // fuzzy match


        const gameDate = new Date(`${date} 2026 ${time}`);




        const now = new Date();

        let status: "upcoming" | "live" | "finished" = "upcoming";
        let home_score: number | undefined;
        let away_score: number | undefined;


        if (gameDate < now) {
            status = "finished";
            // Only set scores if present
            const scoreText = gameEl.find(".sidearm-schedule-game-result").text().trim();
            const scoreMatch = scoreText.match(/(\d+)\s*-\s*(\d+)/);
            if (scoreMatch) {
                home_score = parseInt(scoreMatch[2], 10);
                away_score = parseInt(scoreMatch[1], 10);
            }
        } else if (
            gameDate.toDateString() === now.toDateString()
        ) {
            // Could refine with actual game duration
            status = "live";
        }

        // Determine home/away by text content
        const opponentText = gameEl.find(".sidearm-schedule-game-opponent-name").text().trim();
        const homeIsIC = gameEl.find(".sidearm-schedule-game-location").text().toLowerCase().includes("jacksonville, il");



        const home_team = {
            name: homeIsIC ? "Illinois College" : opponentText,
        };
        const away_team = {
            name: homeIsIC ? opponentText : "Illinois College",

        };

        games.push({
            unix_date: gameDate,
            opponent: opponentText,
            date,
            time,
            isConference,
            home_team,
            away_team,
            location,
            details: {
                status,
                home_score: status !== "upcoming" ? home_score : undefined,
                away_score: status !== "upcoming" ? away_score : undefined,
            },
        });
    });

    for (const game of games as Game[]) {
        game.id = await getGameIDByName(game.opponent,game.unix_date)
        game.home_team.logo = await getSchoolLogo(game.home_team.name)
        game.away_team.logo = await getSchoolLogo(game.away_team.name)

    }



    return games;
}
