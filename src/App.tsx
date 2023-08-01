import {
  ConfigProvider,
  AdaptivityProvider,
  AppRoot,
  Epic,
  SplitLayout,
} from '@vkontakte/vkui';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import selectStory from './store/selectors/epic.selectors';
import Home from './pages/Home';
import BottomMenu from './components/BottomMenu';
import ModalContainer from './modals';

import { useAppDispatch } from './store';
import getLaunchParams from './store/actions/getLaunchParams.action';
import getUserInfo from './store/actions/getUserInfo.action';
// import getUserInfo from './store/actions/getUserInfo.action';

const App = () => {
  const activeStory = useSelector(selectStory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLaunchParams());
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout modal={<ModalContainer />}>
            <Epic activeStory={activeStory} tabbar={<BottomMenu />}>
              <Home id="home" />
            </Epic>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
