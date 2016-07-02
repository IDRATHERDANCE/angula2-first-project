import { Component, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpgetService } from '../../common.services/httpget.service';
import { OrientationDirective } from './projects.directives/orientation.directive';
import { PopUpInitComponent } from '../../directives/popup.component';
import { CarouselDirective } from './projects.directives/carousel.directive';

    @Component({
        selector: 'my-project-component',
        moduleId: module.id,
        template: require('./project.template.html'),
        providers: [HttpgetService],
        directives: [OrientationDirective, PopUpInitComponent, CarouselDirective]
        })

export class ProjectComponent implements OnDestroy {

@HostBinding('class') class = 'ng-animate view';

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
private isPortrait: Boolean;
private isTextLong: Boolean;

constructor (private httpgetService: HttpgetService, private route: ActivatedRoute) {

        this.subscription = this.route.params.subscribe(params => {
            let routeSegment = params['project'];
                this.getSortedData(routeSegment);
                this.counter = 0;
                this.noMorePhotosLeft = true;
        });

}


getSortedData(routeSegment) {
    this.httpgetService.getApiData('work')
        .subscribe(
            response => {
                this.headline = this.prepObj(response, routeSegment).title;
                this.sub = this.prepObj(response, routeSegment).meta.work_short_description;
                this.content = this.prepObj(response, routeSegment).content;
                this.carousel = this.prepCar(this.prepObj(response, routeSegment)).slice(1);
                this.firstPhoto = this.prepCar(this.prepObj(response, routeSegment))[0].photo.url;
                this.wholeContent = this.prepCar(this.prepObj(response, routeSegment));
                this.photoCarouselLengthFn(this.prepCar(this.prepObj(response, routeSegment)).length - 1);
            }
        );
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

        let metaInside = data.meta,
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
        page: 'work'
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
