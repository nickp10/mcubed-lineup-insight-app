import { async, TestBed } from "@angular/core/testing";
import { ContestsService } from "./contests.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

describe("ContestsService", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientModule ],
            providers: [ ContestsService ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
        });
    }));

    it("should create", () => {
        const target: ContestsService = TestBed.get(ContestsService);
        expect(target).toBeTruthy();
    });
});
