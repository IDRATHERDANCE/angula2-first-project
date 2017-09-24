import { Directive, Input, Output, EventEmitter, ElementRef, OnChanges } from '@angular/core';
import { ResizeWindow } from '../shared/resize.service';

import { Observable } from 'rxjs';

@Directive ({
    selector: '[columns]'
   })

export class ColumnsDirective implements OnChanges {

@Input() coulmnsData: any;
@Input() newsPopTextBox: any;
@Input() newsPopTextMain: any;

@Output() columsClasses = new EventEmitter<any>();
@Output() newsPopAspect = new EventEmitter<boolean>();
@Output() portWider = new EventEmitter<boolean>();
@Output() portraitNewsPhotos = new EventEmitter<boolean>();
@Output() tooTallBox = new EventEmitter<boolean>();


constructor (private element: ElementRef, private _resizeWindow: ResizeWindow) {}

    ngOnChanges() {

        if (this.coulmnsData.pop) {
            this.culumnsFn();
        } else {
            this.culumnsNonPopFn();
        }
    }

    culumnsNonPopFn() {

        const addColumnClassesNonPop = (() => {

            const _timer1$ = Observable
                            .timer()
                            .map(() => this.element.nativeElement.clientHeight)
                            .subscribe(
                                height => this.handleEmits(height),
                                err => console.error(err),
                                () => _timer1$.unsubscribe());
            });

        addColumnClassesNonPop();
        this._resizeWindow.winResize(addColumnClassesNonPop);
    }

    handleEmits(boxH) {
        const aspect = 1.67714884696017,
            windowWidth = window.innerWidth,
            imageHeight = ((windowWidth * 0.5805555555555556) / aspect) - 16;
                if (imageHeight <= boxH) {
                        this.columsClasses.emit(true);

                    } else {
                        this.columsClasses.emit(false);
                    }
    }

    culumnsFn() {

        const addColumnClasses = (() => {

            
        if (!this._resizeWindow.isItPhone()) {

            const aspect = this.coulmnsData.width / this.coulmnsData.height;


        if (aspect <= 1) { this.portraitNewsPhotos.emit(true); } else { this.portraitNewsPhotos.emit(false); }

      const windowWidth = window.innerWidth,
            windowHeight = window.innerHeight,
            windowAspect = windowWidth / windowHeight,
            narrowHeight = Math.round((windowHeight * windowAspect * 0.616) / aspect),
            wideHeight = Math.round((windowHeight * 0.8)),
            newAspect = ((windowHeight * 0.8 * aspect) + (windowWidth * 0.23) - 5) / (windowHeight * 0.8);
        let currentHeightMeassure: number;
            
                    if (newAspect <= windowAspect) { 
                        this.portWider.emit(false);
                        currentHeightMeassure = wideHeight;
                    } else { 
                        this.portWider.emit(true);
                        currentHeightMeassure = narrowHeight;
                    }

                    const _timer2$ = Observable
                    .timer(250)
                    .map(() => this.element.nativeElement.parentElement.clientHeight)
                    .subscribe(
                        height => this.handlePopEmits(height, currentHeightMeassure, aspect),
                        err => console.error(err),
                        () => _timer2$.unsubscribe());


        } else {
            this.columsClasses.emit(false);
        }

        });
    
        addColumnClasses ();
        this._resizeWindow.winResize(addColumnClasses);

    }

    handlePopEmits(measureTextHeight, currentHeightMeassure, aspect) { 
        if (measureTextHeight >= currentHeightMeassure) { 
                
                    this.columsClasses.emit({classes: true, boxH: measureTextHeight});
                    this.newsPopAspect.emit(false);

                    const imgWidth = window.innerWidth * 0.6001765225066196,
                        imgHeight = imgWidth / aspect;

                            const _box$ = Observable
                                    .timer(100)
                                    .map(() => this.newsPopTextBox.element.nativeElement.clientHeight)
                                    .subscribe(
                                        height => this.handleSecondTimeout(imgHeight, height),
                                        error => console.error(error),
                                        () => _box$.unsubscribe()
                                        );

                } else { 
                    
                    this.columsClasses.emit({classes: false, boxH: measureTextHeight});
                    this.newsPopAspect.emit(true);
                    this.tooTallBox.emit(false);

                    

                }        
    }

    handleSecondTimeout(imgHeight, textHeight) { 
            if (imgHeight + textHeight >= window.innerHeight * 0.9) {
                    this.tooTallBox.emit(true);
                } else {
                    this.tooTallBox.emit(false);
            }        
    }

}
