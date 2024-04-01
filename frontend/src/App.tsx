import {
  ConfigProvider,
  AdaptivityProvider,
  AppRoot,
} from '@vkontakte/vkui';
import { useEffect } from 'react';

import InitContainer from './InitContainer';
import { useGetUserInfoMutation, useGetLaunchParamsMutation } from './services/api/vk';

import 'react-loading-skeleton/dist/skeleton.css';
import { useGetPlaylistsMutation } from './services/api';

const App = () => {
  const [getLaunchParams] = useGetLaunchParamsMutation();
  const [getUserInfo] = useGetUserInfoMutation();
  const [getPlaylists] = useGetPlaylistsMutation();

  useEffect(() => {
    getLaunchParams();
    getUserInfo().then((data) => {
      if ('error' in data) return;

      getPlaylists(data.data.id).then((a) => console.log(a));
    });
  }, [getLaunchParams, getUserInfo, getPlaylists]);

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <InitContainer />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
