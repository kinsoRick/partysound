import { createSlice } from '@reduxjs/toolkit';
import { AppearanceType, EGetLaunchParamsResponseLanguages, EGetLaunchParamsResponsePlatforms } from '@vkontakte/vk-bridge';
import { getLaunchParams } from '../../../services/api/vk';

interface IConfigState {
  theme: AppearanceType;
  platform: EGetLaunchParamsResponsePlatforms | '';
  language: EGetLaunchParamsResponseLanguages | '';
  isServerAvailable: boolean;
}

const initialState: IConfigState = {
  theme: 'light',
  platform: '',
  language: '',
  isServerAvailable: true,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setServerAvailability: ((state, { payload }) => {
      state.isServerAvailable = payload;
    }),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(getLaunchParams.matchFulfilled, (state, { payload }) => {
        state.platform = payload.platform;
        state.language = payload.language;
      });
  },
});

export const { setServerAvailability } = configSlice.actions;
export default configSlice.reducer;
