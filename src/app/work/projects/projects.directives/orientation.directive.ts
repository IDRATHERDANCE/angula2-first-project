import { Directive, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';

@Directive ({
    selector: '[myorientation]'
    })

export class OrientationDirective implements AfterViewInit {

@Output() isItPortrait = new EventEmitter<boolean>();
@Output() isTextTooLong = new EventEmitter<boolean>();


constructor (private element: ElementRef) {}


    ngAfterViewInit() {

           let nativeEl = this.element.nativeElement,
               image = nativeEl.children[0],
               textBox = nativeEl.parentNode.nextElementSibling;

            image.addEventListener('load', () => {

                    let detectOrientation = ( () => {
                        let width = image.naturalWidth,
                            height = image.naturalHeight,
                            textBoxHeight = textBox.clientHeight,
                            windowWidth = window.innerWidth,
                            imageBoxHeight = (windowWidth * 0.385 * height) / width;

                                    let textTooHeigh = ( () => {
                                            if (imageBoxHeight <= textBoxHeight) {
                                                this.isTextTooLong.emit(false);
                                            } else {
                                                this.isTextTooLong.emit(true);
                                            }
                                        });

                        if (windowWidth > 767) {
                            if (height >= width) {
                                    this.isItPortrait.emit(true);
                                    textTooHeigh();
                                } else {
                                        this.isItPortrait.emit(false);
                                        this.isTextTooLong.emit(false);
                                }
                         }
                    });
                    detectOrientation();
                    this.winResize(detectOrientation);
            });

    }

winResize(callback) {
    window.addEventListener('resize', () => callback() );
}

}
