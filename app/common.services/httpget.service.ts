import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Location} from "@angular/common";

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'

@Injectable()

export class HttpgetService {

constructor(private http:Http, public location: Location) { }
      
  
      
getApiData(){ 
    
    let locationPath = this.location.path();
    
    if (locationPath === ''){
        locationPath = '/splash';
    }
    if (locationPath.indexOf('/work')>-1){
        locationPath = '/work';
    }
    if (locationPath.indexOf('/exhibitions')>-1){
        locationPath = '/exhibitions';
    }
    if (locationPath.indexOf('/news')>-1){
        locationPath = '/news';
    }    
    if (locationPath.indexOf('/press')>-1){
        locationPath = '/press';
    }

   return this.http.get('../dataJson' + locationPath + '.json')
       .map((response:Resoponse) => response.json())
      
    } 
    
      
 

}


