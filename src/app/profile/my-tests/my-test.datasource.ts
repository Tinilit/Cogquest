import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { Test } from "../../_models/index";
import { UserTestService, TestService } from "../../_services/index";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export class MyTestsDatasource implements DataSource<Test>{
    private currentUserId: string;

    constructor(private _testService: TestService, providerId: string) {
        this.currentUserId = providerId;
    }

    connect(collectionViewer: CollectionViewer): Observable<Test[]> {
        return this._testService.getAll()
            .map((tests: Test[]) => {
                let results = tests.filter((test: Test) => {
                    return test.providerId === this.currentUserId;
                });
                console.log(results);
                return results;
            });
    }

    disconnect(collectionViewer: CollectionViewer): void { }

}
