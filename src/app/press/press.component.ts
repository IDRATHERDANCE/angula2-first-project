import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {HttpgetService} from '../common.services/httpget.service';
import {PopUpInitComponent} from '../directives/popup.component';

    @Component({
        selector: 'my-press-component',
        moduleId: module.id,
        template: require('./press.template.html'),
        providers: [HttpgetService],
        directives: [PopUpInitComponent]
        })

export class PressComponent implements OnInit, OnDestroy {

@HostBinding('class') class = 'ng-animate view';

private data: Object;
private wholeContent: Object;
private htmlObject: any;
private subscription: any;

constructor (private httpgetService: HttpgetService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            let routeSegment = params['singlepress'];
               this.getSortedData(routeSegment);
       });
    }

    getSortedData(routeSegment) {
       this.httpgetService.getApiData('press')
            .subscribe(
                response => {
                    this.data = response;
                    this.wholeContent = this.prepObj(response);
                    if (routeSegment !== undefined) {
                        this.popUpActivateByRoute(response, routeSegment);
                    }
                }

            );
    }

prepObj(res) {
     return res.reduce( (all, item) => {
            if (item.meta.press_popup_photo) {
                 all.push({
                    photo: {
                            url: item.meta.press_popup_photo.url,
                            aspect: item.meta.press_popup_photo.width / item.meta.press_popup_photo.height
                            },
                    video: item.meta.press_video.html,
                    text: item.content,
                    title: item.title.replace(/\s+/g, '-').toLowerCase()
                    });
                } else {
                 all.push({
                    photo: {
                            url: item.meta.press_photo.url,
                            aspect: item.meta.press_photo.width / item.meta.press_photo.height
                            },
                    video: item.meta.press_video.html,
                    text: item.content,
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
    page: 'press'
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
        page: 'press'
    };

}

onPopOff(off: boolean) {
    this.htmlObject = off;
}

ngOnDestroy() {
    this.subscription.unsubscribe();
}

}
