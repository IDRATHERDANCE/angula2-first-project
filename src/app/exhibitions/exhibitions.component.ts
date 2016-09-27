import { Component, OnInit, OnDestroy, HostBinding, trigger, transition, animate, style, state, Renderer, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpgetService } from '../shared/httpget.service';
import { CacheService } from '../shared/cache.service';
import { TopService } from '../shared/top.service';

    @Component({
        selector: 'my-exhibitions-component',
        templateUrl: ('./exhibitions.template.html'),
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


export class ExhibitionsComponent implements OnInit, OnDestroy {


  @HostBinding('class') class = 'animation';

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }



private data: Object;
private wholeContent: Object;
private htmlObject: Object;
private subscription: any;

constructor (private _httpgetService: HttpgetService, private _cacheService: CacheService, private route: ActivatedRoute,
            private _renderer: Renderer, private _element: ElementRef, private _topService: TopService) {}

  ngOnInit() {
      this.subscription = this.route.params.subscribe(params => {
        let routeSegment = params['exhibition'];
           this.getSortedData(routeSegment);
       });

       let body = this._element.nativeElement.parentElement.parentElement,
           html = this._element.nativeElement.parentElement.parentElement.parentElement;
           this._topService.setTop([body, html], this._renderer);
  }

getSortedData(routeSegment) {

    if (this._cacheService.isItChached('exhibitions')) {
        this.callToPopulate(this._cacheService.isItChached('exhibitions'), routeSegment);
    } else {
        this._httpgetService.getApiData('exhibitions')
        .subscribe(
            response => {
                    this.callToPopulate(response, routeSegment);
                    this._cacheService.cache(response, 'exhibitions');
                    }
                );
    }
}

    callToPopulate(response, routeSegment) {
        this.data = response;
        this.wholeContent = this.prepObj(response);
            if (routeSegment !== undefined) {
                this.popUpActivateByRoute(response, routeSegment);
            }
    }

    prepObj(res) {
     return res.reduce((all, item) => {
            if (item.acf.exhibition_popup_photo) {
                    all.push({
                     photo: {
                            url: item.acf.exhibition_popup_photo.url,
                            aspect: item.acf.exhibition_popup_photo.width / item.acf.exhibition_popup_photo.height
                            },
                    text: item.content,
                    title: item.title.replace(/\s+/g, '-').toLowerCase()
                    });
                } else {

                  all.push({
                       photo: {
                            url: item.acf.press_photo.url,
                            aspect: item.acf.exhibition_photo.width / item.acf.exhibition_photo.height
                            },
                        text: item.content,
                        title: item.title.replace(/\s+/g, '-').toLowerCase()
                    });
                }
             return all;
    }, []);
}

popUpActivate(index: number) {
    this.htmlObject = {
        content: this.wholeContent,
        itemClicked: index,
        page: 'exhibitions',
        winScrl: window.scrollY
    };
}

popUpActivateByRoute(res, routeSegment) {

    let current =  res.reduce((all, item, index) => {
    if (item.title.replace(/\s+/g, '-').toLowerCase() === routeSegment) {
                all = index;
        }
        return all;
    }, 0);

    this.htmlObject = {
        content: this.wholeContent,
        itemClicked: current,
        page: 'exhibitions',
        winScrl: 0
    };

}


  onPopOff(off: boolean) {
      this.htmlObject = off;
  }

ngOnDestroy() {
  this.subscription.unsubscribe();
}

}
