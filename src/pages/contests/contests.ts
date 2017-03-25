import { Component } from '@angular/core';
import { ContestsService } from "../../services/contests.service";
import { IContest } from "../../interfaces";

@Component({
	selector: 'contests',
	templateUrl: 'contests.html'
})
export class ContestsPage {
	contests: IContest[];

	constructor(private contestsService: ContestsService) {
		contestsService.getContests().subscribe(
			c => this.contests = c,
			e => console.error(e)
		);
	}

	showPlayers(contest: IContest): void {
		console.log("Clicked " + contest.ID);
	}

	formatTitle(contest: IContest): string {
		let title = contest.sport + "&nbsp;" + contest.contestType;
		if (contest.label) {
			title += "&nbsp;" + contest.label.replace(/\-/g, "&#8209;").replace(/\s/g, "&nbsp;");
		}
		return title;
	}
}
