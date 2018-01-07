import { Component, OnInit, HostBinding, Renderer2, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { routerAnimation } from '../shared/router.animations';
import { PrepareObj } from '../shared/prepareObjects.service';
import { TopService } from '../shared/top.service';
import { CommonCalls } from '../shared/commonCalls.service';


    @Component({
        selector: 'work', // tslint:disable-line
        templateUrl: './work.component.html',
        styleUrls: ['./work.component.scss'],
        animations: [routerAnimation()],
        changeDetection: ChangeDetectionStrategy.OnPush
        })

export class WorkComponent implements OnInit, AfterViewInit {
  
  @select(['applicationData', 'routeData', 'work']) workData$: Observable<any>;
  @HostBinding('@routeAnimation')

    public data: Object;
    private _url = 'work';

  constructor(
    private _prepObj: PrepareObj, 
    private _topService: TopService,
    private _renderer: Renderer2,
    private _common: CommonCalls,
    private _changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit() { 
        this._common.calls(this._url, this.workData$,
            response => this.populateResponse(response)
        );
    }

    populateResponse(response) {
        this._changeDetectorRef.markForCheck();
        
        this.data = response;
        this._common.setMenu(response);
    }

    ngAfterViewInit() {
        this._topService.setTop(this._renderer);
    }   

}


