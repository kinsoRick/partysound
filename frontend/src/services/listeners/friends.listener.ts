import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { IFriendsState } from '../../store/slices/friends/types';
import { friendsMusicDenied } from '../api';

const friendsListeners = (builder: ActionReducerMapBuilder<IFriendsState>) => {
  builder
    .addMatcher(friendsMusicDenied.matchPending, (state) => {
      state.status = 'pending';
    })
    .addMatcher(friendsMusicDenied.matchFulfilled, (state, { payload }) => {
      state.status = 'fulfilled';
      state.closed = [...payload, ...state.closed];
    });
};

export default friendsListeners;
