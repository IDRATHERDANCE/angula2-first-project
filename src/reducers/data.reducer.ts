import { DataActions } from '../actions/data-actions';
import  InitialSate  from '../store/initial.state';
import { AppState } from '../store/state.interface';


export default (state: AppState = InitialSate, action: any): Object => {
  switch (action.type) {
    case DataActions.CHANGE_DATA:

    const nextChangeData = (<any>Object).assign({}, state);
    const localKey = action.position;

        nextChangeData.routeData[localKey] = action.data;

    return nextChangeData;

    case DataActions.CHANGE_MENU:

    const nextChangeMenu = (<any>Object).assign({}, state);
    nextChangeMenu.subMenu = [...action.data];
    return nextChangeMenu;

    case DataActions.PRESENT_MENU:

    const nextMenuPresent = (<any>Object).assign({}, state);
    nextMenuPresent.menuPresent = action.data;

    return nextMenuPresent;

    case DataActions.POP_UP:

    const nextPoUp = (<any>Object).assign({}, state); 
    nextPoUp.popUp = action.data;

    return nextPoUp;

    default:
      return state;
  }
}


