import { createSlice } from '@reduxjs/toolkit';
import { getAccessToken, getUserInfo } from '../../../services/api/vk';
import { IUserState } from './types';
import userListeners from '../../../services/listeners/user.listener';

const initialState: IUserState = {
  id: -1,
  accessToken: '',
  firstName: '',
  lastName: '',
  photo: '',
  scopes: [],
  closed: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addMatcher(getUserInfo.matchFulfilled, (state, { payload }) => {
        state.id = payload.id;
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
        state.photo = payload.photo;
      })
      .addMatcher(getUserInfo.matchRejected, (state) => {
        state.id = initialState.id;
        state.firstName = initialState.firstName;
        state.lastName = initialState.lastName;
        state.photo = initialState.photo;
        state.accessToken = initialState.accessToken;
      })
      .addMatcher(getAccessToken.matchFulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.scopes = payload.scope.split(',');
      });
    userListeners(builder);
  },
});

export default userSlice.reducer;
