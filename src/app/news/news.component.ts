
import { Component, OnInit, OnDestroy, HostBinding, trigger, transition, animate, style, state } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpgetService } from '../shared/httpget.service';
import { CacheService } from '../shared/cache.service';

    @Component({
        selector: 'my-news-component',
        templateUrl: ('./news.template.html'),
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


export class NewsComponent implements OnInit, OnDestroy {


  @HostBinding('class') class = 'animation';

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }


private data: Object;
private wholeContent: Object;
private coulmnsData: Object;
private htmlObject: Object;
private down: Boolean;
private subscription: any;

constructor (private _httpgetService: HttpgetService, private _cacheService: CacheService, private route: ActivatedRoute) {}


    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            let routeSegment = params['single'];
                this.getSortedData(routeSegment);
       });
     }


getSortedData(routeSegment) {

    if (this._cacheService.isItChached('news')) {
        this.callToPopulate(this._cacheService.isItChached('news'), routeSegment);
    } else {
        this._httpgetService.getApiData('news')
        .subscribe(
            response => {
                    this.callToPopulate(response, routeSegment);
                    this._cacheService.cache(response, 'news');
                    }
                );
    }
}

callToPopulate(response, routeSegment) {
    this.data = response;
    this.wholeContent = this.prepObj(response);
    this.coulmnsData = this.prepPhotoDimensions(response);
        if (routeSegment !== undefined) {
            this.popUpActivateByRoute(response, routeSegment);
        }
}

    prepObj(res) {
     return res.reduce(function(all, item){
            if (item.acf.news_popup_photo) {
                  all.push({
                    photo: {
                            url: item.acf.news_popup_photo.url,
                            aspect: item.acf.news_popup_photo.width / item.acf.news_popup_photo.height,
                            width: item.acf.news_popup_photo.width,
                            height: item.acf.news_popup_photo.height
                            },
                    video: item.acf.news_video.html,
                    text: '<h1>' + item.title + '</h1><h2>' + item.acf.news_short_description + '</h2>' + item.content,
                    title: item.title.replace(/\s+/g, '-').toLowerCase()
                    });
                } else {
                 all.push({
                    photo: {
                            url: item.acf.news_photo.url,
                            aspect: item.acf.news_photo.width / item.acf.news_photo.height,
                            width: item.acf.news_photo.width,
                            height: item.acf.news_photo.height
                            },
                     video: item.acf.news_video.html,
                     text: '<h1>' + item.title + '</h1><h2>' + item.acf.news_short_description + '</h2>' + item.content,
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
        page: 'news',
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
        page: 'news',
        winScrl: 0
    };
}


  onPopOff(off: boolean) {

      this.htmlObject = off;
  }

prepPhotoDimensions(res) {

return {
        width: res[0].acf.news_photo.width,
        height: res[0].acf.news_photo.height,
        pop: false
    };

}

columsClasses(value) {
    this.down = value;
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}

}
