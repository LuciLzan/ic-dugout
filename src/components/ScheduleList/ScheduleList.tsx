import {Game} from "@/app/api/schedule/route";
import {useEffect, useState} from "react";
import {Image} from "next/dist/client/image-component";

import "./ScheduleList.css"



export default function ScheduleList(props:{display:string[]}) {
    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);


    useEffect(() => {
        async function fetchGames() {
            try {
                const res = await fetch("/api/schedule"); // your API route
                if (!res.ok) {
                    setIsError(true);
                    return;
                }
                const data: Game[] = await res.json();

                const filteredData = data.filter((value) => {
                    return props.display.indexOf(value.details.status) != -1
                })

                setGames(filteredData);
            } catch (err) {
                setIsError(true)
            } finally {
                setIsLoading(false);
            }
        }
        fetchGames();
    }, []);

    let content = <></>

    if (isLoading) content = <><p>Loading schedule...</p></>
    else if (isError) content = <><p>Error loading games</p></>
    else if (!games || games.length === 0) content = <><p>No games available.</p></>
    else content = (<>
            {games.map((game, idx) => {
                const isHome = game.home_team.name == "Illinois College"
                const isWin = (game.details.home_score != undefined && game.details.away_score != undefined)?(isHome?game.details.home_score-game.details.away_score>0:game.details.home_score-game.details.away_score<0):false;
                return(
                    <li className={"schedule-list-item"} key={idx}>
                        <div className={"schedule-opponent-logo"}>
                            {isHome?
                                <Image src={game.away_team.logo}  alt={game.away_team.name} width={80} height={80} unoptimized={true} />:
                                <Image src={game.home_team.logo}  alt={game.home_team.name} width={80} height={80} unoptimized={true} />
                            }

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
        </>)
    return (
        <div>
            <h2 className={"schedule-title"}>Games</h2>
            <ul className={"schedule-list"}>
                {content}
            </ul>
        </div>
    );
}