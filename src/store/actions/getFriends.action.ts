import { createAsyncThunk } from '@reduxjs/toolkit';
import bridge from '@vkontakte/vk-bridge';

type TUserResponse = {
  id: number;
  first_name: string;
  last_name: string;
  deactivated?: boolean;
  photo_200_orig: string;
  is_closed: boolean;
};

type TGetFriendsResponse = {
  response: {
    count: number;
    items: TUserResponse[];
  };
};

const getFriends = createAsyncThunk(
  'friends/getFriends',
  async (accessToken: string) => {
    try {
      const { response }: TGetFriendsResponse = await bridge.send(
        'VKWebAppCallAPIMethod',
        {
          method: 'friends.get',
          params: {
            v: '5.131',
            access_token: accessToken,
            name_case: 'nom',
            fields: 'photo_200_orig',
          },
        },
      );

      return response.items;
    } catch (error) {
      throw new Error(`[STATE -> ACTION -> getFriends] ${error}`);
    }
  },
);

export default getFriends;
