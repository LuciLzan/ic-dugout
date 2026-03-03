import {NextResponse} from "next/dist/server/web/spec-extension/response";

import * as cheerio from "cheerio";


export async function GET() {
    const games = await scrapeSchedule()
    return NextResponse.json(games);
}

export interface Game {
    date: string;
    time: string;
    isConference: boolean;
    home_team: {
        name: string;
        record?: {//Only up to that point
            wins: number;
            losses: number;
        }
        logo: string; //URL, to be checked
    }
    away_team: {
        name: string;
        record?: {//Only up to that point
            wins: number;
            losses: number;
        }
        logo: string; //URL, to be checked
    }
    location: string; //City, field if able
    details: {
        status: "upcoming"|"live"|"finished"
        home_score?: number; //Null for upcoming games
        away_score?: number; //Null for upcoming games
    }
}


export interface Game {
    date: string;
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

    const games: Game[] = [];

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



        const gameDate = new Date(`${date} ${time} 2026`);




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
                home_score = parseInt(scoreMatch[1], 10);
                away_score = parseInt(scoreMatch[2], 10);
            }
        } else if (
            gameDate.toDateString() === now.toDateString()
        ) {
            // Could refine with actual game duration
            status = "live";
        }

        // Determine home/away by text content
        const opponentText = gameEl.find(".sidearm-schedule-game-opponent-name").text().trim();
        const homeIsIC = gameEl.find(".sidearm-schedule-game-home-away").text().toLowerCase().includes("home");

        // Get logo image (first <img> in block)


        let logoUrl = "https://placehold.co/80"
        if(slugMappings) {
            const mapping = slugMappings.find(entry => (opponentText.includes(entry.long))||opponentText.includes(entry.name))
            if(mapping) {
                logoUrl = `https://ncaa-api.henrygd.me/logo/${mapping.slug}.svg`
            }
        }

        const home_team = {
            name: homeIsIC ? "Illinois College" : opponentText,
            logo: homeIsIC ? "/path-to-IC-logo.png" : logoUrl,
        };
        const away_team = {
            name: homeIsIC ? opponentText : "Illinois College",
            logo: homeIsIC ? logoUrl : "/path-to-IC-logo.png",
        };

        games.push({
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

    return games;
}
