import { Component, OnInit, Renderer2, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding } from '@angular/core';

import { TopService } from '../shared/top.service';
import { CommonCalls } from '../shared/commonCalls.service';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { routerAnimation } from '../shared/router.animations';



@Component({
    selector: 'about', // tslint:disable-line
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: [routerAnimation()],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit, AfterViewInit {
    
    @select(['applicationData', 'routeData', 'about']) aboutData$: Observable<any>;
    @HostBinding('@routeAnimation')

public pageContent: any;
public aboutPhoto: any;
public columnRight: any;
private _url = 'about'


  constructor(
    public topService: TopService,
    public _renderer: Renderer2,
    public common: CommonCalls,
    private _changeDetectorRef: ChangeDetectorRef) {}
   
    ngAfterViewInit() {
        this.topService.setTop(this._renderer);
    }

    ngOnInit() {
        this.common.calls(this._url, this.aboutData$, 
            response => this.populateResponse(response)
        );  

    }

    populateResponse(response) { 
        
        this._changeDetectorRef.markForCheck();

        const resObj = this.formatResponse(response);

            this.pageContent = resObj.content;
            this.aboutPhoto = resObj.photo;
            this.columnRight = resObj.columnRight;  
    }
    
    formatResponse(res) {
        return {
            content: res[0].content,
            photo: res[0].acf.about_photo,
            columnRight: res[0].acf.column_right
        }
    }
}
