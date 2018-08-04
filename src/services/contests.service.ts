import { Http } from '@angular/http';
import { IContest } from '../interfaces';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

interface IContestsCache {
	contests?: Observable<IContest[]>;
}

@Injectable()
export class ContestsService {
	cache: IContestsCache = { };

	constructor(private http: Http) {
	}

	getContests(): Observable<IContest[]> {
		if (!this.cache.contests) {
			this.cache.contests = this.http.get("/api").map(
				(response, index) => <IContest[]>response.json()
			).publishReplay(1).refCount();
		}
		return this.cache.contests;
	}
}
