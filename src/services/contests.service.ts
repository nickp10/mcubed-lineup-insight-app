import { from } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HTTP } from "@ionic-native/http/ngx";
import { IContest } from "../interfaces";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Platform } from "@ionic/angular";
import "rxjs/add/operator/map";
import "rxjs/add/operator/publishReplay";

interface IContestsCache {
    contests?: Observable<IContest[]>;
}

@Injectable()
export class ContestsService {
    private cache: IContestsCache = { };
    private static BASE_URL = "http://mcubed.ddns.net:60002"; // Keep in sync with proxy.config.json

    constructor(private nativeHttp: HTTP, private ngHttp: HttpClient, private platform: Platform) {
    }

    getContests(): Observable<IContest[]> {
        if (!this.cache.contests) {
            if (this.platform.is("android") || this.platform.is("ios")) {
                this.cache.contests = from(this.platform.ready().then(() => {
                    return this.nativeHttp.get(ContestsService.BASE_URL, {}, {});
                }).then((response) => {
                    return <IContest[]>JSON.parse(response.data);
                }));
            } else {
                this.cache.contests = this.ngHttp.get<IContest[]>("/api").publishReplay(1).refCount();
            }
        }
        return this.cache.contests;
    }
}
