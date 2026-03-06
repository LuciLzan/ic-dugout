import leven from "leven"


export async function getSchoolLogo(name:string):Promise<string> {

    let repo = await findSchoolRepo(name)

    if(!repo){return "https://placehold.co/80";}

    return `https://ncaa-api.henrygd.me/logo/${repo.slug}.svg`



}


export interface Game {
    gameID: string;
    title: string;
    url: string;

    startDate: string;
    startTime: string;
    startTimeEpoch: string;

    gameState: string;
    finalMessage: string;
    currentPeriod: string;
    contestClock: string;

    bracketRound: string;
    bracketId: string;
    bracketRegion: string;

    contestName: string;
    network: string;
    videoState: string;

    liveVideoEnabled: boolean;

    away: {
        score: string;
        winner: boolean;
        seed: string;
        description: string;
        rank: string;
        names: {
            char6: string;
            short: string;
            seo: string;
            full: string;
        };
        conferences: {
            conferenceName: string;
            conferenceSeo: string;
        }[];
    };

    home: {
        score: string;
        winner: boolean;
        seed: string;
        description: string;
        rank: string;
        names: {
            char6: string;
            short: string;
            seo: string;
            full: string;
        };
        conferences: {
            conferenceName: string;
            conferenceSeo: string;
        }[];
    };
}

async function getGamesByDate(timestamp:Date) {
    "use cache"
    return await fetch(`https://ncaa-api.henrygd.me/scoreboard/softball/d3/2026/${timestamp.getMonth()}/${timestamp.getDay()}/mwc`).then(res => res.json()).catch(err => null);
}

export async function getGameIDByName(timestamp:Date):Promise<number> {
    "use cache"
    let allGames = await getGamesByDate(timestamp)
    if(!allGames){return 0}



    let game = (allGames as {games: Game[]}).games.find(game=> {
        if(Number.parseInt(game.startTimeEpoch,10) != Math.floor(timestamp.getTime()/1000)){return false}
        if(game.home.names.seo=="illinois-col" || game.away.names.seo=="illinois-col"){return true}
    });

    return game?Number.parseInt(game.gameID,10):0;

}


async function getSlugMappings() {
    "use cache"
    const slugMappingsRaw= await fetch("https://ncaa-api.henrygd.me/schools-index").then(res => res.json()).catch((err) => null);
    if(!slugMappingsRaw){return null}
    return  slugMappingsRaw as {slug:string,name:string,long:string}[];
}

export async function findSchoolRepo(name:string):Promise<{slug:string,name:string,long:string}|null> {
    "use cache"

    const slugMappings = await getSlugMappings();
    if(!slugMappings){return null}


    const map:any = {}
    const strings = []
    for (let i = 0; i < slugMappings.length; i++) {
        let school = slugMappings[i];
        if(school.name){map[school.name]=i;strings.push(school.name)}
        if(school.long){map[school.long]=i;strings.push(school.long)}
        if(school.slug){map[school.slug]=i;strings.push(school.slug)}
    }

    let s = strings.sort((a,b) => leven(name,a) - leven(name,b))[0];
    if(!s) return null

    return slugMappings[map[s.toString()] as number]
}


