import { Component, Input, EventEmitter, Output, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component ({
    selector: 'carousel-directive',
    templateUrl: './carousel.directive.html',
    styleUrls: ['./carousel.directive.scss'],
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
        if (this.carouselObject) {
                this._carousel = this.carouselObject;
                this.photo_carouselLengthFn(this.carouselObject.length);
                this._noMorePhotosLeft = true;
        }
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
            length: any = this._carouselLength; 
            if (length === 5) { multiplyer = 1; }
            if (length > 5) {
                multiplyer = 2; 

                if (_counter === 0) {
                    this._noMorePhotosLeft = true;
                    this._noMorePhotosRight = false;
                } else {
                    this._noMorePhotosLeft = false;
                }

                const oddCorrect =  this.isOdd(length) ? .5 : 0;   

                if (((this._carouselLength - 4) / 2) - oddCorrect === _counter) { 
                    this._noMorePhotosRight = true;
                    multiplyer = this.isOdd(length) ? 2.25 : 2;
                } else {
                    this._noMorePhotosRight = false;
                }  
             
            }

        const moveTimes = _counter * multiplyer * -26.5;
        this._translateCarousel = `translateX(${moveTimes}%)`;

    }

    isOdd(num) { return num % 2; }


    popUpActivate(index: number) {
        this.whichPhoto.emit(index);
    }

}
