import { Component } from '@angular/core';
import { ContestsService } from '../../services/contests.service';
import { IContest } from '../../interfaces';
import { Router } from '@angular/router';

@Component({
	selector: 'contests',
	templateUrl: 'contests.html'
})
export class ContestsPage {
	contests: IContest[];

	constructor(private contestsService: ContestsService, private router: Router) {
		this.contestsService.getContests().subscribe(
			c => this.contests = c,
			e => console.error(e)
		);
	}

	showPlayers(contest: IContest): void {
		this.router.navigate(["/players", contest.ID]);
	}

	formatTitle(contest: IContest): string {
		let title = contest.sport + "&nbsp;" + contest.contestType;
		if (contest.label) {
			title += "&nbsp;" + contest.label.replace(/\-/g, "&#8209;").replace(/\s/g, "&nbsp;");
		}
		return title;
	}
}
