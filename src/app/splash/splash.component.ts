import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';

import { HttpgetService } from '../shared/httpget.service';
import { CacheService } from '../shared/cache.service';

    @Component({
        selector: 'my-splash-component',
        templateUrl: './splash.template.html',
        animations: [
                trigger('routeAnimation', [
                state('*',
                    style({
                    opacity: 1
                    })
                ),
                transition('void => *', [
                    style({
                    opacity: 0
                    }),
                    animate('1s ease-in')
                ]),
                transition('* => void', [
                    animate('.8s ease-out', style({
                    opacity: 0
                    }))
                ])
                ])
            ]
         })

export class SplashComponent implements OnInit {


  @HostBinding('class') class = 'animation';

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

private splashlogo: String;
private splashText: String;
private splash: Object;

constructor (private _httpgetService: HttpgetService, private _cacheService: CacheService) {}

    ngOnInit() {
        this.getSortedData();
     }

getSortedData() {

    if (this._cacheService.isItChached('splash')) {
        this.callToPopulate(this._cacheService.isItChached('splash'));
    } else {
        this._httpgetService.getApiData('splash')
        .subscribe(
            response => {
                    this.callToPopulate(response);
                    this._cacheService.cache(response, 'splash');
                    }
                );
    }
}

callToPopulate(response) {
    this.splashlogo = response[0].acf.splash_logo;
    this.splashText = response[0].content;
    this.splash = {
            backgroundImage: 'url("' + response[0].acf.splash_photo + '")'
    };
}

}
