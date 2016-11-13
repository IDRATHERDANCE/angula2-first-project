import { Component, OnDestroy, OnInit, HostBinding, trigger,
        transition, animate, style, state } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpgetService } from '../../shared/httpget.service';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { DataActions } from '../../../actions/data-actions';

    @Component({
        selector: 'my-project-component',
        templateUrl: ('./project.template.html'),
        animations: [
            trigger('routeAnimationFake', [
            state('*',
                style({
                opacity: 1
                })
            ),
            transition('* => *', [
                style({
                opacity: 0
                }),
                animate('1s ease-in')
            ])
            ])
        ]
        })



export class ProjectComponent implements OnDestroy {

    @HostBinding('class') class = 'animation';
    @select(['data', 'applicationData', 'work']) workData$: Observable<any>;


private headline: String;
private sub: String;
private content: String;
private carousel: Object;
private firstPhoto: String;
private wholeContent: Object;
private htmlObject: any;
private subscription: any;
private isPortrait: boolean;
private isTextLong: boolean;
private nextFlag: boolean;

    constructor (public actions: DataActions, public httpgetService: HttpgetService, private route: ActivatedRoute) {

        this.subscription = this.route.params.subscribe(params => {
            let routeSegment = params['project'];
                this.nextFlag = false;
                 setTimeout(() => { this.nextFlag = true; }, 0);

        this.workData$.subscribe( 
            response => { 
                if (response.length > 0) { 
                    this.headline = this.prepObj(response, routeSegment).title;
                    this.sub = this.prepObj(response, routeSegment).acf.work_short_description;
                    this.content = this.prepObj(response, routeSegment).content;
                    this.carousel = this.prepCar(this.prepObj(response, routeSegment)).slice(1);
                    this.firstPhoto = this.prepCar(this.prepObj(response, routeSegment))[0].photo.url;
                    this.wholeContent = this.prepCar(this.prepObj(response, routeSegment));
                } else {
                    this.getDataFromService('work');
            }
        });
        });
    }
  
    getDataFromService(url) {
        this.httpgetService.getApiData(url)
            .subscribe(response => { 
                let menuArray = response.map(item => item.title.replace(/\s+/g, '-').toLowerCase());
                    this.actions.dataChange(response, url);
                    this.actions.manuChange(menuArray);
            });
    }


    prepObj(res, route) {
        return res.reduce( (all, item) => {
           let title = item.title.replace(/\s+/g, '-').toLowerCase();
            if (title === route) {
                return item;
            } 
             return all;
        }, {});
   }

   prepCar(data) { 
        let metaInside = data.acf,
            meta = Object.keys(metaInside);

            return meta.reduce( (all, item, index) => {  
                
                if ((item.indexOf('work_main_photo') === - 1) && (item.indexOf('work_short_description') === - 1) 
                    && (metaInside[item])) {
                      all.push({
                        photo: {
                                url: metaInside[item].url,
                                aspect: metaInside[item].width / metaInside[item].height
                                }
                        });
                    }
                    return all;
                 }, []);
    }

    popUpActivate(index: number) {
        this.htmlObject = {
            content: this.wholeContent,
            itemClicked: index,
            page: 'work',
            winScrl: window.scrollY
        };
    }

    onPopOff() {
        this.htmlObject = false;
    }

    isItPortrait(value) {
        this.isPortrait = value;
    }

    isTextTooLong(value) {
        this.isTextLong = value;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
