import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { UserTest } from "../../_models/index";
import { ProviderUserTestsService, UserTestService } from "../../_services/index";
import { removeSummaryDuplicates } from "@angular/compiler";
import 'rxjs/add/observable/of';

export class ProviderUserTests implements DataSource<UserTest>{

    constructor(private _providerUserTest: ProviderUserTestsService, private providerId: string) { }

    connect(collectionViewer: CollectionViewer): Observable<UserTest[]> {
        return this._providerUserTest.getAll(this.providerId)
            .map((result) => {
                console.log(result);
                return result;
            });
        // return Observable.merge(this._providerUserTest.getAll(), this._userTest.getAll())
        //     .map(removeSummaryDuplicates => {

        //         return results;
        //     });
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

}