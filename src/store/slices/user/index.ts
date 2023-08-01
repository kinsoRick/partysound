import { createSlice } from '@reduxjs/toolkit';
import getUserInfo from '../../actions/getUserInfo.action';
import getUserAccessToken from '../../actions/getUserAccessToken.action';
import getLaunchParams from '../../actions/getLaunchParams.action';

interface IUserState {
  id: number;
  accessToken: string;
  firstName: string;
  lastName: string;
  photo: string;
  scopes: string[];
}

const initialState: IUserState = {
  id: -1,
  accessToken: '',
  firstName: '',
  lastName: '',
  photo: '',
  scopes: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.id = payload.id;
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
        state.photo = payload.photo;
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.id = initialState.id;
        state.firstName = initialState.firstName;
        state.lastName = initialState.lastName;
        state.photo = initialState.photo;
        state.accessToken = initialState.accessToken;
      })
      .addCase(getLaunchParams.fulfilled, (state, { payload }) => {
        if (payload.scopes) state.scopes = payload.scopes.split(',');
      })
      .addCase(getUserAccessToken.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.scopes = payload.scope.split(',');
      });
  },
});

export default userSlice.reducer;
