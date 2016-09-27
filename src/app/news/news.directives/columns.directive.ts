import {Directive, Input, Output, EventEmitter, ElementRef, OnChanges} from '@angular/core';

@Directive ({
    selector: '[mycolumns]'
   })

export class ColumnsDirective implements OnChanges {

@Input() coulmnsData: any;
@Output() columsClasses = new EventEmitter<boolean>();
@Output() newsPopAspect = new EventEmitter<boolean>();
@Output() portWider = new EventEmitter<boolean>();
@Output() portraitNewsPhotos = new EventEmitter<boolean>();
@Output() toTallBox = new EventEmitter<boolean>();

constructor (private element: ElementRef) {}



ngOnChanges() {

    if (this.coulmnsData.pop) {
        this.culumnsFn();
    } else {
        this.culumnsNonPopFn();
    }

}

culumnsNonPopFn() {

    let aspect = 1.67714884696017;

    let addColumnClassesNonPop = (() => {

            setTimeout ( () => {

                let windowWidth = window.innerWidth,
                    textHeight = this.element.nativeElement.clientHeight,
                    imageHeight = ((windowWidth * 0.5805555555555556) / aspect) - 16;

                        if (imageHeight <= textHeight) {
                                this.columsClasses.emit(true);

                            } else {
                                this.columsClasses.emit(false);
                               }
            }, 100);
         });
     addColumnClassesNonPop ();
    this.winResize(addColumnClassesNonPop);
}

culumnsFn() {

let addColumnClasses = (() => {


if (window.innerWidth > 767) {

    let aspect = this.coulmnsData.width / this.coulmnsData.height;


if (aspect <= 1) { this.portraitNewsPhotos.emit(true); } else { this.portraitNewsPhotos.emit(false); }

let windowWidth = window.innerWidth,
    windowHeight = window.innerHeight,
    windowAspect = windowWidth / windowHeight,
    narrowHeight = Math.round((windowHeight * windowAspect * 0.616) / aspect),
    wideHeight = Math.round((windowHeight * 0.8)),
    currentHeightMeassure: number,
    newAspect = ((windowHeight * 0.8 * aspect) + (windowWidth * 0.23) - 5) / (windowHeight * 0.8);

            if (newAspect <= windowAspect) {
                this.portWider.emit(false);
                currentHeightMeassure = wideHeight;
            } else {
                this.portWider.emit(true);
                currentHeightMeassure = narrowHeight;
            }



    setTimeout ( () => {

       let measureTextHeight = this.element.nativeElement.parentElement.clientHeight;

            if (measureTextHeight >= currentHeightMeassure) {

                    this.columsClasses.emit(true);
                    this.newsPopAspect.emit(false);

                    let imgWidth = windowWidth * 0.6001765225066196,
                        imgHeight = imgWidth / aspect;

                    setTimeout ( () => {

                        let textHeight = this.element.nativeElement.parentElement.nextElementSibling.children[0].children[1].clientHeight;


                                if (imgHeight + textHeight >= windowHeight * 0.9) {
                                        this.toTallBox.emit(true);
                                    } else {
                                        this.toTallBox.emit(false);
                                   }

                        }, 100);

                } else {

                    this.columsClasses.emit(false);
                    this.newsPopAspect.emit(true);
                }

        }, 200 );


}

});
addColumnClasses ();
this.winResize(addColumnClasses);

}


  winResize(callback) {
    window.addEventListener('resize', function() {
        callback();
    });
}


}
