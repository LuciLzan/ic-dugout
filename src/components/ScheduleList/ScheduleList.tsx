import {Game} from "@/app/api/schedule/route";
import {useEffect, useState} from "react";
import {Image} from "next/dist/client/image-component";

import "./ScheduleList.css"


interface Assets {
    opponentLogo: string;
}

export default function ScheduleList(props:{include:string[]}) {
    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [assets,setAssets] = useState<Assets>({
        opponentLogo: "https://placehold.co/80",
    });

    useEffect(() => {
        async function fetchGames() {
            try {
                const res = await fetch("/api/schedule"); // your API route
                if (!res.ok) {
                    throw new Error("Failed to fetch games");
                }
                const data: Game[] = await res.json();

                const filteredData = data.filter((value) => {
                    return props.include.indexOf(value.details.status) != -1
                })

                setGames(filteredData);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchGames();
    }, []);

    if (isLoading) return <p>Loading schedule...</p>;
    if (!games || games.length === 0) return <p>No games available.</p>;

    return (
        <div className={"schedule-list"}>

            <ul className={"schedule-list"}>
                {games.map((game, idx) => {
                    const isHome = game.home_team.name == "Illinois College"
                    const isWin = (game.details.home_score != undefined && game.details.away_score != undefined)?(isHome?game.details.home_score-game.details.away_score>0:game.details.home_score-game.details.away_score<0):false;
                    return(
                    <li className={"schedule-list-item"} key={idx}>
                        <div className={"schedule-opponent-logo"}>
                            <Image src={assets.opponentLogo}  alt={game.away_team.name} width={80} height={80} unoptimized={true} />
                            <p className={"schedule-opponent-record"}>{game.away_team.record.wins}-{game.away_team.record.losses}</p>
                        </div>
                        <div className={"schedule-game-content"}>
                            <div className={"schedule-game-info-box"} >
                                <div className={"schedule-game-name"}>
                                    <strong>{game.away_team.name}</strong> at <strong>{game.home_team.name}</strong>
                                </div>
                                <div className={"schedule-game-dtl"}>
                                    {game.date} @ {game.time}, {game.location}
                                </div>
                            </div>
                            <div className={"schedule-game-details-box"}>
                                {(game.details.status === "finished")&&
                                    <>
                                        <p className={"schedule-details-badge final-badge"}>Final</p>
                                        <p className={`schedule-game-details-score ${isWin ? "win" : "loss"}`}>
                                            <strong >{game.details.home_score}-{game.details.away_score}</strong> {isWin?"W":"L"}
                                        </p>
                                    </>
                                }
                                {(game.details.status === "live")&&
                                    <>
                                        <p className={"schedule-details-badge live-badge"}>Live</p>
                                        <p className={"schedule-game-details-score"}>
                                            <strong>{game.details.home_score}-{game.details.away_score}</strong>
                                        </p>
                                    </>}
                                {(game.details.status === "upcoming")&&
                                    <div>
                                        <>
                                            <p className={"schedule-details-badge upcoming-badge"}>Upcoming</p>
                                        </>
                                    </div>
                                }
                            </div>
                        </div>
                        <hr />
                    </li>
                )})}
            </ul>
        </div>
    );
}