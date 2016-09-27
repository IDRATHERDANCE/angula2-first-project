import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import '../style/index.scss';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

private subscription: any;
private isItWorkValue: Boolean;
private isItSplashValue: Boolean;

  constructor(private _router: Router) {}

ngOnInit() {

    this.subscription = this._router.events.subscribe( () => {
        this.isItWorkValue = (this._router.url.indexOf('/work') > - 1) ? true : false;
        this.isItSplashValue = (this._router.url === '/' ) ? false : true;
    });
}

ngOnDestroy() {
    this.subscription.unsubscribe();
}
}
