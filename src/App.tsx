import React from 'react';
import {
  ConfigProvider,
  AdaptivityProvider,
  AppRoot,
  SplitLayout,
  View,
  PanelHeader,
  Panel,
  Div,
} from '@vkontakte/vkui';
import bridge, { AppearanceType } from '@vkontakte/vk-bridge';

const App = () => {
  const [appearance, setAppearance] = React.useState<AppearanceType>('light');

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
          <SplitLayout header={<PanelHeader separator={false} />}>
            <View activePanel="main">
              <Panel id="main">
                <PanelHeader>Header</PanelHeader>
                <Div>Hello, world</Div>
              </Panel>
            </View>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
