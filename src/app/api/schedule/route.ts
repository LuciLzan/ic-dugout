import {NextResponse} from "next/dist/server/web/spec-extension/response";


export async function GET() {
    return NextResponse.json(mockGames);
}

export interface Game {
    date: string;
    time: string;
    home_team: {
        name: string;
        record: {//Only up to that point
            wins: number;
            losses: number;
        }
        logo: string; //URL, to be checked
    }
    away_team: {
        name: string;
        record: {//Only up to that point
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

//AI Generated
export const mockGames: Game[] = [
    {
        date: "2026-03-01",
        time: "1:00 PM",
        home_team: {
            name: "Illinois College",
            record: { wins: 5, losses: 1 },
            logo: "https://example.com/logos/ic.png",
        },
        away_team: {
            name: "Monmouth College",
            record: { wins: 4, losses: 2 },
            logo: "https://example.com/logos/monmouth.png",
        },
        location: "Jacksonville, IL – Kamp Softball Field",
        details: {
            status: "finished",
            home_score: 7,
            away_score: 4,
        },
    },
    {
        date: "2026-03-03",
        time: "3:00 PM",
        home_team: {
            name: "Illinois College",
            record: { wins: 5, losses: 2 },
            logo: "https://example.com/logos/ic.png",
        },
        away_team: {
            name: "Grinnell College",
            record: { wins: 3, losses: 3 },
            logo: "https://example.com/logos/grinnell.png",
        },
        location: "Jacksonville, IL – Kamp Softball Field",
        details: {
            status: "finished",
            home_score: 2,
            away_score: 5,
        },
    },
    {
        date: "2026-03-05",
        time: "12:00 PM",
        home_team: {
            name: "Illinois College",
            record: { wins: 5, losses: 2 },
            logo: "https://example.com/logos/ic.png",
        },
        away_team: {
            name: "Illinois Wesleyan University",
            record: { wins: 4, losses: 2 },
            logo: "https://example.com/logos/iwu.png",
        },
        location: "Bloomington, IL – West Campus Field",
        details: {
            status: "finished",
            home_score: 6,
            away_score: 3,
        },
    },
    {
        date: "2026-03-08",
        time: "2:00 PM",
        home_team: {
            name: "Illinois College",
            record: { wins: 6, losses: 2 },
            logo: "https://example.com/logos/ic.png",
        },
        away_team: {
            name: "Cornell College",
            record: { wins: 2, losses: 4 },
            logo: "https://example.com/logos/cornell.png",
        },
        location: "Jacksonville, IL – Kamp Softball Field",
        details: {
            status: "live",
            home_score: 3,
            away_score: 1,
        },
    },
    {
        date: "2026-03-10",
        time: "1:00 PM",
        home_team: {
            name: "Illinois College",
            record: { wins: 6, losses: 2 },
            logo: "https://example.com/logos/ic.png",
        },
        away_team: {
            name: "Wartburg College",
            record: { wins: 3, losses: 3 },
            logo: "https://example.com/logos/wartburg.png",
        },
        location: "Waverly, IA – Alumni Field",
        details: {
            status: "upcoming",
        },
    },
    {
        date: "2026-03-12",
        time: "3:00 PM",
        home_team: {
            name: "Illinois College",
            record: { wins: 6, losses: 2 },
            logo: "https://example.com/logos/ic.png",
        },
        away_team: {
            name: "Knox College",
            record: { wins: 4, losses: 3 },
            logo: "https://example.com/logos/knox.png",
        },
        location: "Jacksonville, IL – Kamp Softball Field",
        details: {
            status: "upcoming",
        },
    },
    {
        date: "2026-03-15",
        time: "12:00 PM",
        home_team: {
            name: "Illinois College",
            record: { wins: 6, losses: 2 },
            logo: "https://example.com/logos/ic.png",
        },
        away_team: {
            name: "Beloit College",
            record: { wins: 3, losses: 4 },
            logo: "https://example.com/logos/beloit.png",
        },
        location: "Beloit, WI – Telfer Field",
        details: {
            status: "upcoming",
        },
    },
    {
        date: "2026-03-18",
        time: "2:30 PM",
        home_team: {
            name: "Illinois College",
            record: { wins: 6, losses: 2 },
            logo: "https://example.com/logos/ic.png",
        },
        away_team: {
            name: "Illinois College Alumni",
            record: { wins: 0, losses: 0 },
            logo: "https://example.com/logos/alumni.png",
        },
        location: "Jacksonville, IL – Kamp Softball Field",
        details: {
            status: "upcoming",
        },
    },
];