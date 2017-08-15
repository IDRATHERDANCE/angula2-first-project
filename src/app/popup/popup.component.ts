import { Component, Input, EventEmitter, Output, OnChanges,
        HostListener, ChangeDetectionStrategy, 
        ChangeDetectorRef, ViewContainerRef, 
        ViewChild, Renderer, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import { RemoveEmptyLines } from '../shared/removeEmptyLines.service';
import { ResizeWindow } from '../shared/resize.service';
import { CssClassesHelper } from '../shared/cssClassesHelper.service';
import { DataActions } from '../../actions/data-actions';

@Component ({
    selector: 'pop-up-init',
    templateUrl: './popup.template.html',
    styleUrls: ['./popup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
    })

export class PopUpInitComponent implements OnChanges, OnInit, OnDestroy {

@Input() contentObject: any;
@Output() onPopOff = new EventEmitter<boolean>();

@ViewChild('newsPopText', { read: ViewContainerRef })
private _newsB: any;
@ViewChild('popUpCont', { read: ViewContainerRef })
private _popUpCont: any;


private counter: number = 0;
private isItTooTall: Boolean;
private port: Boolean;
private isPortWider: Boolean;
private widerNews: Boolean;
private down: Boolean;
private hasPosition: Boolean = false;
private wider: Boolean;
private currentIfame: any;
private coulmnsData: Object;
private currentPhoto: any;
private isItNews: Boolean;
private newsText: String;
private text: String;
private arrowHover: boolean;
private _page: string;
private _imgLoad: boolean = false;
private _tooTallFlag: boolean = false;
private _wrapPos: boolean = false;
private _iframeAndDown: boolean = false;

// host listeners have to go before constructor    
@HostListener('window:keydown', ['$event']) onKeyDown(event: KeyboardEvent) {

    let keyCodeNumber = event.keyCode;

        // esc key kills the pop-up
    if ((keyCodeNumber) === 27) {
        this.onPopOff.emit(false);
        this.location.go(this.contentObject.page);
    }
    // space bar and right arrow move to the next pop-up right
    if ((keyCodeNumber === 32) || (keyCodeNumber === 39) || (keyCodeNumber === 38)) {
        event.preventDefault();
            this.nextItem();
    }
    // back space and left arrow move to the next pop-up right
    if ((keyCodeNumber === 37) || (keyCodeNumber === 8) || (keyCodeNumber === 40)) {
        event.preventDefault();
            this.previousItem();
    }
  }

constructor (
            private location: Location,
            private sanitationService: DomSanitizer,
            private _changeDetectorRef: ChangeDetectorRef,
            private _removeEmptyLines: RemoveEmptyLines,
            private _resizeWindow: ResizeWindow,
            private _renderer: Renderer,
            public actions: DataActions,
            private _cssCH: CssClassesHelper) {}


    ngOnChanges() {
        this.counter = this.contentObject.itemClicked;
        this.checkWhichPage(0); 
    }

    ngOnInit() {
        this.actions.popUp(true);
        
    }

    ngOnDestroy() {
        this.actions.popUp(false)
    }

    checkWhichPage(dir) { 

        this.isItNews = false;

        this._page = this.contentObject.page;
        let index = this.counter; 

            if (this._page === 'work') {
                this.basicPhotos(dir); 
            } else {
            let  title = this.contentObject.content[index].title;    
            this.location.go(this._page + '/' + title);

            if ((this._page === 'exhibitions') || (this._page === 'press')) {
                this.hasItVideo(dir);
            }

            if (this._page === 'news') {
                this.hasItVideo(dir);
                this.isItNews = true;
            }
        }
    }

    getText() { 

            let index = this.counter;

            if ((this._page === 'exhibitions') || (this._page === 'press')) {
                let text = this.contentObject.content[index].text
                this.text = this._removeEmptyLines.removeLines(text);
            }

            if (this._page === 'news') {
                this.newsText = this.contentObject.content[index].text.replace(/style=.*"/g, '').replace(/<em>/g, '').replace(/<\/em>/g, '');
            }
    }

    basicPhotos(dir) { 

    let newImg = new Image(),
        index = this.counter;
        newImg.src = this.contentObject.content[index].photo.url;

        newImg.onload =  () => {  
            this.currentPhoto = newImg.src;
            this.getText();
            this._imgLoad = true;
            this._changeDetectorRef.markForCheck();
            if (this._page === 'work') return;
            this.lazyLoadImg(dir);
        }; 
        
            if (this._page === 'news') {
                this.coulmnsData = {
                    width: this.contentObject.content[index].photo.width,
                    height: this.contentObject.content[index].photo.height,
                    pop: true
                }; 

            } else { 
                this.checkAspect(this.contentObject.content[index].photo.aspect);
            }   
    }

    lazyLoadImg(dir) { 
        
        let howMany = this.contentObject.content.length,
            index = this.counter; 

        if (dir === 0 || dir === 2) {
            index = index === 0 ? howMany - 1 : index; 
            
            if (this.contentObject.content[index - 1].newPop) return; 
            
            let newImg0 = new Image();
                newImg0.src = this.contentObject.content[index - 1].photo.url;

                if (dir === 2) return;
                    newImg0.onload =  () => {  
                        this.lazyLoadImg(1);
                    }; 
        } else {
            index = index === howMany - 1 ? 0: index; 
            
            if (this.contentObject.content[index + 1].newPop) return; 
            
            let newImg1 = new Image();
                newImg1.src = this.contentObject.content[index + 1].photo.url;
        }

    }

    basicVideo() {

        this.currentPhoto = '';
    let index = this.counter,
        iframe = this.contentObject.content[index].video;

        this.currentIfame = this.sanitationService.bypassSecurityTrustResourceUrl(iframe.substring(iframe.lastIndexOf('https:'),
        iframe.lastIndexOf('width') - 2) +
        '?autoplay=0&amp;title=0&amp;byline=0&amp;portrait=0&amp;loop=0&amp;api=0&amp;player_id=&amp;start=0');
        this.getText();
        this._imgLoad = true;
        if (this._page === 'news') {
            this.coulmnsData = {
                width: 16,
                height: 8.67,
                pop: true
            };     
        }

    }

    hasItVideo(dir) {
        let index = this.counter,
            checkVideo = this.contentObject.content[index].video;

        if ((checkVideo === undefined) || (!checkVideo)) {
                this.currentIfame = false;
                this.basicPhotos(dir);
            } else {
                this.basicVideo();
            }
    }

    nextItem() {

        let numberOfItems = this.contentObject.content.length;
        this.counter ++;

            if (numberOfItems === this.counter) {
                this.counter = 0;
            }
    
            this.nextPrevCommon(1);
        }

    previousItem() { 

        let numberOfItems = this.contentObject.content.length;
        this.counter --;

            if (this.counter === - 1) {
                this.counter = numberOfItems - 1;
            } 
            
            this.nextPrevCommon(2);       
    }

    nextPrevCommon(dir) {
        this._imgLoad = false;
        this._tooTallFlag = false;
        this.currentPhoto = '';
        this.hasPosition = false;  
        this.checkWhichPage(dir);
    }


    clickBox(event) {
        if (
            (event.target.nodeName !== 'A') &&
            (event.target.className !== 'popUpWrap') &&
            ((event.target.className.indexOf('popUpContainer') > -1) && (event.target.children[1].className.indexOf('widerBox') === -1)) ||
            (event.target.nodeName === 'IMG') ||
            (event.target.nodeName === 'P') ||
            (event.target.className.indexOf('newsPopup') > -1)
            ) {
                this.nextItem();
            } else {
                this.onPopOff.emit(false);
                this.location.go(this.contentObject.page);
            }
    }

    clickArrow(event) { 
        if (event.target.classList.value.indexOf('Right') > - 1) {
            this.nextItem();
        } else {
            this.previousItem();
        }
    }

    checkAspect(aspect) { 

        let detectAspect = ( () => {

            let windowAspect = window.innerWidth / window.innerHeight;

                if (windowAspect >= aspect) {
                    this.wider = true;
                } else {
                    this.wider = false;
                }

                this._changeDetectorRef.markForCheck();

        });
        detectAspect();
        this._resizeWindow.winResize(detectAspect);

    }

    columsClasses(value) { 
        this.down = value.classes;
        this.hasPosition = true;

                let contEl = this._popUpCont.element.nativeElement,
                    topCalc = (window.innerHeight - value.boxH) / 2 >= 0 ? (window.innerHeight - value.boxH) / 2 : 0,
                    topCorr = this.isPortWider ? '' : '';


        if (value.classes && (!this.down || this.port) && !this.isPortWider && this.port) { 
            this._renderer.setElementStyle(contEl, 'minHeight', value.boxH / 10 + 'rem') 
            this._renderer.setElementStyle(contEl, 'top', topCalc / 10 + 'rem') 
        } else {
            this._renderer.setElementStyle(contEl, 'minHeight', '');
            this._renderer.setElementStyle(contEl, 'top', topCorr) 
        }
    }

    newsPopAspect(value) {
        this.widerNews = value;
    }

    portWider(value) { 
        this.isPortWider = value;
        this._iframeAndDown = !value && !!this.currentIfame;
    }

    portraitNewsPhotos(value) { 
        this.port = value;
    }

    tooTallBox(value) {
        this.isItTooTall = value;
        this._tooTallFlag = true;            
    }

    onMouseEnter() {
        this.arrowHover = true;
    }

    onMouseLeave() {
        this.arrowHover = false;
    }

}
