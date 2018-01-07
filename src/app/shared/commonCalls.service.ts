import { Injectable } from '@angular/core';

import { DataActions } from '../../actions/data-actions';
import { HttpgetService } from './httpget.service';
import { PrepareObj } from './prepareObjects.service';


@Injectable()

export class CommonCalls {

private subscriptionXHR: any; 

constructor(
    private _httpgetService: HttpgetService, 
    public actions: DataActions,
    private _prepObj: PrepareObj
) {}

    calls(url, reduxData, callback) {
        
        reduxData.subscribe(
            response => { 
                if (response.length > 0) { 
                    callback(response); 
                } else {
                    this.getDataFromService(url);
                }
        });
    
    }

    setMenu(resData) {
        const menuArray = resData.map(item => this._prepObj.formateTitle(item));
            this.actions.menuChange(menuArray);
            this.actions.menuPresent(true);
    }

    getDataFromService(url) {
        this.subscriptionXHR = this._httpgetService.getApiData(url)
            .subscribe(
                response => this.actions.dataChange(response, url),
                error => console.log(error),
                () => this.subscriptionXHR.unsubscribe() 
            );
    }


}
