import { Injectable } from '@angular/core';

import { DataActions } from '../../../actions/data-actions';
import { HttpgetService } from '.././httpget.service';
import { PrepareObj } from '../prepareObjects.service';


@Injectable()

export class CommonCallsMock {

private subscriptionXHR: any; 

constructor(
    private _httpgetService: HttpgetService, 
    public actions: DataActions,
    private _prepObj: PrepareObj
) {}

    calls() {
        
        // reduxData.subscribe(
        //     response => { 
        //         if (response.length > 0) { 
        //             callback(response); 
        //         } else {
        //             this.getDataFromService(url);
        //         }
        // });

        return {
            content: '<p>content</p>',
            photo: 'https://idrather.dance/ana_backend/wordpress/wp-content/uploads/Ana-Rajcevic-ANIMAL-03-copy.jpg',
            columnRight: '<p>text right</p>'
        }
    
    }

    setMenu(resData) {
        const menuArray = resData.map(item => this._prepObj.formateTitle(item));
            this.actions.menuChange(menuArray);
            this.actions.menuPresent(true);
    }

    // getDataFromService(url) {
    //     this.subscriptionXHR = this._httpgetService.getApiData(url)
    //         .subscribe(
    //             response => this.actions.dataChange(response, url),
    //             error => console.log(error),
    //             () => this.subscriptionXHR.unsubscribe() 
    //         );
    // }


}
