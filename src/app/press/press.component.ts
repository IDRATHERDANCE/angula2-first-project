import { Component, OnInit, OnDestroy, HostBinding, trigger, transition, animate, style, state, Renderer, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpgetService } from '../shared/httpget.service';
import { CacheService } from '../shared/cache.service';
import { TopService } from '../shared/top.service';

    @Component({
        selector: 'my-press-component',
        templateUrl: ('./press.template.html'),
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

export class PressComponent implements OnInit, OnDestroy {

  @HostBinding('class') class = 'animation';

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }


private data: Object;
private wholeContent: Object;
private htmlObject: any;
private subscription: any;

constructor (private _httpgetService: HttpgetService, private _cacheService: CacheService, private route: ActivatedRoute,
             private _renderer: Renderer, private _element: ElementRef, private _topService: TopService) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            let routeSegment = params['article'];
               this.getSortedData(routeSegment);
       });
       let body = this._element.nativeElement.parentElement.parentElement,
           html = this._element.nativeElement.parentElement.parentElement.parentElement;
           this._topService.setTop([body, html], this._renderer);
    }

getSortedData(routeSegment) {

    if (this._cacheService.isItChached('press')) {
        this.callToPopulate(this._cacheService.isItChached('press'), routeSegment);
    } else {
        this._httpgetService.getApiData('press')
        .subscribe(
            response => {
                    this.callToPopulate(response, routeSegment);
                    this._cacheService.cache(response, 'press');
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
     return res.reduce( (all, item) => {
            if (item.acf.press_popup_photo) {
                 all.push({
                    photo: {
                            url: item.acf.press_popup_photo.url,
                            aspect: item.acf.press_popup_photo.width / item.acf.press_popup_photo.height
                            },
                    video: item.acf.press_video.html,
                    text: item.content,
                    title: item.title.replace(/\s+/g, '-').toLowerCase()
                    });
                } else {
                 all.push({
                    photo: {
                            url: item.acf.press_photo.url,
                            aspect: item.acf.press_photo.width / item.acf.press_photo.height
                            },
                    video: item.acf.press_video.html,
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
    page: 'press',
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
        page: 'press',
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
