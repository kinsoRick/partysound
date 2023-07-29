import {
  Header, ButtonGroup, Button, Group,
} from '@vkontakte/vkui';
import { useTranslation } from 'react-i18next';
import bridge from '@vkontakte/vk-bridge';
import './friends-selector.css';
import { useDispatch } from 'react-redux';
import { setActiveModalName } from '../../store/slices/ui/modals.slice';

const FriendsSelector = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const selectFriends = () => {
    dispatch(setActiveModalName('friendsSelectorModal'));
    bridge.send('VKWebAppGetFriends')
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        dispatch(setActiveModalName('friendsSelectorModal'));
      });
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
    </Group>
  );
};

export default FriendsSelector;
