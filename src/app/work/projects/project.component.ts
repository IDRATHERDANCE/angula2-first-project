import { Component, OnDestroy, HostBinding, trigger, transition, animate, style, state, Renderer, ElementRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpgetService } from '../../shared/httpget.service';
import { CacheService } from '../../shared/cache.service';
import { TopService } from '../../shared/top.service';


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



export class ProjectComponent implements OnDestroy {

  @HostBinding('class') class = 'animation';



private counter: number;
private noMorePhotosLeft: Boolean;
private noMorePhotosRight: Boolean;
private headline: String;
private sub: String;
private content: String;
private carousel: Object;
private firstPhoto: String;
private wholeContent: Object;
private htmlObject: any;
private carouselLength: Number;
private translateCarousel: String;
private subscription: any;
private isPortrait: boolean;
private isTextLong: boolean;
private nextFlag: boolean;

constructor (private _httpgetService: HttpgetService, private route: ActivatedRoute, private _cacheService: CacheService,
            private _renderer: Renderer, private _element: ElementRef, private _topService: TopService) {

        this.subscription = this.route.params.subscribe(params => {
            let routeSegment = params['project'];
                this.getSortedData(routeSegment);
                this.counter = 0;
                this.noMorePhotosLeft = true;
                this.nextFlag = false;
                 
                 setTimeout(() => {
                     
                     this.nextFlag = true; 
                
                let body = this._element.nativeElement.parentElement.parentElement,
                    html = this._element.nativeElement.parentElement.parentElement.parentElement;  
                    this._topService.setTop([body, html], this._renderer);
                    
                    }, 0);
        });

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
                this.photoCarouselLengthFn(this.prepCar(this.prepObj(response, routeSegment)).length - 1);

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

photoCarouselLengthFn(photoLenght) {
    this.noMorePhotosRight = (photoLenght <= 4) ? true : false;
    this.carouselLength = photoLenght;
}

leftCarouselArrow() {
    this.counter --;
    this.moveCarousel(this.counter);
}

rightCarouselArrow() {
    this.counter ++;
    this.moveCarousel(this.counter);
}

// translateC(value) {
//    this.translateCarousel = value;
// }
//
// noMorePhotosL(value) {
//    this.noMorePhotosLeft = value;
// }
//
// noMorePhotosR(value) {
//    this.noMorePhotosRight = value;
// }

isItPortrait(value) {
    this.isPortrait = value;
}

isTextTooLong(value) {
    this.isTextLong = value;
}

moveCarousel(counter) {

    let multiplyer = 1,
        length: any = this.carouselLength;

        if (length > 5) {
            multiplyer = 2;

            if (counter === 0) {
                this.noMorePhotosLeft = true;
                this.noMorePhotosRight = false;
                } else {
                    this.noMorePhotosLeft = false;
                }

                if (Math.ceil(length / 4) === counter) {
                    this.noMorePhotosRight = true;
                }

            if (this.isOdd(length)) {
                    if (Math.ceil(length / 4) === counter) {
                       multiplyer = 2.25;
                    }
                }

        }

    let moveTimes = counter * multiplyer * -26.5;
    this.translateCarousel = 'translateX(' + moveTimes + '%)';

}

isOdd(num) { return num % 2; }

ngOnDestroy() {
    this.subscription.unsubscribe();
}

}
