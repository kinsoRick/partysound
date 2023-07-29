import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  accessToken: string;
  firstName: string;
  lastName: string;
}

const initialState: IUserState = {
  accessToken: '',
  firstName: '',
  lastName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
