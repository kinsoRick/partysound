import { createAsyncThunk } from '@reduxjs/toolkit';
import bridge from '@vkontakte/vk-bridge';

const getUserInfo = createAsyncThunk(
  'users/getUserInfo',
  async (userId: number | undefined) => {
    try {
      const requestData = userId ? {
        user_id: userId,
      } : {};

      const response = await bridge.send('VKWebAppGetUserInfo', requestData);

      return {
        id: response.id,
        firstName: response.first_name,
        lastName: response.last_name,
        photo: response.photo_200,
      };
    } catch (error) {
      throw new Error(`[STORE -> ACTION]: getUserInfo ${error}`);
    }
  },
);

export default getUserInfo;
