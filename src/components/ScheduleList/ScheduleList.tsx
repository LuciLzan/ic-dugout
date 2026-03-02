import {Game} from "@/app/api/schedule/route";
import {useEffect, useState} from "react";



export default function ScheduleList(props:{include:string[]}) {
    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

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
        <div>
            <h2>Softball Schedule</h2>
            <ul>
                {games.map((game, idx) => {
                    const isHome = game.home_team.name == "Illinois College"
                    const isWin = (game.details.home_score != undefined && game.details.away_score != undefined)?(isHome?game.details.home_score-game.details.away_score>0:game.details.home_score-game.details.away_score<0):false;
                    return(
                    <li key={idx}>
                        <div>
                            <p>
                                <strong>Date:</strong> {game.date}
                            </p>
                            <p>
                                <strong>Time:</strong> {game.time}
                            </p>
                            <p>
                                <strong>{game.away_team.name}</strong> at <strong>{game.home_team.name}</strong>
                            </p>
                            <p>
                                <strong>Location:</strong> {game.location}
                            </p>
                        </div>
                        {(game.details.status === "finished")&&
                            <div>
                                <p>
                                    <strong>{game.details.home_score}-{game.details.away_score}</strong> {isWin?"W":"L"}
                                </p>
                            </div>}
                        {(game.details.status === "live")&&
                            <p>
                                <strong>{game.details.home_score}-{game.details.away_score}</strong>
                            </p>}
                        {(game.details.status === "upcoming")&&
                            <div>
                                {
                                    //Maybe something here?
                                }
                            </div>
                        }
                        <hr />
                    </li>
                )})}
            </ul>
        </div>
    );
}