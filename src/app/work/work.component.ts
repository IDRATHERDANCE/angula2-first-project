import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { DataActions } from '../../actions/data-actions';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { HttpgetService } from '../shared/httpget.service';
import { routerAnimation } from '../shared/router.animations';
import { UnsubscribeService } from '../shared/unsubscribe.service';


    @Component({
        selector: 'work-component',
        templateUrl: './work.component.html',
        styleUrls: ['./work.component.scss'],
        animations: [routerAnimation()],
        host: {'[@routeAnimation]': ''}
        })

export class WorkComponent implements OnInit, OnDestroy {

  @HostBinding('class') class = 'animation';
  
  @select(['applicationData', 'routeData', 'work']) workData$: Observable<any>;

    private _data: Object;
    private subscriptionXHR: any;
    private subscriptionRedux: any;

  constructor(public actions: DataActions, public httpgetService: HttpgetService, private _unsubsc: UnsubscribeService) {}

    ngOnInit() {
      this.subscriptionRedux = this.workData$.subscribe(
        response => { 
            if (response.length > 0) {
                this._data = response;
            } else {
                this.getDataFromService('work');
            }
        });
    }    
  
    getDataFromService(url) {
        this.subscriptionXHR = this.httpgetService.getApiData(url)
            .subscribe(response => { 
                let menuArray = response.map(item => item.title.replace(/\s+/g, '-').toLowerCase());
                    this.actions.dataChange(response, url);
                    this.actions.menuChange(menuArray);
                    this.actions.menuPresent(true);
            });
    }
    
    ngOnDestroy() {
        this._unsubsc.unsubscribe(this);
    }

}


