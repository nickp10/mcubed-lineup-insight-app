import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Component, ViewChild } from "@angular/core";
import { ContestsService } from "../../services/contests.service";
import { IContest, IGame, IPlayer, IContestPosition } from "../../interfaces";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/groupBy";
import "rxjs/add/operator/mergeMap";
import { MatSidenav } from "@angular/material";

@Component({
    selector: "app-players",
    styleUrls: ["players.scss"],
    templateUrl: "players.html"
})
export class PlayersPage {
    contestID$: Observable<string>;
    contest$: Observable<IContest>;
    contestPositions$: Observable<IContestPosition[]>;
    games$: Observable<IGame[]>;
    players$: Observable<IPlayer[]>;
    selectedPosition$: Observable<IContestPosition>;
    selectedPlayers$: Observable<IPlayer[]>;
    userSelectedPosition$: BehaviorSubject<IContestPosition>;

    @ViewChild("positionNav") positionNav: MatSidenav;

    constructor(private activatedRoute: ActivatedRoute, private contestsService: ContestsService) {
        this.contestID$ = this.activatedRoute.params.map(p => <string>p.id);
        this.contest$ = this.contestID$.mergeMap(contestID => {
            return this.contestsService.getContests().map(contests => {
                return contests.find(c => c.ID === contestID);
            });
        });
        this.contestPositions$ = this.contest$.map(contest => this.distinctContestPositions(contest.positions));
        this.games$ = this.contest$.map(contest => contest.games);
        this.players$ = this.games$.map(games => games
            .map(game => game.awayTeam.players.concat(game.homeTeam.players))
            .reduce((playersA, playersB) => playersA.concat(playersB))
        );
        this.userSelectedPosition$ = new BehaviorSubject<IContestPosition>(undefined);
        this.selectedPosition$ = this.userSelectedPosition$.combineLatest(this.contestPositions$, (userPosition, contestPositions) => {
            return userPosition || contestPositions[0];
        });
        this.selectedPlayers$ = this.selectedPosition$.combineLatest(this.players$, (selectedPosition, players) => {
            return this.sortPlayers(this.filterPlayersForPosition(selectedPosition, players));
        });
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

    sortPlayers(players: IPlayer[]): IPlayer[] {
        return players.sort((playerA, playerB) => {
            const salarySort = playerB.salary - playerA.salary;
            if (salarySort === 0) {
                return playerA.name.localeCompare(playerB.name);
            } else {
                return salarySort;
            }
        });
    }

    setSelectedPosition(position: IContestPosition): void {
        this.userSelectedPosition$.next(position);
        this.positionNav.close();
    }
}
