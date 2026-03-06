'use client';

import {useEffect, useState} from "react";

import {GameStats} from "@/app/api/game/[id]/route";
import {Image} from "next/dist/client/image-component";

import "./Score.css"

interface Assets {
    homeLogo: string;
    awayLogo: string;
}

import { use } from 'react'

export default function Scores({
                                         params,
                                     }: {
    params: Promise<{id: number }>
}) {
    const { id } = use(params)
    const [game, setGame] = useState<GameStats|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);




    useEffect(() => {
        async function fetchGames() {
            try {
                const res = await fetch(`/api/game/${id}`); // your API route
                if (!res.ok) {
                    setIsError(true);
                    return;
                }
                const data: GameStats = await res.json();
                setGame(data);
            } catch (err) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchGames();
    }, []);


    let content = <></>;

    if (isLoading) {content = (<p>Loading game...</p>)}
    else if (isError || game == null) {content = (<p>Error fetching game with ID {id}</p>)}
    else {
        content = (
            <>
                <h1 className={"game-info-title"}><strong>{game.away_team.name}</strong> at <strong>{game.home_team.name}</strong></h1>
                <h2 className={"game-info-dtl"}>{game.date} @ {game.time}</h2>
                <div className={"game-info-main-graphic"}>
                    <div className={"game-team-container"}>
                        <Image src={game.away_team.logo}  alt={game.away_team.name} width={80} height={80} unoptimized={true} />
                        <p>{game.away_team.name}</p>
                        <p className={"game-info-score"}>{game.away_score}</p>
                    </div>
                    <p className={"team-separator"}>-</p>
                    <div className={"game-team-container"}>
                        <Image src={game.home_team.logo}  alt={game.home_team.name} width={80} height={80} unoptimized={true} />
                        <p>{game.home_team.name}</p>
                        <p className={"game-info-score"}>{game.home_score}</p>
                    </div>
                </div>
                <table className="game-info-box-score" border={1} cellPadding={4}>
                    <thead className="game-info-box-score-header">
                    <tr>
                        <th className="game-info-box-score-team-header">Team</th>
                        {game.details.box_score.map((_, i) => (
                            <th key={i} className="game-info-box-score-inning-header">{i + 1}</th>
                        ))}
                        <th className="game-info-box-score-total-header">Total</th>
                    </tr>
                    </thead>
                    <tbody className="game-info-box-score-body">
                    <tr className="game-info-box-score-row home-team-row">
                        <td className="game-info-box-score-team-name">{game.home_team.name}</td>
                        {game.details.box_score.map((inning, i) => (
                            <td key={i} className="game-info-box-score-inning">{inning.home_score}</td>
                        ))}
                        <td className="game-info-box-score-total">{game.home_score}</td>
                    </tr>
                    <tr className="game-info-box-score-row away-team-row">
                        <td className="game-info-box-score-team-name">{game.away_team.name}</td>
                        {game.details.box_score.map((inning, i) => (
                            <td key={i} className="game-info-box-score-inning">{inning.away_score}</td>
                        ))}
                        <td className="game-info-box-score-total">{game.away_score}</td>
                    </tr>
                    </tbody>
                </table>

                <div className={"game-info-play-by-play"}>
                    <h2>Play By Play</h2>
                    {game.details.play_by_play.map((inningPlays, inningIdx) => (
                        <div key={inningIdx} className={"inning-container"}>
                            <h3>Inning {inningIdx + 1}</h3>
                            <ul className={"inning-plays"}>
                                {inningPlays.map((play, idx) => {
                                    const teamName =
                                        play.team_id == game.home_team.team_id //Needed == for some reason, idk why
                                            ? game.home_team.name
                                            : game.away_team.name;
                                    const scoreText =
                                        play.home_score !== null || play.away_score !== null
                                            ? ` (Score: ${play.home_score ?? game.home_score} - ${play.away_score ?? game.away_score})`
                                            : "";
                                    return (
                                        <li key={idx} className={"play-in-inning"}>
                                            <strong>{teamName}</strong> {play.text}
                                            {scoreText}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </>
        )
    }

    return (
    <div className={"game-info-page"}>
        <h2>Game Stats</h2>
        {content}
    </div>
    )
}
