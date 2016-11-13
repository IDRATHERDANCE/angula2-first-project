import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import * as Redux from 'redux';
import { AppState } from '../store/state.interface';

@Injectable()
export class DataActions {
  constructor (private _ngRedux: NgRedux<AppState>) {}

  static CHANGE_DATA: string = 'CHANGE_DATA';
  static CHANGE_MENU: string = 'CHANGE_MENU';

  dataChange(data, url): void {
    this._ngRedux.dispatch({ type: DataActions.CHANGE_DATA, data, position: url });
  }
  
  manuChange(data): void {
    this._ngRedux.dispatch({ type: DataActions.CHANGE_MENU, data });
  }

}
