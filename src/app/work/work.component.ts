import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';
import { DataActions } from '../../actions/data-actions';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { HttpgetService } from '../shared/httpget.service';


    @Component({
        selector: 'my-work-component',
        templateUrl: ('./work.template.html'),
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

export class WorkComponent implements OnInit {

  @HostBinding('class') class = 'animation';

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }
  
  @select(['data', 'applicationData', 'work']) workData$: Observable<any>;

  private _data: Object;

  constructor(public actions: DataActions, public httpgetService: HttpgetService) {}

    ngOnInit() {
      this.workData$.subscribe(
        response => { 
            if (response.length > 0) {
                this._data = response;
            } else {
                this.getDataFromService('work');
            }
        });
    }    
  
    getDataFromService(url) {
        this.httpgetService.getApiData(url)
            .subscribe(response => { 
                let menuArray = response.map(item => item.title.replace(/\s+/g, '-').toLowerCase());
                    this.actions.dataChange(response, url);
                    this.actions.manuChange(menuArray);
            });
    }

}


