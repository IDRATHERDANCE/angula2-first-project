import { Component, OnInit, OnDestroy, HostBinding, Renderer, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { HttpgetService } from '../shared/httpget.service';
import { DataActions } from '../../actions/data-actions';
import { routerAnimation } from '../shared/router.animations';
import { ResizeWindow } from '../shared/resize.service';
import { PrepareObj } from '../shared/prepareObjects.service';
import { UnsubscribeService } from '../shared/unsubscribe.service';
import { TopService } from '../shared/top.service';


    @Component({
        selector: 'exhibitions-component',
        templateUrl: './exhibitions.template.html',
        styleUrls: ['./exhi-press.component.scss'],
        animations: [routerAnimation()],
        host: {'[@routeAnimation]': ''}
        })


export class ExhibitionsComponent implements OnInit, OnDestroy, AfterViewInit {


  @HostBinding('class') class = 'animation';
  
  @select(['applicationData', 'routeData', 'exhibitions']) exhibitionsData$: Observable<any>;


private data: Object;
private wholeContent: Object;
private htmlObject: Object;
private subscriptionRoute: any;
private subscriptionXHR: any;
private subscriptionRedux: any;
private _routeSegment: string;

constructor (
    public route: ActivatedRoute, 
    public httpgetService: HttpgetService, 
    public actions: DataActions, 
    private _resizeWindow: ResizeWindow,
    private _prepObj: PrepareObj,
    private _unsubsc: UnsubscribeService,
    private _topService: TopService,
    private _renderer: Renderer) {}

    ngOnInit() {

        this.subscriptionRoute = this.route.params.subscribe(params => {
            this._routeSegment = params['exhibition'];
        });

        this.subscriptionRedux = this.exhibitionsData$.subscribe(
            response => { 
                if (response.length > 0) {
                    const lookForResize = (() => {
                        this.data = this._resizeWindow.dataTrimmed(response)
                    });
                    lookForResize();
                    this._resizeWindow.winResize(lookForResize);
                    this.wholeContent = this._prepObj.prepObj(response, 'exhibition'); ;
                    if (this._routeSegment !== undefined) {
                        this.popUpActivateByRoute(response, this._routeSegment);
                    }
                } else {
                    this.getDataFromService('exhibitions');
                }
        });
    }
    
    ngAfterViewInit() {
        this._topService.setTop(this._renderer);
    }    

    getDataFromService(url) {
        this.subscriptionXHR = this.httpgetService.getApiData(url)
            .subscribe(response => this.actions.dataChange(response, url));
    }

    popUpActivate(index: number) {
        this.htmlObjMethod(index); 
    }

    popUpActivateByRoute(res, routeSegment) {
        let current =  this._prepObj.getClicked(res, routeSegment);
            this.htmlObjMethod(current); 
    }

    htmlObjMethod(clickedCurrent) {
        this.htmlObject = this._prepObj.htmlObj(clickedCurrent, 'exhibitions', this.wholeContent);
    }

    onPopOff(off: boolean) {
        this.htmlObject = off;
    }

    ngOnDestroy() { 
         this._unsubsc.unsubscribe(this);
    }

}
