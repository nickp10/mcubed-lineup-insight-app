import { ActivatedRoute } from "@angular/router";
import { Component, ViewChild } from "@angular/core";
import { ContestsService } from "../../services/contests.service";
import { IContest, IGame, IPlayer, IPositionPlayerGroup, ITeam } from "../../interfaces";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";

@Component({
    selector: "app-players",
    styleUrls: ["players.scss"],
    templateUrl: "players.html"
})
export class PlayersPage {
    contestID: Observable<string>;
    contest: Observable<IContest>;
    games: Observable<IGame[]>;
    players: Observable<IPlayer[]>;
    positionPlayerGroups: Observable<IPositionPlayerGroup[]>;
    selectedPosition: string;
    
    constructor(private activatedRoute: ActivatedRoute, private contestsService: ContestsService) {
        this.contestID = this.activatedRoute.params.map(p => <string>p.id);
        this.contest = this.contestID.mergeMap(contestID => {
            return this.contestsService.getContests().map(contests => {
                return contests.find(c => c.ID === contestID);
            });
        });
        this.games = this.contest.map(contest => contest.games);
        this.players = this.games.map(games => {
            return games.
                map(game => game.awayTeam.players.concat(game.homeTeam.players)).
                reduce((playersA, playersB) => playersA.concat(playersB))
        });
        /*this.positionPlayerGroups = this.contest.map(this.computePositionPlayers, this);
        this.positionPlayerGroups.subscribe(
            groups => {
                setTimeout(() => {
                    if (this.segment) {
                        // this.segment.ngAfterViewInit();
                    }
                    this.selectedPosition = groups[0].position;
                });
            },
            error => console.log(error)
        );*/
    }

    computePositionPlayers(contest: IContest): IPositionPlayerGroup[] {
        const positionPlayerGroupsMap: { [index: string]: IPositionPlayerGroup } = { };
        if (contest && contest.games) {
            for (let i = 0; i < contest.games.length; i++) {
                const game = contest.games[i];
                this.addPositionPlayers(positionPlayerGroupsMap, game.awayTeam);
                this.addPositionPlayers(positionPlayerGroupsMap, game.homeTeam);
            }
        }
        const positionPlayerGroups = Object.keys(positionPlayerGroupsMap).map((key) => positionPlayerGroupsMap[key]);
        /*positionPlayerGroups.sort((g1, g2) => {
            const i1 = contest.positions.indexOf(g1.position);
            const i2 = contest.positions.indexOf(g2.position);
            return i1 - i2;
        });*/
        return positionPlayerGroups;
    }

    addPositionPlayers(positionPlayerGroupsMap: { [index: string]: IPositionPlayerGroup }, team: ITeam): void {
        if (team && team.players) {
            for (let i = 0; i < team.players.length; i++) {
                const player = team.players[i];
                let positionPlayerGroup = positionPlayerGroupsMap[player.position];
                if (!positionPlayerGroup) {
                    positionPlayerGroup = {
                        players: [],
                        position: player.position
                    };
                    positionPlayerGroupsMap[player.position] = positionPlayerGroup;
                }
                positionPlayerGroup.players.push(player);
            }
        }
    }
}
