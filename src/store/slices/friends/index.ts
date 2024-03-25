import { createSlice } from '@reduxjs/toolkit';
import { getFriends } from '../../../services/api/vk';
import { IFriendsState } from './types';
import friendsListeners from '../../../services/listeners/friends.listener';

const initialState: IFriendsState = {
  status: 'idle',
  all: [],
  selected: [],
  filtered: [],
  closed: [],
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setSelectedFriends: ((state, { payload }) => {
      state.selected = payload;
    }),
    setFilteredFriends: ((state, { payload }) => {
      state.filtered = payload;
    }),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(getFriends.matchPending, (state) => {
        state.status = 'pending';
        state.all = [];
      })
      .addMatcher(getFriends.matchFulfilled, (state, { payload }) => {
        state.all = payload;
        state.filtered = payload;
        state.status = 'fulfilled';
      });

    friendsListeners(builder);
  },
});

export const { actions } = friendsSlice;
export const { setSelectedFriends, setFilteredFriends } = friendsSlice.actions;
export default friendsSlice.reducer;
