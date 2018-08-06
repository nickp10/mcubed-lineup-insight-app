import { ActivatedRoute } from "@angular/router";
import { Component, ViewChild } from "@angular/core";
import { ContestsService } from "../../services/contests.service";
import { IContest, IPositionPlayerGroup, ITeam } from "../../interfaces";
import { Observable } from "rxjs/Observable";
import { Segment } from "@ionic/angular";
import "rxjs/add/observable/zip";

@Component({
    selector: "app-players",
    templateUrl: "players.html"
})
export class PlayersPage {
    contestID: Observable<string>;
    contest: Observable<IContest>;
    positionPlayerGroups: Observable<IPositionPlayerGroup[]>;
    selectedPosition: string;

    @ViewChild(Segment)
    private segment: Segment;

    constructor(private activatedRoute: ActivatedRoute, private contestsService: ContestsService) {
        this.contestID = this.activatedRoute.params.map(p => <string>p.id);
        this.contest = Observable.zip(this.contestID, this.contestsService.getContests(), this.findFirstMatchingContest);
        this.positionPlayerGroups = this.contest.map(this.computePositionPlayers, this);
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
        );
    }

    findFirstMatchingContest(id: string, contests: IContest[]): IContest {
        for (let i = 0; i < contests.length; i++) {
            const contest = contests[i];
            if (contest.ID === id) {
                return contest;
            }
        }
        return undefined;
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
        positionPlayerGroups.sort((g1, g2) => {
            const i1 = contest.positions.indexOf(g1.position);
            const i2 = contest.positions.indexOf(g2.position);
            return i1 - i2;
        });
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
