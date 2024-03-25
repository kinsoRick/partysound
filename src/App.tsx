import {
  ConfigProvider,
  AdaptivityProvider,
  AppRoot,
} from '@vkontakte/vkui';
import { useEffect } from 'react';

import InitContainer from './InitContainer';
import { useGetUserInfoMutation, useGetLaunchParamsMutation } from './services/api/vk';

import 'react-loading-skeleton/dist/skeleton.css';

const App = () => {
  const [getLaunchParams] = useGetLaunchParamsMutation();
  const [getUserInfo] = useGetUserInfoMutation();

  useEffect(() => {
    getLaunchParams();
    getUserInfo();
  }, [getLaunchParams, getUserInfo]);

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
