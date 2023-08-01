import { createAsyncThunk } from '@reduxjs/toolkit';
import bridge from '@vkontakte/vk-bridge';

const getLaunchParams = createAsyncThunk(
  'config/getLaunchParams',
  async () => {
    try {
      const response = await bridge.send('VKWebAppGetLaunchParams');
      const scopes = response.vk_access_token_settings ? response.vk_access_token_settings : null;
      return {
        platform: response.vk_platform,
        language: response.vk_language,
        scopes,
      };
    } catch (error) {
      throw new Error(`[STATE -> ACTION -> getLaunchParams] ${error}`);
    }
  },
);

export default getLaunchParams;
