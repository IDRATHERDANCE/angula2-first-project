import {Component, OnInit} from '@angular/core';
import {RouteSegment} from '@angular/router'

import {HttpgetService} from '../../common.services/httpget.service';
import {PopUpInitDirective} from '../../directives/popup.directive';

    @Component({
        selector: 'exhibitions-component',
        moduleId: module.id,
        templateUrl: './template/exhibitions.template.html',
        providers: [HttpgetService],
        host: {'class' : 'ng-animate view'},
        directives: [PopUpInitDirective] 
         })






export class ExhibitionsComponent implements OnInit {
    
constructor (private httpgetService:HttpgetService, private routeSegment:RouteSegment) {
    this.routeSegment = routeSegment.parameters.exhibition;
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
     return res.reduce((all, item) => {
            if (item.meta.exhibition_popup_photo){
                    all.push({
                     photo: {
                            url: item.meta.exhibition_popup_photo.url,
                            aspect: item.meta.exhibition_popup_photo.width/item.meta.exhibition_popup_photo.height
                            },
                    text: item.content,
                    title: item.title.replace(/\s+/g, '-').toLowerCase()     
                    }) 
                } else {
                    
                  all.push({
                       photo: {
                            url: item.meta.press_photo.url,
                            aspect: item.meta.exhibition_photo.width/item.meta.exhibition_photo.height
                            },
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
        page: 'exhibitions'
    }
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
        page: 'exhibitions'
    }

}    
    
    
  onPopOff(off: boolean) {
      this.htmlObject = off;
  } 
 

    
}