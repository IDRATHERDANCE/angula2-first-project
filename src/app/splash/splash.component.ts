import { Component, OnInit, HostBinding } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HttpgetService } from '../common.services/httpget.service';

    @Component({
        selector: 'my-splash-component',
        moduleId: module.id,
        template: require('./splash.template.html'),
        providers: [HttpgetService],
        directives: [ROUTER_DIRECTIVES]
         })

export class SplashComponent implements OnInit {

@HostBinding('class') class = 'ng-animate view';

private splashlogo: String;
private splashText: String;
private splash: Object;

constructor (private httpgetService: HttpgetService) {}

    ngOnInit() {
        this.getSortedData();
     }

    getSortedData() {

       this.httpgetService.getApiData('splash')
            .subscribe(
                response => {
                    this.splashlogo = response[0].meta.splash_logo;
                    this.splashText = response[0].content;
                    this.splash = {
                         backgroundImage: 'url("' + response[0].meta.splash_photo + '")'
                    };
                }
            );
    }
}
