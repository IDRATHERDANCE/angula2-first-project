import {Component, OnInit} from '@angular/core';
import {RouteSegment} from '@angular/router';

import {HttpgetService} from '../../../common.services/httpget.service';
import {OrientationDirective} from './projects.directives/orientation.directive';
import {PopUpInitDirective} from '../../../directives/popup.directive';
import {CarouselDirective} from './projects.directives/carousel.directive';
   
    @Component({
        selector: 'project-component',
        moduleId: module.id,
        templateUrl: './template/project.template.html',
        providers: [HttpgetService],
        host: {'class' : 'ng-animate view'},
        directives: [OrientationDirective, PopUpInitDirective, CarouselDirective]
        })

export class ProjectComponent implements OnInit {
private counter: number = 0;

constructor (private httpgetService:HttpgetService, routeSegment: RouteSegment) {
  this.route = routeSegment.urlSegments[0].segment; 
}

ngOnInit() {
    this.getSortedData();
    this.leftArrow = "images/left2.png";
    this.rightArrow = "images/right2.png";
    this.noMorePhotosLeft = true;
    }  


getSortedData(){
    this.httpgetService.getApiData()
        .subscribe(
            response => {
                this.headline = this.prepObj(response, this.route).title;
                this.sub = this.prepObj(response, this.route).meta.work_short_description;
                this.content = this.prepObj(response, this.route).content;
                this.carousel = this.prepCar(this.prepObj(response, this.route)).slice(1);
                this.firstPhoto = this.prepCar(this.prepObj(response, this.route))[0].photo.url;
                this.wholeContent = this.prepCar(this.prepObj(response, this.route));
                this.photoCarouselLengthFn(this.prepCar(this.prepObj(response, this.route)).length-1);
            }
        ) 
}
    
    prepObj(res, route){ 
        return res.reduce(function(all, item){
           let title = item.title.replace(/\s+/g, '-').toLowerCase();
            if (title===route){
                return item;
            }
             return all   
        }, {});
   }
    
   
   prepCar(data){
           
        let metaInside = data.meta, 
            meta = Object.keys(metaInside);
       
            return meta.reduce(function(all, item, index){

                if ((item.indexOf('work_main_photo')===-1)&&(item.indexOf('links')===-1)&&(metaInside[item])&&(item.indexOf('work_photo_')>-1)) { 
                      all.push({
                        photo: {
                                url: metaInside[item].url,
                                aspect: metaInside[item].width/metaInside[item].height
                                }
                        }) 
                    }
                    return all 
                 }, []);       

    }

popUpActivate(index: number) {
        this.htmlObject = {
            content: this.wholeContent,
            itemClicked: index,
            page: 'work'
        };

    }
    
onPopOff() { 
    this.htmlObject = false;
}  

    
photoCarouselLengthFn(photoLenght){
    this.noMorePhotosRight = (photoLenght <= 4) ? true : false;
    this.carouselLength = photoLenght;
}    
    
    

leftCarouselArrow(){
    this.counter --
} 

rightCarouselArrow(){
    this.counter ++
}    

translateC(value: string){
    this.translateCarousel = value;
}
    
noMorePhotosL(value: boolean){
    this.noMorePhotosLeft = value;
}   
    
noMorePhotosR(value: boolean){
    this.noMorePhotosRight = value;
}
   
isItPortrait(value) {
    this.isPortrait = value;
}

isTextTooLong(value) {
    this.isTextLong = value;
}

}