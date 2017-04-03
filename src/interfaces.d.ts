export interface IContest {
	contestType: string;
	games: IGame[];
	ID: string;
	label: string;
	maxPlayersPerTeam: number;
	maxSalaray: number;
	playerDataLastUpdateTime: Date;
	playerDataNextUpdateTime: Date;
	positions: string[];
	sport: string;
	startTime: Date;
}

export interface IGame {
	awayTeam: ITeam;
	homeTeam: ITeam;
	startTime: Date;
}

export interface ITeam {
	code: string;
	fullName: string;
	players: IPlayer[];
}

export interface IPlayer {
	battingOrder: string;
	name: string;
	newStatus: string;
	playing: boolean;
	position: string;
	probablePitcher: boolean;
	projectedPointsPerDollar: number;
	salary: number;
	seasonAveragePoints: number;
	starter: boolean;
	stats: IPlayerStats[];
	team: string;
}

export interface IPlayerStats {
	source: string;
	projectedCeiling?: number;
	projectedFloor?: number;
	projectedPoints?: number;
	recentAveragePoints?: number;
	seasonAveragePoints?: number;
}

export interface IPositionPlayerGroup {
	players: IPlayer[];
	position: string;
}
