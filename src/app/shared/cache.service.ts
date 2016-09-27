import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ng2-webstorage';



@Injectable()

export class CacheService {



constructor(private _storage: SessionStorageService) {}

cache(response, whereString = 'work') {
    this._storage.store(whereString, response);
}

isItChached(whereString = 'work') {
    return this._storage.retrieve(whereString);
}


}
