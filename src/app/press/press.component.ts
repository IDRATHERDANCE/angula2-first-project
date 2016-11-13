import { Component, OnInit, OnDestroy, HostBinding, trigger, transition, animate, style, state } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { HttpgetService } from '../shared/httpget.service';
import { DataActions } from '../../actions/data-actions';

    @Component({
        selector: 'my-press-component',
        templateUrl: ('./press.template.html'),
        animations: [
                trigger('routeAnimation', [
                state('*',
                    style({
                    opacity: 1
                    })
                ),
                transition('void => *', [
                    style({
                    opacity: 0
                    }),
                    animate('1s ease-in')
                ]),
                transition('* => void', [
                    animate('.8s ease-out', style({
                    opacity: 0
                    }))
                ])
                ])
            ]
        })

export class PressComponent implements OnInit, OnDestroy {

  @HostBinding('class') class = 'animation';

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }
  
  @select(['data', 'applicationData', 'press']) pressData$: Observable<any>;


private data: Object;
private wholeContent: Object;
private htmlObject: any;
private subscription: any;
private _routeSegment: string;

constructor (public httpgetService: HttpgetService, public actions: DataActions, private route: ActivatedRoute) {}


    ngOnInit() {

        this.subscription = this.route.params.subscribe(params => {
            this._routeSegment = params['article'];
        });

        this.pressData$.subscribe(
            response => { 
                if (response.length > 0) {
                    this.data = response;
                    // this.wholeContent = this.prepObj(response);
                    if (this._routeSegment !== undefined) {
                        this.popUpActivateByRoute(response, this._routeSegment);
                    }
                } else {
                    this.getDataFromService('press');
                }
        });
    }

    getDataFromService(url) {
        this.httpgetService.getApiData(url)
            .subscribe(response => this.actions.dataChange(response, url));
    }




prepObj(res) {
     return res.reduce( (all, item) => {
            if (item.acf.press_popup_photo) {
                 all.push({
                    photo: {
                            url: item.acf.press_popup_photo.url,
                            aspect: item.acf.press_popup_photo.width / item.acf.press_popup_photo.height
                            },
                    video: item.acf.press_video.html,
                    text: item.content,
                    title: item.title.replace(/\s+/g, '-').toLowerCase()
                    });
                } else {
                 all.push({
                    photo: {
                            url: item.acf.press_photo.url,
                            aspect: item.acf.press_photo.width / item.acf.press_photo.height
                            },
                    video: item.acf.press_video.html,
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
    page: 'press',
    winScrl: window.scrollY
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
        page: 'press',
        winScrl: 0
    };

}

onPopOff(off: boolean) {
    this.htmlObject = off;
}

ngOnDestroy() {
    this.subscription.unsubscribe();
}

}
