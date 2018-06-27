import { Component, OnInit, HostBinding, ViewContainerRef, 
    ViewChild, Renderer2, AfterViewInit, 
    ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TopService } from '../shared/top.service';
import { CommonCalls } from '../shared/commonCalls.service';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { routerAnimation } from '../shared/router.animations';
import { PrepareObj } from '../shared/prepareObjects.service';

    @Component({
        selector: 'project', // tslint:disable-line
        templateUrl: './project.template.html',
        styleUrls: ['./project.component.scss'],
        animations: [routerAnimation()],
        changeDetection: ChangeDetectionStrategy.OnPush
        })

export class ProjectComponent implements OnInit, AfterViewInit {

    @select(['applicationData', 'routeData', 'work']) workData$: Observable<any>;
    @ViewChild('mainImage', { read: ViewContainerRef })
    @ViewChild('textBox', { read: ViewContainerRef })
    @HostBinding('@routeAnimation')

public headline: String;
public sub: String;
public content: String;
public carousel: Object;
public firstPhoto: String;
private wholeContent: Object;
public htmlObject: any;
public isPortrait: boolean;
public isTextLong: boolean;
private _routeSegment: string;
private _url = 'work';

    constructor (
        private route: ActivatedRoute, 
        public viewContainerRef: ViewContainerRef,
        private _prepObj: PrepareObj,
        private _topService: TopService,
        private _renderer: Renderer2,
        private _common: CommonCalls,
        private _changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit() {
        this.headline = this.sub = '';
        this.route.params.subscribe(params => this._routeSegment = params['project']);
        this._common.calls(this._url, this.workData$, 
            response => this.populateResponse(response)
        );
    }

    populateResponse(response) {
        this._changeDetectorRef.markForCheck();

        const resObj = this.formatResponse(response);
            this.headline = resObj.headline;
            this.sub = resObj.sub;
            this.content = resObj.content;
            this.carousel = resObj.carousel;
            this.firstPhoto = resObj.firstPhoto;
            this.wholeContent = resObj.wholeContent;
            this._common.setMenu(response);
    }   

    formatResponse(res) {
        const resObj = this.prepObj(res, this._routeSegment);
        return {
            headline: resObj.title,
            sub: resObj.acf.work_short_description,
            content: resObj.content,
            carousel: this.prepCar(resObj).slice(1),
            firstPhoto: this.prepCar(resObj)[0].photo.url,
            wholeContent: this.prepCar(resObj),
            keywords: resObj.terms.post_tag
        }
    }
    
    ngAfterViewInit() {
        this._topService.setTop(this._renderer);
    }

    prepObj(res, route) {
        return res.filter(item => this._prepObj.formateTitle(item) === route)[0];
    }

    prepCar(data) { 
        const metaInside = data.acf;
        const meta = Object.keys(metaInside);
        const video = metaInside.work_video;
        const firstVideo = {
            photo: {
                url: video.thumbnail_url_with_play_button,
                aspect: video.width / video.height
            },
            video: video.html
        };
        
        const imagesArray = meta.reduce( (all, item) => {  
                
            if ((item.indexOf('work_main_photo') === - 1) && (item.indexOf('work_short_description') === - 1) 
                && (metaInside[item])) {
                    all.push({
                        photo: {
                            url: metaInside[item].url || metaInside[item].thumbnail_url_with_play_button,
                            aspect: metaInside[item].width / metaInside[item].height
                        }
                    });
                }
                return all;
                }, []);

            imagesArray.splice( 1, 0, firstVideo);
            
            return imagesArray;
    }

    popUpActivate(index: number) {
        this.htmlObject = this._prepObj.htmlObj(index, this._url, this.wholeContent);
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

}
