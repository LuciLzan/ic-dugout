
import {useEffect, useState} from "react";
import {Image} from "next/dist/client/image-component";

import "./ScheduleList.css"
import {Game} from "@/services/IllinoisCollegeAPI";
import Link from "next/link";



export default function ScheduleList(props:{display:string[],order?:string,showStats?:boolean}) {
    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    interface Stats {
        home_wins: number;
        home_losses: number;
        away_wins: number;
        away_losses: number;
        current_streak: number;
    }

    const [stats, setStats] = useState<Stats>({
        home_wins: 0,
        home_losses: 0,
        away_wins: 0,
        away_losses: 0,
        current_streak: 0,
    });


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

                if(props.order === "reversed") {
                    filteredData.reverse();
                }

                let temp_stats = {
                    home_wins: 0,
                    home_losses: 0,
                    away_wins: 0,
                    away_losses: 0,
                    current_streak: 0,
                }

                filteredData.forEach(game=> {
                    const isHome = game.home_team.name == "Illinois College"
                    const isWin = (game.details.home_score != undefined && game.details.away_score != undefined) ? (isHome ? game.details.home_score - game.details.away_score > 0 : game.details.home_score - game.details.away_score < 0) : false;
                    temp_stats = {
                        home_wins: temp_stats.home_wins + (isHome && isWin ? 1 : 0),
                        home_losses: temp_stats.home_losses + (isHome && !isWin ? 1 : 0),
                        away_wins: temp_stats.away_wins + (!isHome && isWin ? 1 : 0),
                        away_losses: temp_stats.away_losses + (!isHome && !isWin ? 1 : 0),
                        current_streak: isWin ? (temp_stats.current_streak <= 0 ? 1 : temp_stats.current_streak + 1) : (temp_stats.current_streak >= 0 ? -1 : temp_stats.current_streak - 1),
                    }
                })

                setStats(temp_stats)

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
    let statsBoard = <></>



    if (isLoading) {content = <><p>Loading games...</p></>;statsBoard=<thead className={"schedule-stats-header-container"}><tr><th>Loading stats...</th></tr></thead>}
    else if (isError) {content = <><p>Error loading games</p></>;statsBoard=<thead className={"schedule-stats-header-container"}><tr><th>Error loading stats</th></tr></thead>}
    else if (!games || games.length === 0){content = <><p>No games available.</p></>;statsBoard=<thead className={"schedule-stats-header-container"}><tr><th>No Stats Available</th></tr></thead>}
    else {
        content = (<>
            {games.map((game, idx) => {
                const isHome = game.home_team.name == "Illinois College"
                const isWin = (game.details.home_score != undefined && game.details.away_score != undefined) ? (isHome ? game.details.home_score - game.details.away_score > 0 : game.details.home_score - game.details.away_score < 0) : false;
                return (
                    <li key={idx}>
                        {new Date(game.unix_date).getTime() < Date.now() && game.id !== undefined ? (
                            <Link href={`/scores/${game.id}`} className={`schedule-list-item clickable`}>
                                <div className={"schedule-opponent-logo"}>
                                    {isHome ?
                                        <Image src={game.away_team.logo} alt={game.away_team.name} width={80}
                                               height={80} unoptimized={true}/> :
                                        <Image src={game.home_team.logo} alt={game.home_team.name} width={80}
                                               height={80} unoptimized={true}/>
                                    }

                                </div>
                                <div className={"schedule-game-content"}>
                                    <div className={"schedule-game-info-box"}>
                                        <div className={"schedule-game-name"}>
                                            <strong>{game.away_team.name}</strong> at <strong>{game.home_team.name}</strong>
                                        </div>
                                        <div className={"schedule-game-dtl"}>
                                            {game.date} @ {game.time}, {game.location}
                                        </div>
                                    </div>
                                    <div className={"schedule-game-details-box"}>
                                        {(game.details.status === "finished") &&
                                            <>
                                                <p className={"schedule-details-badge final-badge"}>Final</p>
                                                <p className={`schedule-game-details-score ${isWin ? "win" : "loss"}`}>
                                                    <strong>{game.details.home_score}-{game.details.away_score}</strong> {isWin ? "W" : "L"}
                                                </p>
                                            </>
                                        }
                                        {(game.details.status === "live") &&
                                            <>
                                                <p className={"schedule-details-badge live-badge"}>Live</p>
                                                <p className={"schedule-game-details-score"}>
                                                    <strong>{game.details.home_score}-{game.details.away_score}</strong>
                                                </p>
                                            </>}
                                        {(game.details.status === "upcoming") &&
                                            <div>
                                                <>
                                                    <p className={"schedule-details-badge upcoming-badge"}>Upcoming</p>
                                                </>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div className={`schedule-list-item`}>
                                <div className={"schedule-opponent-logo"}>
                                    {isHome ?
                                        <Image src={game.away_team.logo} alt={game.away_team.name} width={80}
                                               height={80} unoptimized={true}/> :
                                        <Image src={game.home_team.logo} alt={game.home_team.name} width={80}
                                               height={80} unoptimized={true}/>
                                    }

                                </div>
                                <div className={"schedule-game-content"}>
                                    <div className={"schedule-game-info-box"}>
                                        <div className={"schedule-game-name"}>
                                            <strong>{game.away_team.name}</strong> at <strong>{game.home_team.name}</strong>
                                        </div>
                                        <div className={"schedule-game-dtl"}>
                                            {game.date} @ {game.time}, {game.location}
                                        </div>
                                    </div>
                                    <div className={"schedule-game-details-box"}>
                                        {(game.details.status === "finished") &&
                                            <>
                                                <p className={"schedule-details-badge final-badge"}>Final</p>
                                                <p className={`schedule-game-details-score ${isWin ? "win" : "loss"}`}>
                                                    <strong>{game.details.home_score}-{game.details.away_score}</strong> {isWin ? "W" : "L"}
                                                </p>
                                            </>
                                        }
                                        {(game.details.status === "live") &&
                                            <>
                                                <p className={"schedule-details-badge live-badge"}>Live</p>
                                                <p className={"schedule-game-details-score"}>
                                                    <strong>{game.details.home_score}-{game.details.away_score}</strong>
                                                </p>
                                            </>}
                                        {(game.details.status === "upcoming") &&
                                            <div>
                                                <>
                                                    <p className={"schedule-details-badge upcoming-badge"}>Upcoming</p>
                                                </>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )}

                        <hr/>
                    </li>
                )
            })}
        </>)

        const overall_wl = (stats.home_wins+stats.away_wins)/(stats.home_losses+stats.away_losses)
        const home_wl = (stats.home_wins)/(stats.home_losses)
        const away_wl = (stats.away_wins)/(stats.away_losses)



        statsBoard = (
            <>
                <thead className={"schedule-stats-header-container"}>
                    <tr className={"schedule-stats-header-row"}>
                        <th className={"schedule-stats-header-entry"}>W/L (Overall)</th>
                        <th className={"schedule-stats-header-entry"}>W/L (Home)</th>
                        <th className={"schedule-stats-header-entry"}>W/L (Away)</th>
                        <th className={"schedule-stats-header-entry"}>Current Streak</th>
                    </tr>
                </thead>
                <tbody className={"schedule-stats-body-container"}>
                    <tr className={"schedule-stats-body-row"}>
                        <td className={`schedule-stats-body-data ${overall_wl > 0.66?"positive":overall_wl<0.5?"negative":"neutral"}`}>{Number.isNaN(overall_wl)?"N/A":overall_wl}</td>
                        <td className={`schedule-stats-body-data ${home_wl > 0.66?"positive":home_wl<0.5?"negative":"neutral"}`}>{Number.isNaN(home_wl)?"N/A":home_wl}</td>
                        <td className={`schedule-stats-body-data ${away_wl > 0.66 ? "positive" : away_wl < 0.5 ? "negative" : "neutral"}`}>{Number.isNaN(away_wl)?"N/A":away_wl}</td>
                        <td className={`schedule-stats-body-data ${stats.current_streak>0?"positive":stats.current_streak<0?"negative":"neutral"}`}>{stats.current_streak == 0? "N/A":((stats.current_streak>0?"W":"L")+Math.abs(stats.current_streak))}</td>
                    </tr>
                </tbody>
            </>
        )
    }
    return (
        <div>
            <h2 className={"schedule-title"}>Games</h2>
            {props.showStats&&
                <table className={"stats-table"}>
                    {statsBoard}
                </table>}
            <ul className={"schedule-list"}>
                {content}
            </ul>
        </div>
    );
}