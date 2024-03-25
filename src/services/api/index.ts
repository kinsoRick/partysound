import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import {
  BaseQueryApi, FetchArgs, createApi, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { t } from 'i18next';

import { EAlertType } from '../../store/slices/ui/alert/types';

const BASE_URL = 'https://127.0.0.1:5000';

interface ICreatePlaylistRequestData {
  title: string;
  verified_artists_only: boolean;
  occurences_to_track_add: number;
  user_ids: number[];
}

interface ICreatePlaylistResponse {
  description: string;
  count: number;
  title: string;
  thumbs: string[];
}

type TBaseQueryOptions = FetchBaseQueryArgs | undefined;

// eslint-disable-next-line function-paren-newline
const customBaseQuery = (baseQueryOptions: TBaseQueryOptions) => async (
  args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
  const result = await fetchBaseQuery(baseQueryOptions)(args, api, extraOptions);

  if (result.error) {
    api.dispatch({
      type: 'alert/createAlert',
      payload: {
        header: t('serverNotResponding'), description: t('serverNotRespondingDescription'), type: EAlertType.ERROR, isCloseable: false,
      },
    });

    api.dispatch({
      type: 'config/setServerAvailability',
      payload: false,
    });
  }

  return result;
};

export const internalAPI = createApi({
  reducerPath: 'internalAPI',
  baseQuery: customBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    isUserMusicDenied: builder.mutation<boolean, number>({
      query: (userId) => ({
        url: '/check_denied_users',
        method: 'POST',
        body: {
          user_ids: [userId],
        },
      }),
      transformResponse: (response: number[]) => (response.length >= 1),
    }),
    friendsMusicDenied: builder.mutation<number[], number[]>({
      query: (userIds) => ({
        url: '/check_denied_users',
        method: 'POST',
        body: {
          user_ids: userIds,
        },
      }),
    }),
    createPlaylist: builder.mutation<ICreatePlaylistResponse, ICreatePlaylistRequestData>({
      query: (data: ICreatePlaylistRequestData) => ({
        url: '/playlist/create',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});
export const { isUserMusicDenied, friendsMusicDenied, createPlaylist } = internalAPI.endpoints;
export const {
  useCreatePlaylistMutation,
  useIsUserMusicDeniedMutation,
  useFriendsMusicDeniedMutation,
} = internalAPI;
