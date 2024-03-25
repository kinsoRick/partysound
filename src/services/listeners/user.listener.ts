import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { isUserMusicDenied } from '../api';
import { IUserState } from '../../store/slices/user/types';

const userListeners = (builder: ActionReducerMapBuilder<IUserState>) => {
  builder.addMatcher(
    isUserMusicDenied.matchFulfilled,
    ((state, { payload }) => {
      state.closed = !payload;
    }),
  );
};

export default userListeners;
