import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { TopService } from './shared/top.service';


import '../style/index.scss';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

private subscription: any;
private isItWorkValue: Boolean;
private isItSplashValue: Boolean;

constructor(private _router: Router, private _renderer: Renderer, private _element: ElementRef, private _topService: TopService) {}

ngOnInit() {

    this.subscription = this._router.events.subscribe( () => {
        this.isItWorkValue = (this._router.url.indexOf('/work') > - 1) ? true : false;
        this.isItSplashValue = (this._router.url === '/' ) ? false : true;

        let body = this._element.nativeElement.parentElement,
            html = this._element.nativeElement.parentElement.parentElement;
            this._topService.setTop([body, html], this._renderer);
    });
}

ngOnDestroy() {
    this.subscription.unsubscribe();
}
}
