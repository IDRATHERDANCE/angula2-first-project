import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';

import { HttpgetService } from '../shared/httpget.service';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { DataActions } from '../../actions/data-actions';

    @Component({
        selector: 'my-contact-component',
        templateUrl: './contact.template.html',
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

export class ContactComponent implements OnInit {

  @HostBinding('class') class = 'animation';

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

   @select(['data', 'applicationData', 'contact']) contactData$: Observable<any>;

private data: Object;

constructor (private _httpgetService: HttpgetService, public actions: DataActions) {}

    ngOnInit() {
        this.contactData$.subscribe(
            response => { 
                if (response.length > 0) {
                    this.data = response[0].content;
                } else {
                    this.getDataFromService('contact');
                }
        });
    }
    getDataFromService(url) {
        this._httpgetService.getApiData(url)
            .subscribe(response => this.actions.dataChange(response, url));
    }

}




