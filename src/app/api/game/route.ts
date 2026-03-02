import {NextResponse} from "next/dist/server/web/spec-extension/response";

export async function GET() {
    return NextResponse.json(icSoftballGame);
}

export interface GameStats {
    date: string // YYYY/MM/DD
    time: string // HH:MM AM/PM
    home_team: {
        name: string
        logo: string,
        team_id:number
    }
    away_team: {
        name: string
        logo: string,
        team_id:number
    }
    home_score: number
    away_score: number
    game_status: "upcoming" | "live" | "finished"
    details: {
        box_score:{
            home_score:number,
            away_score:number,
        }[]//For each period
        play_by_play: {
            team_id:number, //Same in team obj
            text: string, //(e.g, "Megan singles to RF, Olsen Scores)
            home_score:number|null, //ONLY NON-NULL IF SOMEONE SCORED, if so its new score
            away_score:number|null, //ONLY NON-NULL IF SOMEONE SCORED, if so its new score
        }[][]//For Each Period, for each
    }
}

export const icSoftballGame: GameStats = {
    date: "2026/03/12",
    time: "1:00 PM",
    home_team: {
        name: "Illinois College",
        logo: "https://example.com/logos/illinois-college.png",
        team_id: 1001,
    },
    away_team: {
        name: "Monmouth College",
        logo: "https://example.com/logos/monmouth.png",
        team_id: 1002,
    },
    home_score: 5,
    away_score: 3,
    game_status: "finished",
    details: {
        box_score: [
            { home_score: 1, away_score: 0 }, // 1st inning
            { home_score: 0, away_score: 1 }, // 2nd inning
            { home_score: 1, away_score: 0 }, // 3rd inning
            { home_score: 0, away_score: 0 }, // 4th inning
            { home_score: 2, away_score: 1 }, // 5th inning
            { home_score: 0, away_score: 1 }, // 6th inning
            { home_score: 1, away_score: 0 }, // 7th inning
        ],
        play_by_play: [
            // 1st inning
            [
                { team_id: 1001, text: "S. Johnson singles to center.", home_score: null, away_score: null },
                { team_id: 1001, text: "A. Miller doubles, S. Johnson scores.", home_score: 1, away_score: 0 },
                { team_id: 1001, text: "L. Thompson strikes out.", home_score: null, away_score: null },
                { team_id: 1001, text: "K. Lee flied out to right field.", home_score: null, away_score: null },
                { team_id: 1002, text: "J. Adams grounds out to 2B.", home_score: null, away_score: null },
                { team_id: 1002, text: "M. Smith flies out to left field.", home_score: null, away_score: null },
                { team_id: 1002, text: "R. Davis strikes out.", home_score: null, away_score: null },
            ],
            // 2nd inning
            [
                { team_id: 1001, text: "A. Miller strikes out.", home_score: null, away_score: null },
                { team_id: 1001, text: "L. Thompson walks.", home_score: null, away_score: null },
                { team_id: 1001, text: "K. Lee grounds out to short.", home_score: null, away_score: null },
                { team_id: 1002, text: "J. Adams singles to left.", home_score: null, away_score: null },
                { team_id: 1002, text: "M. Smith doubles, J. Adams scores.", home_score: 1, away_score: 1 },
                { team_id: 1002, text: "R. Davis strikes out.", home_score: null, away_score: null },
                { team_id: 1002, text: "B. Clark flies out to right.", home_score: null, away_score: null },
            ],
            // 3rd inning
            [
                { team_id: 1001, text: "S. Johnson doubles to right.", home_score: null, away_score: null },
                { team_id: 1001, text: "A. Miller singles, S. Johnson scores.", home_score: 2, away_score: 1 },
                { team_id: 1001, text: "L. Thompson grounds out to short.", home_score: null, away_score: null },
                { team_id: 1001, text: "K. Lee strikes out.", home_score: null, away_score: null },
                { team_id: 1002, text: "J. Adams pops out to 3B.", home_score: null, away_score: null },
                { team_id: 1002, text: "M. Smith grounds out to pitcher.", home_score: null, away_score: null },
                { team_id: 1002, text: "R. Davis flies out to center.", home_score: null, away_score: null },
            ],
            // 4th inning
            [
                { team_id: 1001, text: "S. Johnson strikes out.", home_score: null, away_score: null },
                { team_id: 1001, text: "A. Miller flies out to left.", home_score: null, away_score: null },
                { team_id: 1001, text: "L. Thompson grounds out to 2B.", home_score: null, away_score: null },
                { team_id: 1002, text: "J. Adams strikes out.", home_score: null, away_score: null },
                { team_id: 1002, text: "M. Smith flies out to right.", home_score: null, away_score: null },
                { team_id: 1002, text: "R. Davis grounds out to 1B.", home_score: null, away_score: null },
            ],
            // 5th inning
            [
                { team_id: 1001, text: "S. Johnson singles.", home_score: null, away_score: null },
                { team_id: 1001, text: "A. Miller doubles, S. Johnson scores.", home_score: 3, away_score: 1 },
                { team_id: 1001, text: "L. Thompson singles, A. Miller scores.", home_score: 4, away_score: 1 },
                { team_id: 1001, text: "K. Lee strikes out.", home_score: null, away_score: null },
                { team_id: 1002, text: "J. Adams singles.", home_score: null, away_score: null },
                { team_id: 1002, text: "M. Smith doubles, J. Adams scores.", home_score: 4, away_score: 2 },
                { team_id: 1002, text: "R. Davis grounds out.", home_score: null, away_score: null },
            ],
            // 6th inning
            [
                { team_id: 1001, text: "S. Johnson flies out.", home_score: null, away_score: null },
                { team_id: 1001, text: "A. Miller strikes out.", home_score: null, away_score: null },
                { team_id: 1001, text: "L. Thompson grounds out.", home_score: null, away_score: null },
                { team_id: 1002, text: "J. Adams singles.", home_score: null, away_score: null },
                { team_id: 1002, text: "M. Smith flies out.", home_score: null, away_score: null },
                { team_id: 1002, text: "R. Davis doubles, J. Adams scores.", home_score: 4, away_score: 3 },
            ],
            // 7th inning
            [
                { team_id: 1001, text: "S. Johnson singles.", home_score: null, away_score: null },
                { team_id: 1001, text: "A. Miller doubles, S. Johnson scores.", home_score: 5, away_score: 3 },
                { team_id: 1001, text: "L. Thompson grounds out.", home_score: null, away_score: null },
                { team_id: 1001, text: "K. Lee flies out.", home_score: null, away_score: null },
                { team_id: 1002, text: "J. Adams strikes out.", home_score: null, away_score: null },
                { team_id: 1002, text: "M. Smith flies out.", home_score: null, away_score: null },
                { team_id: 1002, text: "R. Davis grounds out.", home_score: null, away_score: null },
            ],
        ],
    },
};