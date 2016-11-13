import { DataActions } from '../actions/data-actions';
import  InitialSate  from '../store/initial.state';
import { AppState } from '../store/state.interface';


export default (state: AppState = InitialSate, action: any): any => { 
  switch (action.type) {
    case DataActions.CHANGE_DATA:

    let localKey = action.position,
        localObject = InitialSate;
     
        localObject.data.applicationData[localKey] = action.data;

    return Object.assign({}, localObject.data);
    
    case DataActions.CHANGE_MENU:

    let menuObject = InitialSate;
        menuObject.data.subMenu = [...action.data];

    return Object.assign({}, menuObject.data);
    
    default:
      return state;
  }
}


