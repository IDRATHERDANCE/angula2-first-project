import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { SubMenuComponent } from './directives/subMenu.component';
import '../style/app.scss';


@Component({
    selector: 'my-app',
    directives: [...ROUTER_DIRECTIVES, SubMenuComponent],
    template: require('./app.component.html'),
    styles: [require('./app.component.scss')]
})

export class AppComponent implements OnInit, OnDestroy {

private subscription: any;
private isItWorkValue: Boolean;
private isItSplashValue: Boolean;

constructor(public router: Router) {}

ngOnInit() {

    this.subscription = this.router.events.subscribe( () => {
        this.isItWorkValue = (this.router.url.indexOf('/work') > - 1) ? true : false;
        this.isItSplashValue = (this.router.url === '/' ) ? false : true;

    });
}

ngOnDestroy() {
    this.subscription.unsubscribe();
}

}

