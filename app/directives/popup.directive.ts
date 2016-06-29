import {Component, Input, EventEmitter, Output, ElementRef, OnChanges} from '@angular/core';
import {Location} from '@angular/common'

import {ColumnsDirective} from '../routes/news/news.directives/columns.directive';


@Component ({
    selector: 'popUpInit',
    moduleId: module.id,
    templateUrl: './template/popup.template.html',
      host: { 
        '(document:keydown)': 'keydown($event)',
        '(document:wheel)': 'scrollOff($event)', 
        '(document:mousewheel)': 'scrollOff($event)' 
    },
    directives: [ColumnsDirective]

      
    })

export class PopUpInitDirective implements OnChanges{
    
    @Input() contentObject: Object; 
    @Output() onPopOff = new EventEmitter<boolean>();
    counter: number = 0;
    justPhoto: boolean;
    hasVideo: boolean;
    aspect: number;
        
constructor (private element: ElementRef, location:Location) {
    this.location = location;
} 
    
ngOnChanges(){
    this.counter = this.contentObject.itemClicked;
    this.checkWhichPage(this.contentObject.itemClicked); 
}

 

    
checkWhichPage(index) { 
    
    this.isItNews = false;

    let page = this.contentObject.page,
        title = this.contentObject.content[index].title;
    
        if (page==='work') {   
            this.photo100height = true;
            this.basicPhoto(index);
        } else { 

        this.location.go(page+'/'+title)    
            
        if (page==='exhibitions') {
            this.basicPhoto(index);
            this.text = this.contentObject.content[index].text;
        }

         if (page==='press') {
             this.hasItVideo(index, page)
             this.text = this.contentObject.content[index].text; 
        }

        if (page==='news') {
             this.hasItVideo(index, page);
             this.newsText = this.contentObject.content[index].text.replace(/style=.*"/g, '').replace(/<em>/g, '').replace(/<\/em>/g, '');
             this.photo100height = true;
             this.isItNews = true;
        }
    }
}    

basicPhoto(index, page) { 
    
        if (page==='news'){
            this.currentPhoto = false;
            this.coulmnsData = {
                width: this.contentObject.content[this.counter].photo.width,
                height: this.contentObject.content[this.counter].photo.height,
                pop: true,
                photoUrl: this.contentObject.content[index].photo.url
            };
  
        } else {
            this.currentPhoto = this.contentObject.content[index].photo.url;
            this.checkAspect(this.contentObject.content[index].photo.aspect);
        }
}

basicVideo(index, page){
     this.currentPhoto = false;
let iframe = this.contentObject.content[index].video; 
    this.currentIfame = iframe.substring(iframe.lastIndexOf("https:"), iframe.lastIndexOf("width")-2) + '?autoplay=0&amp;title=0&amp;byline=0&amp;portrait=0&amp;loop=0&amp;api=0&amp;player_id=&amp;start=0';
    this.wider = false;
    
    if (page==='news'){ 
            this.coulmnsData = {
                width: 16,
                height: 8.67,
                pop: true
            };
        }
    
} 

hasItVideo(index, page){
    let checkVideo = this.contentObject.content[index].video;
    
    if ((checkVideo===undefined)||(!checkVideo)){ 
            this.currentIfame = false;
            this.basicPhoto(index, page);
            this.isIframe = false; 
          } else {
            this.basicVideo(index, page);
            this.isIframe = true; 
        }
}    
    

nextItem() { 
   
    let numberOfItems = this.contentObject.content.length;
    this.counter ++    
     
            if (numberOfItems===this.counter){
                this.counter = 0;
            } 
            this.checkWhichPage(this.counter);
    }  
  
previousItem() { 
   
    let numberOfItems = this.contentObject.content.length; 
    this.counter --  
   
            if (this.counter === -1){
                this.counter = numberOfItems-1;
            } 
    this.checkWhichPage(this.counter);
} 
    
clickBox(event){ 
    if ((event.srcElement.nodeName!=='A')&&(event.srcElement.className!=='popUpWrap')&&(event.srcElement.className.indexOf('popUpContainer')===-1)){
     this.nextItem();     
        } else {
            this.onPopOff.emit(false);
            this.location.go(this.contentObject.page) 
        }
}    
    
    
clickArrow(event){
    if (event.target.classList.value.indexOf('Right')>-1){
        this.nextItem(); 
    } else {
       this.previousItem(); 
    }
}    

// keydown events    
keydown(event: KeyboardEvent) {  

    // esc key kills the pop-up
    if ((event.keyCode)===27){
         this.onPopOff.emit(false);
    }
    // space bar and right arrow move to the next pop-up right
    if ((event.keyCode===32)||(event.keyCode===39)||(event.keyCode===38)){
        event.preventDefault();
            this.nextItem();
    }
    // back space and left arrow move to the next pop-up right
    if ((event.keyCode===37)||(event.keyCode===8)||(event.keyCode===40)){
        event.preventDefault();
            this.previousItem();
    }
  }   

scrollOff(event){
    event.preventDefault();
}

checkAspect(aspect){
          
    let detectAspect () => {

        let windowAspect = window.innerWidth/window.innerHeight;
        
                if (windowAspect >= aspect){
                    this.wider = true;
                } else {
                    this.wider = false;
                }
        
        }
    detectAspect();
    this.winResize(detectAspect)

}  
     
    
    
winResize(callback){
    window.addEventListener('resize', function() { 
        callback();
    });     
}    
    

columsClasses(value){
    this.down = value;
}    
    
newsPopAspect(value){
    this.widerNews = value;
}   

portWider(value){
    this.isPortWider = value;
}      

portraitNewsPhotos(value){
    this.port = value;
} 

toTallBox(value){
    this.isItTooTall = value;
}  

CurrPhoto(value){
    this.currentPhoto = value;
}
 
   

} // end of class