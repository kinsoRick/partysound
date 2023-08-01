import {
  View, Panel, Header, Tabs, Group, TabsItem,
} from '@vkontakte/vkui';
import { useTranslation } from 'react-i18next';
import { SyntheticEvent, useState } from 'react';

import FriendsTab from './Tabs/FriendsTab';
import ParamsTab from './Tabs/ParamsTab';

import Alert from '../../components/Alert';

interface Props {
  id: string;
}

const Home = ({ id }: Props) => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState('friends');

  const setTab = (e: SyntheticEvent<HTMLElement>) => {
    setCurrentTab(e.currentTarget.dataset.name as string);
  };

  return (
    <View id={id} activePanel="main">
      <Panel id="main">
        <Header size="large">{t('main')}</Header>
        <Alert />
        <Group mode="plain">
          <Tabs>
            <TabsItem
              id="tab-friends"
              aria-controls="tab-content-friends"
              selected={currentTab === 'friends'}
              onClick={setTab}
              data-name="friends"
            >
              {t('friends')}
            </TabsItem>
            <TabsItem
              id="tab-params"
              aria-controls="tab-content-params"
              selected={currentTab === 'params'}
              onClick={setTab}
              data-name="params"
            >
              {t('params')}
            </TabsItem>
          </Tabs>
        </Group>
        {(currentTab === 'friends') && <FriendsTab id="friends" />}
        {(currentTab === 'params') && <ParamsTab id="params" />}
      </Panel>
    </View>
  );
};

export default Home;
