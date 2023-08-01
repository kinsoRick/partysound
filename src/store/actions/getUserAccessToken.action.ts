import { createAsyncThunk } from '@reduxjs/toolkit';
import bridge from '@vkontakte/vk-bridge';
import getFriends from './getFriends.action';

const getUserAccessToken = createAsyncThunk(
  'users/getUserAccessToken',
  async (scope: string[], api) => {
    try {
      const response = await bridge.send('VKWebAppGetAuthToken', {
        app_id: 51454301,
        scope: scope.join(','),
      });

      if (scope.includes('friends')) api.dispatch(getFriends(response.access_token));

      return {
        accessToken: response.access_token,
        scope: response.scope,
      };
    } catch (error) {
      throw new Error(`[STORE -> ACTION]: getUserAccessToken ${error}`);
    }
  },
);

export default getUserAccessToken;
