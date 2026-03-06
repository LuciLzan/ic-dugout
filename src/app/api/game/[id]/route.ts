import {NextResponse} from "next/dist/server/web/spec-extension/response";
import {getSchoolLogo} from "@/services/NCAAApi";


export async function GET(
    request: Request,
    { params }: RouteContext<'/api/game/[id]'>
) {
    const { id } = await params
    const result = await getGameInformation(Number.parseInt(id, 10))

    return NextResponse.json(result);
}




interface rawGameInfo {
    contests: {
        startTimeEpoch: number
        location: string|null
        gameState: string, //F is finished
        startTime: string,
        teams: {
            isHome: boolean
            teamId: number
            nameFull:string
            score:number
            record:string
        }[]
        //For the future, live stats
        stats: {
            balls: number
            outs: number,
            strikes: number,
            playerOnFirst: false,
            playerOnSecond: false,
            playerOnThird: false
        }
        linescores: {
            period: string,
            home: number,
            visit: number,
        }[]
    }[]
}

interface rawPlayByPlay {
    periods: {
        periodNumber: number,
        playbyplayStats: {
            teamId: number
            plays: {
                "playText": string
                "homeScore": number|null
                "visitorScore": number|null
            }[]
        }[]
    }[]
}
//6574374
export async function getGameInformation(gameID:number):Promise<GameStats|undefined> {
    //For image later
    const slugMappingsRaw= await fetch("https://ncaa-api.henrygd.me/schools-index").then(res => res.json()).catch((err) => null);
    const slugMappings = slugMappingsRaw as {slug:string,name:string,long:string}[];

    const gameInfoData  = await fetch(`https://ncaa-api.henrygd.me/game/${gameID}/`)
    const rawGamePlayByPlayData = await fetch(`https://ncaa-api.henrygd.me/game/${gameID}/play-by-play`)


    if(!gameInfoData.ok || !rawGamePlayByPlayData.ok){
        return undefined
    }

    const rootGameInfo = await gameInfoData.json() as rawGameInfo;
    const gameInfo = rootGameInfo.contests[0]
    const rawGamePlayByPlay = await rawGamePlayByPlayData.json() as rawPlayByPlay;





    interface Team {
        isHome: boolean
        teamId: number
        nameFull:string
        score:number
        record:string
    }



    let homeTeam:Team;
    let awayTeam:Team;
    if(gameInfo.teams.at(0)?.isHome) {
        homeTeam = gameInfo.teams.at(0) as Team;
        awayTeam = gameInfo.teams.at(1) as Team;
    }else {
        homeTeam = gameInfo.teams.at(1) as Team;
        awayTeam = gameInfo.teams.at(0) as Team;
    }
    const date = new Date(gameInfo.startTimeEpoch*1000).toDateString();

    const box_score = []
    const rawScores = gameInfo.linescores.filter(linescore => {return linescore.period.match(/\d/) != null})
    for(const entry of rawScores) {
        box_score.push({
            home_score: entry.home,
            away_score: entry.visit,
        });
    }

    let gameStatus:"upcoming"|"live"|"finished" = "upcoming"
    if(gameInfo.startTimeEpoch < Date.now()) {
        gameStatus = gameInfo.gameState == "F"?"finished":"live"
    }

    const playByPlay = []
    for(const period of rawGamePlayByPlay.periods) {
        const formattedPeriod = []
        for(const playContainer of period.playbyplayStats) {
            for(const play of playContainer.plays) {
                formattedPeriod.push({
                    team_id: playContainer.teamId,
                    text: play.playText,
                    home_score: play.homeScore,
                    away_score: play.visitorScore
                })
            }
        }
        playByPlay.push(formattedPeriod)
    }


    let homeLogo = await getSchoolLogo(homeTeam.nameFull)
    let awayLogo = await getSchoolLogo(awayTeam.nameFull)


    return {
        away_score: awayTeam.score,
        away_team: {
            name: awayTeam.nameFull,
            logo: awayLogo,
            team_id: awayTeam.teamId,
        },
        date: date,
        details: {
            box_score: box_score,
            play_by_play: playByPlay
        },
        game_status: gameStatus,
        home_score: homeTeam.score,
        home_team: {
            name: homeTeam.nameFull,
            logo: homeLogo,
            team_id: homeTeam.teamId,
        },
        time: gameInfo.startTime
    };
}

export interface GameStats {
    date: string
    time: string
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
