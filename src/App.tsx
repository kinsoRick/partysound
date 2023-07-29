import { useState } from 'react';
import {
  ConfigProvider,
  AdaptivityProvider,
  AppRoot,
  Epic,
  SplitLayout,
} from '@vkontakte/vkui';
import bridge, { AppearanceType } from '@vkontakte/vk-bridge';
import { useSelector } from 'react-redux';
import selectStory from './store/selectors/epic.selectors';
import Home from './pages/Home';
import BottomMenu from './components/BottomMenu';
import ModalContainer from './modals';

const App = () => {
  const [appearance, setAppearance] = useState<AppearanceType>('light');
  const activeStory = useSelector(selectStory);

  bridge.subscribe((event) => {
    switch (event.detail.type) {
      case 'VKWebAppUpdateConfig': {
        setAppearance(event.detail.data.appearance);
        break;
      }
      default:
        break;
    }
  });

  return (
    <ConfigProvider appearance={appearance}>
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
