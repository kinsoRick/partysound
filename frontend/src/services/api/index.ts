import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import {
  BaseQueryApi, FetchArgs, createApi, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { t } from 'i18next';

import { EAlertType } from '../../store/slices/ui/alert/types';
import { IPlaylist } from '../../store/slices/user/types';

const BASE_URL = 'https://178.205.85.186:5000';

interface ISendPlaylistRequestData {
  user_id: string | number;
  playlist_id: string;
}

interface ICreatePlaylistRequestData {
  title: string;
  verified_artists_only: boolean;
  occurences_to_track_add: number;
  user_ids: number[];
}

interface ISendPlaylistRequestData {
  user_id: string | number;
  playlist_id: string;
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
        header: t('serverNotResponding'),
        description: t('serverNotRespondingDescription'),
        type: EAlertType.ERROR,
        isCloseable: false,
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
  baseQuery: customBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as { user: { id: number } };
      const { id } = state.user;
      if (id) {
        headers.set('X-USER-ID', `${id}`);
      }
      return headers;
    },
  }),
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
    createPlaylist: builder.mutation<IPlaylist, ICreatePlaylistRequestData>({
      query: (data: ICreatePlaylistRequestData) => ({
        url: '/playlist/create',
        method: 'POST',
        body: data,
      }),
    }),
    deletePlaylist: builder.mutation<IPlaylist, ISendPlaylistRequestData>({
      query: (data: ISendPlaylistRequestData) => ({
        url: '/playlist/delete',
        method: 'POST',
        body: data,
      }),
    }),
    sendPlaylist: builder.mutation<boolean, ISendPlaylistRequestData>({
      query: (data: ISendPlaylistRequestData) => ({
        url: '/playlist/send',
        method: 'POST',
        body: data,
      }),
    }),
    getPlaylists: builder.mutation<IPlaylist[], number>({
      query: (id: number) => ({
        url: `/playlists/get?user_id=${id}`,
        method: 'GET',
      }),
    }),
  }),
});
export const {
  isUserMusicDenied,
  friendsMusicDenied,
  createPlaylist,
  getPlaylists,
  sendPlaylist,
  deletePlaylist,
} = internalAPI.endpoints;
export const {
  useCreatePlaylistMutation,
  useIsUserMusicDeniedMutation,
  useFriendsMusicDeniedMutation,
  useGetPlaylistsMutation,
  useSendPlaylistMutation,
  useDeletePlaylistMutation,
} = internalAPI;
