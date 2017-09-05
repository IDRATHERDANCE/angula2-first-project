import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { NgRedux, select  } from '@angular-redux/store';
import reducer from '../reducers/index';
import { DataActions } from '../actions/data-actions';
import { enhancers } from '../store';
import  InitialState  from '../store/initial.state';
import { AppState } from '../store/state.interface';
// const createLogger = require('redux-logger');

import { fadeIn } from './shared/fadeIn.animation';
import '../style/index.scss';

@Component({
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
  animations: [fadeIn()]
})

export class AppComponent implements OnInit {
    
  @select(['applicationData', 'subMenu']) menuData$: Observable<any>;
  @select(['applicationData', 'menuPresent']) menuPresData$: Observable<any>;
  @select(['applicationData', 'popUp']) popUp$: Observable<any>; 

private subscriptionRoute: any;
private subscriptionReduxMenuArray: any;
private subscriptionReduxMenuPres: any;
private subscriptionReduxPop: any;
private isItWorkValue: Boolean;
private isItSplashValue: Boolean;
private _haveSubmenuFlag: Boolean = false;
private _popIsUpFlag: Boolean = false;
private _subMenuArray: Array<string>;



  constructor(
    private ngRedux: NgRedux<AppState>,
    private _router: Router, 
    public actions: DataActions,
    private _changeDetectorRef: ChangeDetectorRef
  ) { 

    const middleware = [  /* createLogger() */ ];

    this.ngRedux.configureStore(reducer, InitialState, middleware, enhancers); 
  
  }

  ngOnInit() {  
  
      this.subscriptionRoute = this._router.events.subscribe( () => { 
          this.isItWorkValue = (this._router.url.indexOf('/work') > - 1) ? true : false;
          this.isItSplashValue = (this._router.url === '/' ) ? false : true;
      });

      this.subscriptionReduxMenuPres = this.menuPresData$.subscribe( response => this._haveSubmenuFlag = !!response); 
      
      this.subscriptionReduxPop = this.popUp$.subscribe( response => {
        this._popIsUpFlag = response
        this._changeDetectorRef.detectChanges();
      }); 

      this.subscriptionReduxMenuArray = this.menuData$.subscribe( response => {
        this._subMenuArray = response
        this._changeDetectorRef.detectChanges();
      }); 

  }

}
