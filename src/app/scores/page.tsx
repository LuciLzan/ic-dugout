'use client';

import {useEffect, useState} from "react";

import {GameStats} from "@/app/api/game/route";
import {Image} from "next/dist/client/image-component";

interface Assets {
    homeLogo: string;
    awayLogo: string;
}

export default function Scores() {
    const [game, setGame] = useState<GameStats|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [assets,setAssets] = useState<Assets>({
        homeLogo: "https://placehold.co/80",
        awayLogo: "https://placehold.co/80"
    });

    useEffect(() => {
        async function fetchGames() {
            try {
                const res = await fetch("/api/game"); // your API route
                if (!res.ok) {
                    throw new Error("Failed to fetch game");
                }
                const data: GameStats = await res.json();
                setGame(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchGames();
    }, []);


    if(isLoading) {return <>Loading...</>}


    return game?(
        <div>
            <h1>Softball Game</h1>
            <p>
                <strong>Date:</strong> {game.date} <strong>Time:</strong> {game.time}
            </p>
            <div>
                <div>
                    <Image src={assets.homeLogo}  alt={game.home_team.name} width={80} height={80} onError={() => ("/placeholder.png")} unoptimized={true} />
                    <p>{game.home_team.name}</p>
                    <p>Score: {game.home_score}</p>
                </div>
                <div>
                    <Image src={assets.awayLogo}  alt={game.away_team.name} width={80} height={80} unoptimized={true} />
                    <p>{game.away_team.name}</p>
                    <p>Score: {game.away_score}</p>
                </div>
            </div>
            <h2>Box Score</h2>
            <table border={1} cellPadding={4}>
                <thead>
                <tr>
                    <th>Inning</th>
                    <th>{game.home_team.name}</th>
                    <th>{game.away_team.name}</th>
                </tr>
                </thead>
                <tbody>
                {game.details.box_score.map((inning, idx) => (
                    <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{inning.home_score}</td>
                        <td>{inning.away_score}</td>
                    </tr>
                ))}
                <tr>
                    <td>Total</td>
                    <td>{game.home_score}</td>
                    <td>{game.away_score}</td>
                </tr>
                </tbody>
            </table>

            <h2>Play By Play</h2>
            {game.details.play_by_play.map((inningPlays, inningIdx) => (
                <div key={inningIdx}>
                    <h3>Inning {inningIdx + 1}</h3>
                    <ul>
                        {inningPlays.map((play, idx) => {
                            const teamName =
                                play.team_id === game.home_team.team_id
                                    ? game.home_team.name
                                    : game.away_team.name;
                            const scoreText =
                                play.home_score !== null || play.away_score !== null
                                    ? ` (Score: ${play.home_score ?? game.home_score} - ${play.away_score ?? game.away_score})`
                                    : "";
                            return (
                                <li key={idx}>
                                    <strong>{teamName}:</strong> {play.text}
                                    {scoreText}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    ):(<>Unable to load game</>);
}
