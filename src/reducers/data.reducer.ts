import { DataActions } from '../actions/data-actions';
import  InitialSate  from '../store/initial.state';
import { AppState } from '../store/state.interface';


export default (state: AppState = InitialSate, action: any): Object => {
  switch (action.type) {
    case DataActions.CHANGE_DATA:

    const localKey = action.position,
        localObject = InitialSate;

        localObject.applicationData.routeData[localKey] = action.data;

    return (<any>Object).assign({}, localObject.applicationData);

    case DataActions.CHANGE_MENU:

    const menuObject = InitialSate;
        menuObject.applicationData.subMenu = [...action.data];

    return (<any>Object).assign({}, menuObject.applicationData);

    case DataActions.PRESENT_MENU:

    const menuPresObject = InitialSate;
        menuPresObject.applicationData.menuPresent = action.data;

    return (<any>Object).assign({}, menuPresObject.applicationData);

    case DataActions.POP_UP:

    const popUpObject = InitialSate;
        popUpObject.applicationData.popUp = action.data;

    return (<any>Object).assign({}, popUpObject.applicationData);

    default:
      return state;
  }
}


