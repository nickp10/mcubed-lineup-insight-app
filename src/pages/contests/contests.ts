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
}
