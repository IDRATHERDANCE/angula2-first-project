import { Component, OnDestroy, OnInit, HostBinding, ViewContainerRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpgetService } from '../shared/httpget.service';
import { TopService } from '../shared/top.service';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { DataActions } from '../../actions/data-actions';
import { routerAnimation } from '../shared/router.animations';
import { PrepareObj } from '../shared/prepareObjects.service';
import { UnsubscribeService } from '../shared/unsubscribe.service';

    @Component({
        selector: 'project-component',
        templateUrl: './project.template.html',
        styleUrls: ['./project.component.scss'],
        animations: [routerAnimation()],
        host: {'[@routeAnimation]': ''}
        })

export class ProjectComponent implements OnInit, OnDestroy, AfterViewInit {

    @HostBinding('class') class = 'animation';
    @select(['applicationData', 'routeData', 'work']) workData$: Observable<any>;
    @ViewChild('mainImage', { read: ViewContainerRef })
    @ViewChild('textBox', { read: ViewContainerRef })

private headline: String;
private sub: String;
private content: String;
private carousel: Object;
private firstPhoto: String;
private wholeContent: Object;
private htmlObject: any;
private subscriptionRoute: any;
private subscriptionXHR: any;
private subscriptionRedux: any;
private isPortrait: boolean;
private isTextLong: boolean;
private _routeSegment: string;

    constructor (
        public actions: DataActions, 
        public httpgetService: HttpgetService, 
        private route: ActivatedRoute, 
        public viewContainerRef: ViewContainerRef,
        private _prepObj: PrepareObj,
        private _unsubsc: UnsubscribeService,
        private _topService: TopService,
        private _renderer: Renderer2) {}

    ngOnInit() {

        this.subscriptionRoute = this.route.params.subscribe(params => { 
            this._routeSegment = params['project'];
        });

        this.subscriptionRedux = this.workData$.subscribe( 
            response => { 
                if (response.length > 0) { 
                    this.headline = this.prepObj(response, this._routeSegment).title;
                    this.sub = this.prepObj(response, this._routeSegment).acf.work_short_description;
                    this.content = this.prepObj(response, this._routeSegment).content;
                    this.carousel = this.prepCar(this.prepObj(response, this._routeSegment)).slice(1);
                    this.firstPhoto = this.prepCar(this.prepObj(response, this._routeSegment))[0].photo.url;
                    this.wholeContent = this.prepCar(this.prepObj(response, this._routeSegment));
                } else {
                    this.getDataFromService('work');
            }
        });

    }

    ngAfterViewInit() {
        this._topService.setTop(this._renderer);
    }
  
    getDataFromService(url) {
        this.subscriptionXHR = this.httpgetService.getApiData(url)
            .subscribe(response => { 
                const menuArray = response.map(item => this._prepObj.formateTitle(item));
                    this.actions.dataChange(response, url);
                    this.actions.menuChange(menuArray);
                    this.actions.menuPresent(true);
            });
    }

    prepObj(res, route) {
        return res.reduce( (all, item) => {
            const title = this._prepObj.formateTitle(item);
            if (title === route) {
                return item;
            } 
             return all;
        }, {});
    }

    prepCar(data) { 
        const metaInside = data.acf,
            meta = Object.keys(metaInside);

            return meta.reduce( (all, item) => {  
                
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
        this.htmlObject = this._prepObj.htmlObj(index, 'work', this.wholeContent);
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
        this._unsubsc.unsubscribe(this);
    }

}
