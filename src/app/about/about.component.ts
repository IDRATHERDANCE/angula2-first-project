import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, Renderer, ElementRef } from '@angular/core';

import { HttpgetService } from '../shared/httpget.service';
import { CacheService } from '../shared/cache.service';
import { TopService } from '../shared/top.service';

@Component({
  selector: 'my-about',
  templateUrl: './about.component.html',
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
export class AboutComponent implements OnInit {

  @HostBinding('class') class = 'animation';

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

private pageContent: any;
private aboutPhoto: any;
private columnRight: any;


  constructor(private _httpgetService: HttpgetService, private _cacheService: CacheService,
                private _renderer: Renderer, private _element: ElementRef, private _topService: TopService) {}



ngOnInit() {
        this.getSortedData();

    let body = this._element.nativeElement.parentElement.parentElement,
        html = this._element.nativeElement.parentElement.parentElement.parentElement;
        this._topService.setTop([body, html], this._renderer);
}

getSortedData() {

    if (this._cacheService.isItChached('about')) {
        this.callToPopulate(this._cacheService.isItChached('about'));
    } else {
        this._httpgetService.getApiData('about')
        .subscribe(
            response => { console.log(response);
                    this.callToPopulate(response);
                    this._cacheService.cache(response, 'about');
                    }
                );
    }
}

   callToPopulate(response) {
        this.pageContent = response[0].content;
        this.aboutPhoto = response[0].acf.about_photo;
        this.columnRight = response[0].acf.column_right;
    }

}
