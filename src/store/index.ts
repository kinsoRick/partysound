import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import uiReducer from './slices/ui';
import userReducer from './slices/user';
import configReducer from './slices/config';
import friendsReducer from './slices/friends';

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  config: configReducer,
  friends: friendsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
