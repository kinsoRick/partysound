import {
  View, Panel, Header, Group,
} from '@vkontakte/vkui';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import FriendsTab from './Tabs/FriendsTab';
import ParamsTab from './Tabs/ParamsTab';
import HomeTabs, { TAB_FRIENDS, TAB_PARAMS } from './Tabs';
import Alert from '../../components/Alert';

import './index.css';
import { TRootState } from '../../store';
import { useIsUserMusicDeniedMutation } from '../../services/api';
import { useGetAccessTokenMutation } from '../../services/api/vk';

interface Props {
  id: string;
}

const Home = ({ id }: Props) => {
  const { t } = useTranslation();

  const [tab, setTab] = useState(TAB_FRIENDS);
  const [checkUser] = useIsUserMusicDeniedMutation();
  const [getToken] = useGetAccessTokenMutation();

  const userId = useSelector((state: TRootState) => state.user.id);

  useEffect(() => {
    getToken(['friends']);
    if (userId === -1) return;
    checkUser(userId);
  }, [checkUser, getToken, t, userId]);

  return (
    <View id={id} activePanel="main">
      <Panel id="main">
        <Header size="large">{t('main')}</Header>
        <Group mode="plain">
          <HomeTabs onTabChange={setTab} />
        </Group>
        <Alert />
        {(() => {
          switch (tab) {
            case TAB_FRIENDS:
              return <FriendsTab id="friends" />;
            case TAB_PARAMS:
              return <ParamsTab id="params" />;
            default:
              return null;
          }
        })()}
      </Panel>
    </View>
  );
};

export default Home;
