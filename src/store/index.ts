import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/ui';

const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
