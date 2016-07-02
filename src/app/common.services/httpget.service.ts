import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class HttpgetService {

constructor(private http: Http) {}

getApiData(locationPath?: String) {
    return this.http.get('./dataJson/' + locationPath + '.json')
       .map((response) => response.json());
     }
}
