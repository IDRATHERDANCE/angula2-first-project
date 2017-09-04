import { Component, OnInit, OnDestroy, HostBinding, Renderer2, AfterViewInit } from '@angular/core';

import { HttpgetService } from '../shared/httpget.service';
import { TopService } from '../shared/top.service';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { DataActions } from '../../actions/data-actions';
import { routerAnimation } from '../shared/router.animations';
import { UnsubscribeService } from '../shared/unsubscribe.service';

    @Component({
        selector: 'contact-component',
        templateUrl: './contact.template.html',
        styleUrls: ['./contact.component.scss'],
        animations: [routerAnimation()],
        host: {'[@routeAnimation]': ''}
        })

export class ContactComponent implements OnInit, OnDestroy, AfterViewInit {

    @HostBinding('class') class = 'animation';

    @select(['applicationData', 'routeData', 'contact']) contactData$: Observable<any>;

private data: Object;
private subscriptionXHR: any;
private subscriptionRedux: any;

constructor (
    private _httpgetService: HttpgetService, 
    public actions: DataActions, 
    private _unsubsc: UnsubscribeService,
    private _topService: TopService,
    private _renderer: Renderer2) {}

    ngOnInit() { 
       this.subscriptionRedux = this.contactData$.subscribe(
            response => { 
                if (response.length > 0) {
                    this.data = response[0].content;
                } else {
                    this.getDataFromService('contact');
                }
        });
    }

    ngAfterViewInit() {
        this._topService.setTop(this._renderer);
    }
    
    getDataFromService(url) {
        this.subscriptionXHR = this._httpgetService.getApiData(url)
            .subscribe(response => this.actions.dataChange(response, url));
    }
    
    ngOnDestroy() {
        this._unsubsc.unsubscribe(this);
    }

}




