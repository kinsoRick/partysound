import { combineReducers } from '@reduxjs/toolkit';
import epicReducer from './epic.slice';
import modalsReducer from './modals.slice';
import alertReducer from './alert.slice';

const uiReducer = combineReducers({
  epic: epicReducer,
  modals: modalsReducer,
  alert: alertReducer,
});

export default uiReducer;
