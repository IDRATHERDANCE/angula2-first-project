import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, Renderer, ElementRef } from '@angular/core';

import { HttpgetService } from '../shared/httpget.service';
import { CacheService } from '../shared/cache.service';
import { TopService } from '../shared/top.service';


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

private data: Object;


constructor (private _httpgetService: HttpgetService, private _cacheService: CacheService,
            private _renderer: Renderer, private _element: ElementRef, private _topService: TopService) {}


ngOnInit() {
        
        this.getSortedData(); 

        let body = this._element.nativeElement.parentElement.parentElement,
            html = this._element.nativeElement.parentElement.parentElement.parentElement;
           this._topService.setTop([body, html], this._renderer);
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
    this.data = response;
}



 }


