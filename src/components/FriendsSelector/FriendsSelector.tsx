import {
  Header, ButtonGroup, Button, Group,
} from '@vkontakte/vkui';
import { useTranslation } from 'react-i18next';

import useActions from '../../hooks/useActions';
import FriendsList from '../FriendsList';

import './friends-selector.css';

const FriendsSelector = () => {
  const { t } = useTranslation();

  const { setActiveModalName } = useActions();

  const selectFriends = () => {
    setActiveModalName('friendsSelectorModal');
  };

  return (
    <Group mode="plain" className="friends-group">
      <Header>{t('selectedFriends')}</Header>
      <ButtonGroup mode="horizontal" className="friends-group--btn-group">
        <Button
          appearance="positive"
          size="l"
          stretched
          onClick={selectFriends}
        >
          {t('select')}
        </Button>
      </ButtonGroup>
      <FriendsList mode="view" />
    </Group>
  );
};

export default FriendsSelector;
