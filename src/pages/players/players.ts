import { ActivatedRoute } from "@angular/router";
import { Component, ViewChild } from "@angular/core";
import { ContestsService } from "../../services/contests.service";
import { IContest, IGame, IPlayer, IPositionPlayerGroup, ITeam, IContestPosition } from "../../interfaces";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/groupBy";
import "rxjs/add/operator/mergeMap";
import { GroupedObservable } from "rxjs";

@Component({
    selector: "app-players",
    styleUrls: ["players.scss"],
    templateUrl: "players.html"
})
export class PlayersPage {
    contestID: Observable<string>;
    contest: Observable<IContest>;
    contestPositions: Observable<IContestPosition[]>;
    games: Observable<IGame[]>;
    players: Observable<IPlayer[]>;
    selectedPosition: Observable<IContestPosition>;

    constructor(private activatedRoute: ActivatedRoute, private contestsService: ContestsService) {
        this.contestID = this.activatedRoute.params.map(p => <string>p.id);
        this.contest = this.contestID.mergeMap(contestID => {
            return this.contestsService.getContests().map(contests => {
                return contests.find(c => c.ID === contestID);
            });
        });
        this.contestPositions = this.contest.map(contest => this.distinctContestPositions(contest.positions));
        this.games = this.contest.map(contest => contest.games);
        this.players = this.games.map(games => games
            .map(game => game.awayTeam.players.concat(game.homeTeam.players))
            .reduce((playersA, playersB) => playersA.concat(playersB))
        );
    }

    distinctContestPositions(positions: IContestPosition[]): IContestPosition[] {
        const distinctPositions: IContestPosition[] = [];
        if (positions) {
            const map = new Map<string, boolean>();
            for (const position of positions) {
                if (!map.has(position.label)) {
                    map.set(position.label, true);
                    distinctPositions.push(position);
                }
            }
        }
        return distinctPositions;
    }

    filterPlayersForPosition(position: IContestPosition, players: IPlayer[]): IPlayer[] {
        const filteredPlayers: IPlayer[] = [];
        if (position && position.eligiblePlayerPositions) {
            for (const player of players) {
                if (position.eligiblePlayerPositions.indexOf(player.position) > -1) {
                    filteredPlayers.push(player);
                }
            }
        }
        return filteredPlayers;
    }
}
