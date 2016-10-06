import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';

import { HttpgetService } from '../shared/httpget.service';
import { CacheService } from '../shared/cache.service';

import { SessionStorageService } from 'ng2-webstorage';

    @Component({
        selector: 'my-work-component',
        templateUrl: ('./work.template.html'),
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

export class WorkComponent implements OnInit {

  @HostBinding('class') class = 'animation';

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

private _data: Object;


constructor (private _httpgetService: HttpgetService, private _cacheService: CacheService, private sessionSt: SessionStorageService) {}


ngOnInit() {
    this.getSortedData();

            this.sessionSt.observe('work')
            .subscribe((value) => console.log('new value', value));


}

getSortedData() {

    if (this._cacheService.isItChached()) {
        this.callToPopulate(this._cacheService.isItChached());
    } else {
        this._httpgetService.getApiData()
        .subscribe(
            response => {
                    this.callToPopulate(response);
                    this._cacheService.cache(response);
                    }
                );
    }
}

callToPopulate(response) {
    this._data = response;
}



 }


