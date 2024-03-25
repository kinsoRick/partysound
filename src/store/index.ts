import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import uiReducer from './slices/ui';
import userReducer from './slices/user';
import configReducer from './slices/config';
import friendsReducer from './slices/friends';
import { internalAPI } from '../services/api';
import { vkAPI } from '../services/api/vk';

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  config: configReducer,
  friends: friendsReducer,
  [internalAPI.reducerPath]: internalAPI.reducer,
  [vkAPI.reducerPath]: vkAPI.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(internalAPI.middleware)
    .concat(vkAPI.middleware),
});

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
