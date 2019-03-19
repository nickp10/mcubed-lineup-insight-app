export interface IContest {
    contestType: ContestType;
    games?: IGame[];
    ID: string;
    label: string;
    maxPlayersPerTeam?: number;
    maxSalary?: number;
    playerDataLastUpdateTime?: Date;
    playerDataNextUpdateTime?: Date;
    positions?: IContestPosition[];
    sport: Sport;
    startTime?: Date;
}

export interface IContestPosition {
    eligiblePlayerPositions: string[];
    label: string;
}

export interface IGame {
    awayTeam: ITeam;
    homeTeam: ITeam;
    startTime: Date;
}

export interface ITeam {
    code: string;
    fullName: string;
    players?: IPlayer[];
}

export interface IPlayer {
    battingOrder?: string;
    ID?: string;
    injury?: IPlayerInjury;
    isPlaying?: boolean;
    isProbablePitcher?: boolean;
    isStarter?: boolean;
    likeability?: number;
    name: string;
    newsStatus?: NewsStatus;
    position?: string;
    projectedPointsPerDollar?: number;
    projectedCeiling?: number;
    projectedFloor?: number;
    projectedPoints?: number;
    recentAveragePoints?: number;
    salary: number;
    seasonAveragePoints?: number;
    stats?: IPlayerStats[];
    team: string;
}

export interface IPlayerInjury {
    display: string;
    injuryType: InjuryType;
}

export interface IPlayerStats {
    source: string;
    projectedCeiling?: number;
    projectedFloor?: number;
    projectedPoints?: number;
    recentAveragePoints?: number;
    seasonAveragePoints?: number;
}

export enum ContestType {
    DraftKings = 1,
    FanDuel,
    Yahoo
}

export enum InjuryType {
    Out = 1,
    Possible,
    Probable
}

export enum NewsStatus {
    Breaking = 1,
    Recent,
    None
}

export enum Sport {
    MLB = 1,
    NBA,
    NFL,
    NHL
}
