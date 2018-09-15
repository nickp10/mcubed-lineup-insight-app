import { Component } from "@angular/core";
import { ContestsService } from "../../services/contests.service";
import { IContest, Sport, ContestType } from "../../interfaces";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

@Component({
    selector: "app-contests",
    styleUrls: ["contests.scss"],
    templateUrl: "contests.html"
})
export class ContestsPage {
    contests: Observable<IContest[]>;

    constructor(private contestsService: ContestsService, private router: Router) {
        this.contests = this.contestsService.getContests();
    }

    showPlayers(contest: IContest): void {
        this.router.navigate(["/players", contest.ID]);
    }

    enumToString(value: any, enumerator: { [index: string]: any }): string {
        if (isNaN(parseInt(value))) {
            return enumerator[enumerator[value]] || value;
        }
        return enumerator[value] || value;
    }

    formatTitle(contest: IContest): string {
        let title = this.enumToString(contest.sport, Sport) + "&nbsp;" + this.enumToString(contest.contestType, ContestType);
        if (contest.label) {
            title += "&nbsp;" + contest.label.replace(/\-/g, "&#8209;").replace(/\s/g, "&nbsp;");
        }
        return title;
    }
}
