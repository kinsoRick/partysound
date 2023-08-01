import { createSlice } from '@reduxjs/toolkit';
import { AppearanceType, EGetLaunchParamsResponseLanguages, EGetLaunchParamsResponsePlatforms } from '@vkontakte/vk-bridge';
import getLaunchParams from '../../actions/getLaunchParams.action';

interface IConfigState {
  theme: AppearanceType;
  platform: EGetLaunchParamsResponsePlatforms | '';
  language: EGetLaunchParamsResponseLanguages | '';
}

const initialState: IConfigState = {
  theme: 'light',
  platform: '',
  language: '',
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getLaunchParams.fulfilled, (state, { payload }) => {
        state.platform = payload.platform;
        state.language = payload.language;
      });
  },
});

export default configSlice.reducer;
