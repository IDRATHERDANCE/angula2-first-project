import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding } from '@angular/core';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { routerAnimation } from '../shared/router.animations';
import { CommonCalls } from '../shared/commonCalls.service';

    @Component({
        selector: 'splash', // tslint:disable-line
        templateUrl: './splash.template.html',
        styleUrls: ['./splash.component.scss'],
        animations: [routerAnimation()],
        changeDetection: ChangeDetectionStrategy.OnPush
         })

export class SplashComponent implements OnInit {

  
  @select(['applicationData', 'routeData', 'splash']) splashData$: Observable<any>;
  @HostBinding('@routeAnimation')

public splashlogo: String;
public splashText: String;
public splash: Object;
private _url = 'splash';

constructor (private _common: CommonCalls, private _changeDetectorRef: ChangeDetectorRef) {}

ngOnInit() {
    this._common.calls(this._url, this.splashData$, 
        response => this.populateResponse(response)
    );
}

populateResponse(response) {
    this._changeDetectorRef.markForCheck();

    const resObj = this.formatResponse(response);

    this.splashlogo = resObj.splashlogo;
    this.splashText = resObj.splashText;
    this.splash = { backgroundImage: `url("${resObj.splashPhoto}")` };
}


formatResponse(res) {
    return {
        splashlogo: res[0].acf.splash_logo,
        splashText: res[0].content,
        splashPhoto: res[0].acf.splash_photo
    }
}

}
