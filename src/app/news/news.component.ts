
import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpgetService } from '../common.services/httpget.service';
import { ColumnsDirective } from './news.directives/columns.directive';
import { PopUpInitComponent } from '../directives/popup.component';
import { StyleRemove } from '../common.services/styleRemove.pipe';

    @Component({
        selector: 'my-news-component',
        moduleId: module.id,
        template: require('./news.template.html'),
        providers: [HttpgetService],
        directives: [ColumnsDirective, PopUpInitComponent],
        pipes: [StyleRemove]
        })


export class NewsComponent implements OnInit, OnDestroy {

@HostBinding('class') class = 'ng-animate view';

private data: Object;
private wholeContent: Object;
private coulmnsData: Object;
private htmlObject: Object;
private down: Boolean;
private subscription: any;

constructor (private httpgetService: HttpgetService, private route: ActivatedRoute) {}


    ngOnInit() {

        this.subscription = this.route.params.subscribe(params => {
            let routeSegment = params['new'];
               this.getSortedData(routeSegment);
       });
     }


    getSortedData(routeSegment) {

       this.httpgetService.getApiData('news')
            .subscribe(
                response => {
                    this.data = response;
                    this.wholeContent = this.prepObj(response);
                    this.coulmnsData = this.prepPhotoDimensions(response);
                     if (routeSegment !== undefined) {
                        this.popUpActivateByRoute(response, routeSegment);
                    }

                }

            );
    }

    prepObj(res) {
     return res.reduce(function(all, item){
            if (item.meta.news_popup_photo) {
                  all.push({
                    photo: {
                            url: item.meta.news_popup_photo.url,
                            aspect: item.meta.news_popup_photo.width / item.meta.news_popup_photo.height,
                            width: item.meta.news_popup_photo.width,
                            height: item.meta.news_popup_photo.height
                            },
                    video: item.meta.news_video.html,
                    text: '<h1>' + item.title + '</h1><h2>' + item.meta.news_short_description + '</h2>' + item.content,
                    title: item.title.replace(/\s+/g, '-').toLowerCase()
                    });
                } else {
                 all.push({
                    photo: {
                            url: item.meta.news_photo.url,
                            aspect: item.meta.news_photo.width / item.meta.news_photo.height,
                            width: item.meta.news_photo.width,
                            height: item.meta.news_photo.height
                            },
                     video: item.meta.news_video.html,
                     text: '<h1>' + item.title + '</h1><h2>' + item.meta.news_short_description + '</h2>' + item.content,
                    title: item.title.replace(/\s+/g, '-').toLowerCase()
                    });
                }
             return all;
    }, []);
}

popUpActivate(index: number) {
    this.htmlObject = {
        content: this.wholeContent,
        itemClicked: index,
        page: 'news'
    };
}

popUpActivateByRoute(res, routeSegment) {

let current =  res.reduce((all, item, index) => {

    if (item.title.replace(/\s+/g, '-').toLowerCase() === routeSegment) {
            all = index;
        }
        return all;
    }, 0);

    this.htmlObject = {
        content: this.wholeContent,
        itemClicked: current,
        page: 'news'
    };
}


  onPopOff(off: boolean) {

      this.htmlObject = off;
  }

prepPhotoDimensions(res) {

return {
        width: res[0].meta.news_photo.width,
        height: res[0].meta.news_photo.height,
        pop: false
    };

}

columsClasses(value) {
    this.down = value;
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}

}
