import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core'; 
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { NgRedux, select  } from '@angular-redux/store';
import reducer from '../reducers/index';
import { DataActions } from '../actions/data-actions';
import { enhancers } from '../store';
import  InitialState  from '../store/initial.state';
import { AppState } from '../store/state.interface';
const logger = require('redux-logger');

import { fadeIn } from './shared/fadeIn.animation';
import '../style/index.scss';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {
    
  @select(['applicationData', 'subMenu']) menuData$: Observable<any>;
  @select(['applicationData', 'menuPresent']) menuPresData$: Observable<any>;
  @select(['applicationData', 'popUp']) popUp$: Observable<any>; 

private subscriptionRoute: any;
private subscriptionReduxMenuArray: any;
private subscriptionReduxMenuPres: any;
private subscriptionReduxPop: any;
public isItWorkValue: Boolean;
public isItSplashValue: Boolean;
public haveSubmenuFlag: Boolean = false;
public popIsUpFlag: Boolean = false;
public subMenuArray: Array<string>;
private _InitialState: any;

  constructor(
    private ngRedux: NgRedux<AppState>,
    private _router: Router, 
    public actions: DataActions,
    private _changeDetectorRef: ChangeDetectorRef
  ) { 

    const middleware = [  /* logger.createLogger() */ ];
    
    const currentStorage = window.sessionStorage.getItem('__anarajcevic.com__');
    this._InitialState = InitialState;
    if (currentStorage) this._InitialState = JSON.parse(currentStorage);
    this.ngRedux.configureStore(reducer, this._InitialState, middleware, enhancers); 
  
  }

  ngOnInit() {  
  
      this.subscriptionRoute = this._router.events.subscribe( () => { 
          this.isItWorkValue = (this._router.url.indexOf('/work') > - 1) ? true : false;
          this.isItSplashValue = (this._router.url === '/' ) ? false : true;
          this._changeDetectorRef.markForCheck();
      });

      this.subscriptionReduxMenuPres = this.menuPresData$.subscribe( response => { 
        this.haveSubmenuFlag = !!response;
        this._changeDetectorRef.markForCheck();
      }); 
      
      this.subscriptionReduxPop = this.popUp$.subscribe( response => {
        this.popIsUpFlag = response
        this._changeDetectorRef.markForCheck();
      }); 

      this.subscriptionReduxMenuArray = this.menuData$.subscribe( 
        response => {
          this.subMenuArray = response
          this._changeDetectorRef.markForCheck();
        },
        error => console.log(error),
        () => this.subscriptionReduxMenuArray.unsubscribe() 
      ); 

  }

}
