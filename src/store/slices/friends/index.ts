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
  status: 'pending' | 'fulfilled' | 'error' | 'idle',
  all: TFriendItem[];
  selected: TFriendItem[];
  filtered: TFriendItem[];
}

const initialState: IFriendsState = {
  status: 'idle',
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
      .addCase(getFriends.pending, (state) => {
        state.status = 'pending';
        state.all = [];
      })
      .addCase(getFriends.fulfilled, (state, { payload }) => {
        state.all = payload;
        state.filtered = payload;
        state.status = 'fulfilled';
      });
  },
});

export const { setSelectedFriends, setFilteredFriends } = friendsSlice.actions;
export default friendsSlice.reducer;
