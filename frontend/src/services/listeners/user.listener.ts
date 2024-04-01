import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { createPlaylist, getPlaylists, isUserMusicDenied } from '../api';
import { IUserState } from '../../store/slices/user/types';

const userListeners = (builder: ActionReducerMapBuilder<IUserState>) => {
  builder
    .addMatcher(
      isUserMusicDenied.matchFulfilled,
      ((state, { payload }) => {
        state.closed = !payload;
      }),
    )
    .addMatcher(
      getPlaylists.matchFulfilled,
      ((state, { payload }) => {
        state.playlists = payload;
      }),
    )
    .addMatcher(
      createPlaylist.matchFulfilled,
      ((state, { payload }) => {
        state.currentPlaylist = payload;
        state.playlists = [...state.playlists, payload];
      }),
    );
};

export default userListeners;
