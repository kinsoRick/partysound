import { createSlice } from '@reduxjs/toolkit';
import { IEpicState } from './types';

const initialState: IEpicState = {
  activeStory: 'home',
};

const epicSlice = createSlice({
  name: 'epic',
  initialState,
  reducers: {
    setActiveStory: (state: IEpicState, { payload }) => {
      state.activeStory = payload;
    },
  },
});

export const { actions } = epicSlice;
export const { setActiveStory } = epicSlice.actions;
export default epicSlice.reducer;
