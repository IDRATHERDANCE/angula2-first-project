
import {Component, OnInit} from '@angular/core';
import {RouteSegment} from '@angular/router'

import {HttpgetService} from '../../common.services/httpget.service';
import {ColumnsDirective} from './news.directives/columns.directive';
import {PopUpInitDirective} from '../../directives/popup.directive';
import {StyleRemove} from '../../common.services/styleRemove.pipe';

    @Component({
        selector: 'news-component',
        moduleId: module.id,
        templateUrl: './template/news.template.html',
        providers: [HttpgetService],
        host: {'class' : 'ng-animate view'},
        directives: [ColumnsDirective, PopUpInitDirective]
        pipes: [StyleRemove]
        })




export class NewsComponent implements OnInit {
    
constructor (private httpgetService: HttpgetService, private routeSegment:RouteSegment) {
     this.routeSegment = routeSegment.parameters.news;
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
                    this.coulmnsData = this.prepPhotoDimensions(response);
                     if(this.routeSegment!==undefined){ 
                        this.popUpActivateByRoute(response)
                    }
                
                }

            ) 
    }
 
    prepObj(res){
     return res.reduce(function(all, item){
            if (item.meta.news_popup_photo){
                
                  all.push({
                    photo: {
                            url: item.meta.news_popup_photo.url,
                            aspect: item.meta.news_popup_photo.width/item.meta.news_popup_photo.height,
                            width: item.meta.news_popup_photo.width,
                            height: item.meta.news_popup_photo.height
                            },
                    video: item.meta.news_video.html,
                    text: '<h1>' + item.title + '</h1><h2>' + item.meta.news_short_description + '</h2>' + item.content,
                    title: item.title.replace(/\s+/g, '-').toLowerCase() 
                    }) 
                } else {
                 all.push({
                    photo: {
                            url: item.meta.news_photo.url,
                            aspect: item.meta.news_photo.width/item.meta.news_photo.height,
                            width: item.meta.news_photo.width,
                            height: item.meta.news_photo.height
                            },
                     video: item.meta.news_video.html,
                     text: '<h1>' + item.title + '</h1><h2>' + item.meta.news_short_description + '</h2>' + item.content,
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
    page: 'news' 
                
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
        page: 'news'
    }

} 
    
    
  onPopOff(off: boolean) {

      this.htmlObject = off;
  } 
    
prepPhotoDimensions(res){

let text = '<h1>' + res[0].title + '</h1><h2>' + res[0].meta.news_short_description + '</h2>' + res[0].content; 

    
return {
        width: res[0].meta.news_photo.width,
        height: res[0].meta.news_photo.height,
        pop: false
    };

}

columsClasses(value){

    this.down = value;
}
 
}