import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from '../..';

export const selectAllFriendIds = createSelector(
  (state: TRootState) => state.friends.all,
  (all) => all.map((friend) => friend.id),
);

export const selectSelectedFriendIds = createSelector(
  (state: TRootState) => state.friends.selected,
  (all) => all.map((friend) => friend.id),
);
