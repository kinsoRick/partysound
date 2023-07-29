import { createSlice } from '@reduxjs/toolkit';

interface IEpicState {
  activeStory: string;
}

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

export const { setActiveStory } = epicSlice.actions;
export default epicSlice.reducer;
