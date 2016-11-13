import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';

import { HttpgetService } from '../shared/httpget.service';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { DataActions } from '../../actions/data-actions';


@Component({
  selector: 'my-about',
  templateUrl: './about.component.html',
        animations: [
            trigger('routeAnimation', [
            state('*',
                style({
                opacity: 1
                })
            ),
            transition('void => *', [
                style({
                opacity: 0
                }),
                animate('1s ease-in')
            ]),
            transition('* => void', [
                animate('.8s ease-out', style({
                opacity: 0
                }))
            ])
            ])
        ]
})
export class AboutComponent implements OnInit {

    @HostBinding('class') class = 'animation';

    @HostBinding('@routeAnimation') get routeAnimation() {
        return true;
    }
    
    @select(['data', 'applicationData', 'about']) aboutData$: Observable<any>;

private pageContent: any;
private aboutPhoto: any;
private columnRight: any;


  constructor(public httpgetService: HttpgetService, public actions: DataActions) {}

    ngOnInit() {
        this.aboutData$.subscribe(
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
    getDataFromService(url) {
        this.httpgetService.getApiData(url)
            .subscribe(response => this.actions.dataChange(response, url));
    }

}
