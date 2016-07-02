import { Component, Input, EventEmitter, Output, ElementRef, OnChanges, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { DomSanitizationService } from '@angular/platform-browser';

import { ColumnsDirective } from '../news/news.directives/columns.directive';


@Component ({
    selector: 'my-pop-up-init',
    moduleId: module.id,
    template: require('./popup.template.html'),
    directives: [ColumnsDirective]
    })

export class PopUpInitComponent implements OnChanges {



@Input() contentObject: any;
@Output() onPopOff = new EventEmitter<boolean>();

private counter: number = 0;
private location: any;
private isItTooTall: Boolean;
private port: Boolean;
private isPortWider: Boolean;
private widerNews: Boolean;
private down: Boolean;
private wider: Boolean;
private isIframe: Boolean;
private currentIfame: any;
private coulmnsData: Object;
private currentPhoto: any;
private isItNews: Boolean;
private photo100height: Boolean;
private newsText: String;
private text: String;

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

@HostListener('document:wheel', ['$event']) scrollOff(event: WheelEvent) {
    event.preventDefault();
}

@HostListener('document:mousewheel', ['$event']) scrollOffOld(event: WheelEvent) {
    event.preventDefault();
}

constructor (private element: ElementRef, private location: Location, private sanitationService: DomSanitizationService) {
    this.location = location;
}

ngOnChanges() {
    this.counter = this.contentObject.itemClicked;
    this.checkWhichPage(this.contentObject.itemClicked);
}

checkWhichPage(index) {

    this.isItNews = false;

    let page = this.contentObject.page,
        title = this.contentObject.content[index].title;

        if (page === 'work') {
            this.photo100height = true;
            this.basicPhotos(index, page);
        } else {

        this.location.go(page + '/' + title);

        if (page === 'exhibitions') {
            this.basicPhotos(index, page);
            this.text = this.contentObject.content[index].text;
        }

         if (page === 'press') {
             this.hasItVideo(index, page);
             this.text = this.contentObject.content[index].text;
        }

        if (page === 'news') {
             this.hasItVideo(index, page);
             this.newsText = this.contentObject.content[index].text.replace(/style=.*"/g, '').replace(/<em>/g, '').replace(/<\/em>/g, '');
             this.photo100height = true;
             this.isItNews = true;
        }
    }
}

basicPhotos(index, page) {

        if (page === 'news') {
            this.currentPhoto = false;
            this.currentPhoto = this.contentObject.content[index].photo.url;
            this.coulmnsData = {
                width: this.contentObject.content[this.counter].photo.width,
                height: this.contentObject.content[this.counter].photo.height,
                pop: true
            };

        } else {
            this.currentPhoto = this.contentObject.content[index].photo.url;
            this.checkAspect(this.contentObject.content[index].photo.aspect);
        }
}

basicVideo(index, page) {
     this.currentPhoto = false;
let iframe = this.contentObject.content[index].video;
    this.currentIfame = this.sanitationService.bypassSecurityTrustResourceUrl(iframe.substring(iframe.lastIndexOf('https:'),
    iframe.lastIndexOf('width') - 2) +
    '?autoplay=0&amp;title=0&amp;byline=0&amp;portrait=0&amp;loop=0&amp;api=0&amp;player_id=&amp;start=0');

    if (page === 'news') {
            this.coulmnsData = {
                width: 16,
                height: 8.67,
                pop: true
            };
        }

}

hasItVideo(index, page) {
    let checkVideo = this.contentObject.content[index].video;

    if ((checkVideo === undefined) || (!checkVideo)) {
            this.currentIfame = false;
            this.basicPhotos(index, page);
            this.isIframe = false;
          } else {
            this.basicVideo(index, page);
            this.isIframe = true;
        }
}

nextItem() {

    let numberOfItems = this.contentObject.content.length;
    this.counter ++;

            if (numberOfItems === this.counter) {
                this.counter = 0;
            }
            this.checkWhichPage(this.counter);
    }

previousItem() {

    let numberOfItems = this.contentObject.content.length;
    this.counter --;

            if (this.counter === -1) {
                this.counter = numberOfItems - 1;
            }
    this.checkWhichPage(this.counter);
}

clickBox(event) {
    if ((event.srcElement.nodeName !== 'A') && (event.srcElement.className !== 'popUpWrap')
    && (event.srcElement.className.indexOf('popUpContainer') === -1)) {
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

        });
    detectAspect();
    this.winResize(detectAspect);

}

winResize(callback) {
    window.addEventListener('resize', () => callback() );
}

columsClasses(value) {
    this.down = value;
}

newsPopAspect(value) {
    this.widerNews = value;
}

portWider(value) {
    this.isPortWider = value;
}

portraitNewsPhotos(value) {
    this.port = value;
}

toTallBox(value) {
    this.isItTooTall = value;
}

}
