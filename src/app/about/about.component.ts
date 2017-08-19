import { Component, OnInit, OnDestroy, HostBinding, Renderer, AfterViewInit } from '@angular/core';

import { HttpgetService } from '../shared/httpget.service';
import { TopService } from '../shared/top.service';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { DataActions } from '../../actions/data-actions';
import { routerAnimation } from '../shared/router.animations';
import { UnsubscribeService } from '../shared/unsubscribe.service';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: [routerAnimation()],
    host: {'[@routeAnimation]': ''}
})
export class AboutComponent implements OnInit, OnDestroy, AfterViewInit {

    @HostBinding('class') class = 'animation';
    
    @select(['applicationData', 'routeData', 'about']) aboutData$: Observable<any>;

private pageContent: any;
private aboutPhoto: any;
private columnRight: any;
private subscriptionXHR: any;
private subscriptionRedux: any;


  constructor(
    public httpgetService: HttpgetService, 
    public actions: DataActions, 
    private _unsubsc: UnsubscribeService,
    private _topService: TopService,
    private _renderer: Renderer) {}

    ngOnInit() {
       this.subscriptionRedux = this.aboutData$.subscribe(
            response => { 
                if (response.length > 0) {
                    this.pageContent = response[0].content;
                    this.aboutPhoto = response[0].acf.about_photo;
                    this.columnRight = response[0].acf.column_right;
                } else {
                    this.getDataFromService('about');
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

    ngOnDestroy() {
        this._unsubsc.unsubscribe(this);
    }

}
