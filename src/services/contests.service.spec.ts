import { async, inject, TestBed } from "@angular/core/testing";
import { ContestsService } from "./contests.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { HTTP } from "@ionic-native/http/ngx";

describe("ContestsService", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientModule ],
            providers: [ HTTP, ContestsService ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
        });
    }));

    it("should create", inject([ContestsService], (target) => {
        expect(target).toBeTruthy();
    }));
});
