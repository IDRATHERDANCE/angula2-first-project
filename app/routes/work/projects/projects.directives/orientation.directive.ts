import { Directive, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';

@Directive ({
    selector: '[orientation]'
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

                        if (windowWidth > 767) {
                            if (height >= width) {
                                    this.isItPortrait.emit(true);
                                      if (imageBoxHeight <= textBoxHeight) {
                                            this.isTextTooLong.emit(false);
                                        } else {
                                            this.isTextTooLong.emit(true);
                                        }
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