import { combineReducers } from '@reduxjs/toolkit';
import epicReducer from './epic.slice';
import modalsReducer from './modals.slice';

const uiReducer = combineReducers({
  epic: epicReducer,
  modals: modalsReducer,
});

export default uiReducer;
