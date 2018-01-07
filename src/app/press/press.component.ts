import { Component, OnInit, Renderer2, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { routerAnimation } from '../shared/router.animations';
import { ResizeWindow } from '../shared/resize.service';
import { PrepareObj } from '../shared/prepareObjects.service';
import { TopService } from '../shared/top.service';
import { CommonCalls } from '../shared/commonCalls.service';

    @Component({
        selector: 'press', // tslint:disable-line
        templateUrl: './press.template.html',
        styleUrls: ['../exhibitions/exhi-press.component.scss'],
        animations: [routerAnimation()],
        changeDetection: ChangeDetectionStrategy.OnPush
        })

export class PressComponent implements OnInit, AfterViewInit {
  
  @select(['applicationData', 'routeData', 'press']) pressData$: Observable<any>;
  @HostBinding('@routeAnimation')


public data: Object;
private wholeContent: Object;
public htmlObject: any;
private subscriptionRoute: any;
private _routeSegment: string;
private _response: Array<Object>;
private _url = 'press';

constructor (
    private route: ActivatedRoute, 
    private _resizeWindow: ResizeWindow,
    private _prepObj: PrepareObj,
    private _topService: TopService,
    private _renderer: Renderer2,
    private _common: CommonCalls,
    private _changeDetectorRef: ChangeDetectorRef) {}


    ngOnInit() {
        
        this.subscriptionRoute = this.route.params.subscribe(params => {
            this._routeSegment = params['article'];
        });

        this._common.calls(this._url, this.pressData$, 
            response => this.populateResponse(response)
        );
    }

    populateResponse(response) {
        this._changeDetectorRef.markForCheck();
        
        const lookForResize = (() => {
            this.data = this._resizeWindow.dataTrimmed(response)
        });
        lookForResize();
        this._resizeWindow.winResize(lookForResize);
        this.wholeContent = this._prepObj.prepObj(response, 'press');
        if (this._routeSegment !== undefined) {
            this.popUpActivateByRoute(response, this._routeSegment);
        }
    }  

    ngAfterViewInit() {
        this._topService.setTop(this._renderer);
    }      

    popUpActivate(index: number) {
        this.htmlObjMethod(index); 
    }

    popUpActivateByRoute(res, routeSegment) {
        const current =  this._prepObj.getClicked(res, routeSegment);
            this.htmlObjMethod(current); 
    }
        
    htmlObjMethod(clickedCurrent) {
        this.htmlObject = this._prepObj.htmlObj(clickedCurrent, 'press', this.wholeContent);
    }

    onPopOff(off: boolean) {
        this.htmlObject = off;
    }

}
