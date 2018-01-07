import { Component, Input, EventEmitter, Output, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component ({
    selector: 'carousel', // tslint:disable-line
    templateUrl: './carousel.directive.html',
    styleUrls: ['./carousel.directive.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
   })

export class CarouselComponent implements OnChanges {

    @Input() carouselObject: Array<Object>;
    @Output() whichPhoto = new EventEmitter<number>();

    public carousel: Object;
    public counter = 0;
    public translateCarousel: string;
    public noMorePhotosLeft: boolean;
    public noMorePhotosRight: boolean;
    private _carouselLength: number;

constructor () {}

    ngOnChanges() { 
        if (this.carouselObject) {
            this.carousel = this.carouselObject;
            this.photo_carouselLengthFn(this.carouselObject.length);
            this.noMorePhotosLeft = true;
        }
    }

    photo_carouselLengthFn(photoLenght) {
        this.noMorePhotosRight = (photoLenght <= 4) ? true : false;
        this._carouselLength = photoLenght; 
    }

    leftCarouselArrow() {
        this.counter --;
        this.moveCarousel(this.counter);
    }

    rightCarouselArrow() {
        this.counter ++;
        this.moveCarousel(this.counter);
    }

    moveCarousel(counter) { 

        let multiplyer = 1,
            length: any = this._carouselLength; 
            if (length === 5) { multiplyer = 1; }
            if (length > 5) {
                multiplyer = 2; 

                if (counter === 0) {
                    this.noMorePhotosLeft = true;
                    this.noMorePhotosRight = false;
                } else {
                    this.noMorePhotosLeft = false;
                }

                const oddCorrect =  this.isOdd(length) ? .5 : 0;   

                if (((this._carouselLength - 4) / 2) - oddCorrect === counter) { 
                    this.noMorePhotosRight = true;
                    multiplyer = this.isOdd(length) ? 2.25 : 2;
                } else {
                    this.noMorePhotosRight = false;
                }  
             
            }

        const moveTimes = counter * multiplyer * -26.5;
        this.translateCarousel = `translateX(${moveTimes}%)`;

    }

    isOdd(num) { return num % 2; }


    popUpActivate(index: number) {
        this.whichPhoto.emit(index);
    }

}
