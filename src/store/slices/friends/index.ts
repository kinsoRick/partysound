import { createSlice } from '@reduxjs/toolkit';
import getFriends from '../../actions/getFriends.action';

export type TFriendItem = {
  id: number;
  photo_200_orig: string;
  first_name: string;
  last_name: string;
  is_closed: boolean;
};

interface IFriendsState {
  all: TFriendItem[];
  selected: number[];
  filtered: TFriendItem[];
}

const initialState: IFriendsState = {
  all: [],
  selected: [],
  filtered: [],
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
      .addCase(getFriends.fulfilled, (state, { payload }) => {
        state.all = payload;
      });
  },
});

export const { setSelectedFriends, setFilteredFriends } = friendsSlice.actions;
export default friendsSlice.reducer;
