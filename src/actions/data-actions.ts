import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store/state.interface';

@Injectable()
export class DataActions {
  constructor (private _ngRedux: NgRedux<AppState>) {}

  static CHANGE_DATA: string = 'CHANGE_DATA';
  static CHANGE_MENU: string = 'CHANGE_MENU';
  static PRESENT_MENU: string = 'PRESENT_MENU';
  static POP_UP: string = 'POP_UP';
  
  
  dataChange(data, url): void {
    this._ngRedux.dispatch({ type: DataActions.CHANGE_DATA, data, position: url });
  }
  
  menuChange(data): void {
    this._ngRedux.dispatch({ type: DataActions.CHANGE_MENU, data });
  }

  menuPresent(data): void {
    this._ngRedux.dispatch({ type: DataActions.PRESENT_MENU, data });
  }

  popUp(data): void {
    this._ngRedux.dispatch({ type: DataActions.POP_UP, data });
  }

}
