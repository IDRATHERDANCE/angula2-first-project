import * as Redux from 'redux';
const { combineReducers } = Redux;
import { AppState } from '../store/state.interface';
import data from './data.reducer';

const rootReducer = combineReducers<AppState>({
  data: data
});

export default rootReducer;
