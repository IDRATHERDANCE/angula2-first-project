import { Component, OnDestroy, OnInit, HostBinding, trigger,
        transition, animate, style, state } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpgetService } from '../../shared/httpget.service';
import { CacheService } from '../../shared/cache.service';


    @Component({
        selector: 'my-project-component',
        templateUrl: ('./project.template.html'),
        animations: [
            trigger('routeAnimationFake', [
            state('*',
                style({
                opacity: 1
                })
            ),
            transition('* => *', [
                style({
                opacity: 0
                }),
                animate('1s ease-in')
            ])
            ])
        ]
        })



export class ProjectComponent implements OnDestroy, OnInit {

  @HostBinding('class') class = 'animation';


private headline: String;
private sub: String;
private content: String;
private carousel: Object;
private firstPhoto: String;
private wholeContent: Object;
private htmlObject: any;
private subscription: any;
private isPortrait: boolean;
private isTextLong: boolean;
private nextFlag: boolean;

constructor (private _httpgetService: HttpgetService, private route: ActivatedRoute, private _cacheService: CacheService) {

        this.subscription = this.route.params.subscribe(params => {
            let routeSegment = params['project'];
                this.getSortedData(routeSegment);
                this.nextFlag = false;
                 setTimeout(() => { this.nextFlag = true; }, 0);
        });

}

ngOnInit() {
    // console.log('yey2');
}

getSortedData(routeSegment) {

    if (this._cacheService.isItChached()) {
        this.callToPopulate(this._cacheService.isItChached(), routeSegment);
    } else {
        this._httpgetService.getApiData()
        .subscribe(
            response => {
                    this.callToPopulate(response, routeSegment);
                    this._cacheService.cache(response);
                    }
                );
    }

}

callToPopulate(response, routeSegment) {

                this.headline = this.prepObj(response, routeSegment).title;
                this.sub = this.prepObj(response, routeSegment).acf.work_short_description;
                this.content = this.prepObj(response, routeSegment).content;
                this.carousel = this.prepCar(this.prepObj(response, routeSegment)).slice(1);
                this.firstPhoto = this.prepCar(this.prepObj(response, routeSegment))[0].photo.url;
                this.wholeContent = this.prepCar(this.prepObj(response, routeSegment));

}

    prepObj(res, route) {
        return res.reduce( (all, item) => {
           let title = item.title.replace(/\s+/g, '-').toLowerCase();
            if (title === route) {
                return item;
            }
             return all;
        }, {});
   }

   prepCar(data) {

        let metaInside = data.acf,
            meta = Object.keys(metaInside);

            return meta.reduce( (all, item, index) => {

                if ((item.indexOf('work_main_photo') === - 1) && (item.indexOf('links') === - 1)
                && (metaInside[item]) && (item.indexOf('work_photo_') > -1 )) {
                      all.push({
                        photo: {
                                url: metaInside[item].url,
                                aspect: metaInside[item].width / metaInside[item].height
                                }
                        });
                    }
                    return all;
                 }, []);

    }

popUpActivate(index: number) {
    this.htmlObject = {
        content: this.wholeContent,
        itemClicked: index,
        page: 'work',
        winScrl: window.scrollY
    };
}

onPopOff() {
    this.htmlObject = false;
}

isItPortrait(value) {
    this.isPortrait = value;
}

isTextTooLong(value) {
    this.isTextLong = value;
}

ngOnDestroy() {
    this.subscription.unsubscribe();
}

}
