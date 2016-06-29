import {Component, OnInit} from '@angular/core';
import {RouteSegment} from '@angular/router'

import {HttpgetService} from '../../common.services/httpget.service';
import {PopUpInitDirective} from '../../directives/popup.directive';

    @Component({
        selector: 'press-component',
        moduleId: module.id,
        templateUrl: './template/press.template.html',
        providers: [HttpgetService],
        host: {'class' : 'ng-animate view'},
        directives: [PopUpInitDirective]
        })



export class PressComponent implements OnInit {
    
constructor (private httpgetService:HttpgetService, private routeSegment:RouteSegment) {
     this.routeSegment = routeSegment.parameters.press;
}
      
  
    ngOnInit() {
        this.getSortedData();
    }  
    
    
    getSortedData(){
  
       this.httpgetService.getApiData()
            .subscribe(
                response => {  
                    this.data = response;
                    this.wholeContent = this.prepObj(response);
                    if(this.routeSegment!==undefined){
                        this.popUpActivateByRoute(response)
                    }
                      
                }

            ) 
    }
 
prepObj(res){
     return res.reduce(function(all, item){
            if (item.meta.press_popup_photo){
                 all.push({
                    photo: {
                            url: item.meta.press_popup_photo.url,
                            aspect: item.meta.press_popup_photo.width/item.meta.press_popup_photo.height
                            },
                    video: item.meta.press_video.html,
                    text: item.content,
                    title: item.title.replace(/\s+/g, '-').toLowerCase() 
                    })  
                } else {
                 all.push({
                    photo: {
                            url: item.meta.press_photo.url,
                            aspect: item.meta.press_photo.width/item.meta.press_photo.height
                            },
                    video: item.meta.press_video.html,
                    text: item.content,
                    title: item.title.replace(/\s+/g, '-').toLowerCase() 
                    })                      
                }
             return all   
    }, []);
}    
    
popUpActivate(index:number) {
    this.htmlObject = {
    content: this.wholeContent,
    itemClicked: index,
    page: 'press'
    };
}
   
    
popUpActivateByRoute(res){ 

    let current =  res.reduce((all, item, index) => {
    if (item.title.replace(/\s+/g, '-').toLowerCase()===this.routeSegment){
                all = index
        }
        return all
    }, 0);
    
    this.htmlObject = {
        content: this.wholeContent,
        itemClicked: current,
        page: 'press'
    }

}       
    
  onPopOff(off: boolean) {
      this.htmlObject = off;
  } 

    
}