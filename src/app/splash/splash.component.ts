import { Component, OnInit, OnDestroy,  HostBinding } from '@angular/core';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { DataActions } from '../../actions/data-actions';
import { HttpgetService } from '../shared/httpget.service';
import { routerAnimation } from '../shared/router.animations';
import { UnsubscribeService } from '../shared/unsubscribe.service';

    @Component({
        selector: 'splash-component',
        templateUrl: './splash.template.html',
        styleUrls: ['./splash.component.scss'],
        animations: [routerAnimation()],
        host: {'[@routeAnimation]': ''}
         })

export class SplashComponent implements OnInit, OnDestroy {


  @HostBinding('class') class = 'animation';

  
  @select(['applicationData', 'routeData', 'splash']) splashData$: Observable<any>;

private splashlogo: String;
private splashText: String;
private splash: Object;
private subscriptionXHR: any;
private subscriptionRedux: any;

constructor (public httpgetService: HttpgetService, public actions: DataActions, private _unsubsc: UnsubscribeService) {}

    ngOnInit() {
        this. subscriptionRedux = this.splashData$.subscribe(
            response => { 
                if (response.length > 0) {
                    this.splashlogo = response[0].acf.splash_logo;
                    this.splashText = response[0].content;
                    this.splash = { backgroundImage: `url("${response[0].acf.splash_photo}")` };
                } else {
                    this.getDataFromService('splash');
                }
        });
    }

    getDataFromService(url) {
        this.subscriptionXHR = this.httpgetService.getApiData(url)
            .subscribe(response => this.actions.dataChange(response, url));
    }
    
    ngOnDestroy() {
        this._unsubsc.unsubscribe(this);
    }

}
