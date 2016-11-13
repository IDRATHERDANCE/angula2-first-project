import { Component, OnInit, OnDestroy, HostBinding, trigger, transition, animate, style, state } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { HttpgetService } from '../shared/httpget.service';
import { DataActions } from '../../actions/data-actions';

    @Component({
        selector: 'my-exhibitions-component',
        templateUrl: ('./exhibitions.template.html'),
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


export class ExhibitionsComponent implements OnInit, OnDestroy {


  @HostBinding('class') class = 'animation';

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }
  
  @select(['data', 'applicationData', 'exhibitions']) exhibitionsData$: Observable<any>;


private data: Object;
private wholeContent: Object;
private htmlObject: Object;
private subscription: any;
private _routeSegment: string;

constructor (public route: ActivatedRoute, public httpgetService: HttpgetService, public actions: DataActions) {}

    ngOnInit() {

        this.subscription = this.route.params.subscribe(params => {
            this._routeSegment = params['exhibition'];
        });

        this.exhibitionsData$.subscribe(
            response => { 
                if (response.length > 0) {
                    this.data = response;
                    this.wholeContent = this.prepObj(response);
                    if (this._routeSegment !== undefined) {
                        this.popUpActivateByRoute(response, this._routeSegment);
                    }
                } else {
                    this.getDataFromService('exhibitions');
                }
        });
    }

    getDataFromService(url) {
        this.httpgetService.getApiData(url)
            .subscribe(response => this.actions.dataChange(response, url));
    }

    prepObj(res) {
     return res.reduce((all, item) => {
            if (item.acf.exhibition_popup_photo) {
                    all.push({
                     photo: {
                            url: item.acf.exhibition_popup_photo.url,
                            aspect: item.acf.exhibition_popup_photo.width / item.acf.exhibition_popup_photo.height
                            },
                    text: item.content,
                    title: item.title.replace(/\s+/g, '-').toLowerCase()
                    });
                } else {

                  all.push({
                       photo: {
                            url: item.acf.press_photo.url,
                            aspect: item.acf.exhibition_photo.width / item.acf.exhibition_photo.height
                            },
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
        page: 'exhibitions',
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
        page: 'exhibitions',
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
