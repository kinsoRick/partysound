import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/naming-convention
type friendItem = {
  id: number;
  photo_100: string;
  first_name: string;
  last_name: string;
  is_closed: boolean;
};

interface IAllPayload {
  payload: friendItem[];
}

interface IFriendsState {
  all: friendItem[];
}

const initialState: IFriendsState = {
  all: [],
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setAllFriends: (state: IFriendsState, { payload }: IAllPayload) => {
      state.all = payload;
    },
  },
});

export const { setAllFriends } = friendsSlice.actions;
export default friendsSlice.reducer;
