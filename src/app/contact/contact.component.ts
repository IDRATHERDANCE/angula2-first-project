import { Component, OnInit, OnDestroy, HostBinding, 
    Renderer2, AfterViewInit, 
    ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { TopService } from '../shared/top.service';
import { CommonCalls } from '../shared/commonCalls.service';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { routerAnimation } from '../shared/router.animations';

    @Component({
        selector: 'contact', // tslint:disable-line
        templateUrl: './contact.template.html',
        styleUrls: ['./contact.component.scss'],
        animations: [routerAnimation()],
        changeDetection: ChangeDetectionStrategy.OnPush
        })

export class ContactComponent implements OnInit, AfterViewInit {

    @select(['applicationData', 'routeData', 'contact']) contactData$: Observable<any>;
    @HostBinding('@routeAnimation')

public data: Object;
private _url = 'contact'

constructor (
    private _topService: TopService,
    private _renderer: Renderer2,
    private _common: CommonCalls,
    private _changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit() { 
        this._common.calls(this._url, this.contactData$, 
            response => this.populateResponse(response)
        );
    }

    ngAfterViewInit() {
        this._topService.setTop(this._renderer);
    }

    populateResponse(response) {
        this._changeDetectorRef.markForCheck();
        const resObj = this.formatResponse(response);
        this.data = response[0].content;
    }

    formatResponse(res) {
        return { content: res[0].content }
    }

}




