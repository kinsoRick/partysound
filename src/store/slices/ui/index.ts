import { combineReducers } from '@reduxjs/toolkit';
import epicReducer from './epic';
import modalsReducer from './modals';
import alertReducer from './alert';

const uiReducer = combineReducers({
  epic: epicReducer,
  modals: modalsReducer,
  alert: alertReducer,
});

export default uiReducer;
