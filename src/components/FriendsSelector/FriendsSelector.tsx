import {
  Header, ButtonGroup, Button, Group,
} from '@vkontakte/vkui';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import './friends-selector.css';

import { TRootState, useAppDispatch } from '../../store';
import getUserAccessToken from '../../store/actions/getUserAccessToken.action';
import { setActiveModalName } from '../../store/slices/ui/modals.slice';

const FriendsSelector = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const platform = useSelector((state: TRootState) => state.config.platform);

  const selectFriends = () => {
    if (platform === 'mobile_web') {
      dispatch(getUserAccessToken(['friends']));
      dispatch(setActiveModalName('friendsSelectorModal'));
    }
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
