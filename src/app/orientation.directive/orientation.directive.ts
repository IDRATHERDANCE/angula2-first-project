import { Directive, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { ResizeWindow } from '../shared/resize.service';

@Directive ({
    selector: '[orientation]'
    })

export class OrientationDirective implements AfterViewInit {

@Output() isItPortrait = new EventEmitter<boolean>();
@Output() isTextTooLong = new EventEmitter<boolean>();

@Input() imageEl: any;   
@Input() textEl: any; 


constructor (private _resizeWindow: ResizeWindow) {}


    ngAfterViewInit() { 

           let image = this.imageEl,
               textBox = this.textEl;

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
                    this._resizeWindow.winResize(detectOrientation);
            });

    }

}
