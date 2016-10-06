import {Component, Input, EventEmitter, Output, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component ({
    selector: 'my-carousel-directive',
    templateUrl: ('./carousel.template.html'),
        changeDetection: ChangeDetectionStrategy.OnPush
   })

export class CarouselComponent implements OnChanges {

    @Input() carouselObject: Array<Object>;
    @Output() whichPhoto = new EventEmitter<number>();

    private  _carousel: Object;
    private _counter: number = 0;
    private _translateCarousel: string;
    private _noMorePhotosLeft: boolean;
    private _noMorePhotosRight: boolean;
    private _carouselLength: number;

constructor () {}

ngOnChanges() {
    this._carousel = this.carouselObject;
    this.photo_carouselLengthFn(this.carouselObject.length);
    this._noMorePhotosLeft = true;
}


photo_carouselLengthFn(photoLenght) {
    this._noMorePhotosRight = (photoLenght <= 4) ? true : false;
    this._carouselLength = photoLenght;
}

leftCarouselArrow() {
    this._counter --;
    this.moveCarousel(this._counter);
}

rightCarouselArrow() {
    this._counter ++;
    this.moveCarousel(this._counter);
}


moveCarousel(_counter) {

    let multiplyer = 1,
        length: any = this.carouselObject.length;

        if (length > 5) {
            multiplyer = 2;

            if (_counter === 0) {
                this._noMorePhotosLeft = true;
                this._noMorePhotosRight = false;
                } else {
                    this._noMorePhotosLeft = false;
                }

                if (Math.ceil(length / 4) === _counter) {
                    this._noMorePhotosRight = true;
                }

            if (this.isOdd(length)) {
                    if (Math.ceil(length / 4) === _counter) {
                       multiplyer = 2.25;
                    }
                }

        }

    let moveTimes = _counter * multiplyer * -26.5;
    this._translateCarousel = 'translateX(' + moveTimes + '%)';

}

isOdd(num) { return num % 2; }


popUpActivate(index: number) {
    this.whichPhoto.emit(index);
}

}
