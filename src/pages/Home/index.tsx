import {
  View,
  Panel,
  Header,
} from '@vkontakte/vkui';
import { useTranslation } from 'react-i18next';

import FriendsTab from './Tabs/FriendsTab';
import TabsWrapper from '../../components/TabsWrapper';
import ParamsTab from './Tabs/ParamsTab';

interface Props {
  id: string;
}

const Home = ({ id }: Props) => {
  const { t } = useTranslation();

  return (
    <View id={id} activePanel="main">
      <Panel id="main">
        <Header size="large">{t('main')}</Header>
        <TabsWrapper defaultTab="friends" tabs={['friends', 'params']}>
          <FriendsTab id="friends" />
          <ParamsTab id="params" />
        </TabsWrapper>
      </Panel>
    </View>
  );
};

export default Home;
