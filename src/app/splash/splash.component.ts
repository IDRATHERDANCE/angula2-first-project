import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { DataActions } from '../../actions/data-actions';
import { HttpgetService } from '../shared/httpget.service';

    @Component({
        selector: 'my-splash-component',
        templateUrl: './splash.template.html',
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

export class SplashComponent implements OnInit {


  @HostBinding('class') class = 'animation';

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }
  
  @select(['data', 'applicationData', 'splash']) splashData$: Observable<any>;

private splashlogo: String;
private splashText: String;
private splash: Object;

constructor (public httpgetService: HttpgetService, public actions: DataActions) {}

    ngOnInit() {
        this.splashData$.subscribe(
            response => { 
                if (response.length > 0) {
                    this.splashlogo = response[0].acf.splash_logo;
                    this.splashText = response[0].content;
                    this.splash = { backgroundImage: 'url("' + response[0].acf.splash_photo + '")' };
                } else {
                    this.getDataFromService('splash');
                }
        });
    }

    getDataFromService(url) {
        this.httpgetService.getApiData(url)
            .subscribe(response => this.actions.dataChange(response, url));
    }

}
