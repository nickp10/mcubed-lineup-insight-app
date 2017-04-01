import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ContestsService } from '../../services/contests.service';
import { IContest, IPlayer } from '../../interfaces';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/zip';

@Component({
	selector: 'players',
	templateUrl: 'players.html'
})
export class PlayersPage {
	contestID: Observable<string>;
	contest: Observable<IContest>;
	players: Observable<IPlayer[]>;

	constructor(private activatedRoute: ActivatedRoute, private contestsService: ContestsService) {
		this.contestID = activatedRoute.params.map(p => <string>p.id);
		this.contest = this.contestID.zip(contestsService.getContests(), (v1, v2) => {
			return {
				id: v1,
				contests: v2
			};
		}).map(values => values.contests.find((c) => c.ID === values.id));
		this.players = this.contest.map(c => c.games[0].awayTeam.players);
	}
}
