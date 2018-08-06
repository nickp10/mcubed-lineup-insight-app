import { HttpClient } from "@angular/common/http";
import { IContest } from "../interfaces";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/publishReplay";

interface IContestsCache {
    contests?: Observable<IContest[]>;
}

@Injectable()
export class ContestsService {
    private cache: IContestsCache = { };

    constructor(private httpClient: HttpClient) {
    }

    getContests(): Observable<IContest[]> {
        if (!this.cache.contests) {
            this.cache.contests = this.httpClient.get<IContest[]>("/api").publishReplay(1).refCount();
        }
        return this.cache.contests;
    }
}
