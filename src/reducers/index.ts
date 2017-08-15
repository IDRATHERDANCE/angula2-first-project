import * as Redux from 'redux';
const { combineReducers } = Redux;
import { AppState } from '../store/state.interface';
import data from './data.reducer';


const rootReducer = combineReducers<AppState>({
  applicationData: data
});

export default rootReducer;
