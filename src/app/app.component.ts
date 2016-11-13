import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { NgRedux, select  } from 'ng2-redux';
import reducer from '../reducers/index';
import { DataActions } from '../actions/data-actions';
import { enhancers } from '../store';
import  InitialState  from '../store/initial.state';
import { AppState } from '../store/state.interface';

import { TopService } from './shared/top.service';

const createLogger = require('redux-logger');


import '../style/index.scss';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {


    @select(['data', 'subMenu']) menuData$: Observable<any>;

private subscription: any;
private isItWorkValue: Boolean;
private isItSplashValue: Boolean;
private _url: string;



  constructor(
    private ngRedux: NgRedux<AppState>,
    private _router: Router, 
    private _renderer: Renderer,
    private _element: ElementRef, 
    private _topService: TopService,
    public actions: DataActions
  ) { 

    const middleware = [  /* createLogger() */ ];

    this.ngRedux.configureStore(reducer, InitialState, middleware, enhancers); 
  }

  ngOnInit() { 

      this.subscription = this._router.events.subscribe( () => { 
          this.isItWorkValue = (this._router.url.indexOf('/work') > - 1) ? true : false;
          this.isItSplashValue = (this._router.url === '/' ) ? false : true;

          let body = this._element.nativeElement.parentElement,
              html = body.parentElement;         
              this._topService.setTop([body, html], this._renderer);
                  
      });

  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

}
