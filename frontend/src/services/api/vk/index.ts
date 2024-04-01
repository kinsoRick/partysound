import { createApi } from '@reduxjs/toolkit/query/react';
import bridge, { EGetLaunchParamsResponseLanguages, EGetLaunchParamsResponsePlatforms, GetLaunchParamsResponse } from '@vkontakte/vk-bridge';

interface IAccessTokenResponse {
  scope: string;
  access_token: string;
}

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
  }
};

type TGetUserInfoResult = {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
};

type TGetLaunchParamsResult = {
  platform: EGetLaunchParamsResponsePlatforms;
  language: EGetLaunchParamsResponseLanguages;
  scopes: string | null;
};

type TGetAccessTokenResult = {
  scope: string;
  accessToken: string;
};

export const vkAPI = createApi({
  reducerPath: 'vkAPI',
  baseQuery: async ({ url, body }) => {
    try {
      const response = await bridge.send(url, body);
      return { data: response };
    } catch (error) {
      throw new Error(`Ошибка при выполнении запроса через VK Bridge: ${error}`);
    }
  },
  endpoints: (builder) => ({
    getAccessToken: builder.mutation<TGetAccessTokenResult, string[]>({
      query: (scopes: string[]) => ({
        url: 'VKWebAppGetAuthToken',
        body: {
          app_id: 51454301,
          scope: scopes.join(','),
        },
      }),
      transformResponse: (response: IAccessTokenResponse) => ({
        scope: response.scope,
        accessToken: response.access_token,
      }),
    }),
    getLaunchParams: builder.mutation<TGetLaunchParamsResult, void>({
      query: () => ({
        url: 'VKWebAppGetLaunchParams',
      }),
      transformResponse: (response: GetLaunchParamsResponse) => ({
        platform: response.vk_platform,
        language: response.vk_language,
        scopes: response.vk_access_token_settings ? response.vk_access_token_settings : null,
      }),
    }),
    getUserInfo: builder.mutation<TGetUserInfoResult, void>({
      query: () => ({
        url: 'VKWebAppGetUserInfo',
      }),
      transformResponse: (response) => ({
        id: response.id,
        firstName: response.first_name,
        lastName: response.last_name,
        photo: response.photo_200,
      }),
    }),
    getFriends: builder.mutation({
      query: (accessToken: string) => ({
        url: 'VKWebAppCallAPIMethod',
        body: {
          method: 'friends.get',
          params: {
            v: '5.131',
            access_token: accessToken,
            name_case: 'nom',
            fields: 'photo_200_orig',
          },
        },
      }),
      transformResponse: (response: TGetFriendsResponse) => response.response.items,
    }),
  }),
});

export const {
  getAccessToken, getFriends, getUserInfo, getLaunchParams,
} = vkAPI.endpoints;

export const {
  useGetAccessTokenMutation,
  useGetLaunchParamsMutation,
  useGetUserInfoMutation,
  useGetFriendsMutation,
} = vkAPI;
