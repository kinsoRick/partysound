import {
  Button, Counter, Spinner, Text,
} from '@vkontakte/vkui';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import FriendItem from './FriendItem';
import { TRootState, useAppDispatch } from '../store';
import { TFriendItem, setSelectedFriends } from '../store/slices/friends';
import { closeAllModals } from '../store/slices/ui/modals.slice';

interface Props {
  mode: 'select' | 'view';
}

const FriendsList = ({ mode }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [friendsToAdd, setFriendsToAdd] = useState<TFriendItem[]>([]);

  const friends = useSelector((state: TRootState) => state.friends);
  const status = useSelector((state: TRootState) => state.friends.status);

  const action = (friendProvided: TFriendItem) => {
    if (friendsToAdd.includes(friendProvided)) {
      setFriendsToAdd(
        friendsToAdd.filter((friend) => friend !== friendProvided),
      );
    } else {
      setFriendsToAdd([...friendsToAdd, friendProvided]);
    }
  };

  const onSubmit = () => {
    dispatch(setSelectedFriends(friendsToAdd));
    dispatch(closeAllModals());
  };

  const button = (
    <Button
      appearance="positive"
      className="btn-flex-trim btn-fixed-bottom"
      size="m"
      after={<Counter>{friendsToAdd.length}</Counter>}
      onClick={onSubmit}
    >
      {t('selectFriends')}
    </Button>
  );

  if (mode === 'view') {
    return (
      <>
        {friends.selected.map((friend) => (
          <FriendItem
            onClick={() => {}}
            key={friend.id}
            isClosed={friend.is_closed}
            displayName={`${friend.first_name} ${friend.last_name}`}
            photo={friend.photo_200_orig}
          />
        ))}
      </>
    );
  }

  if (status === 'pending') return <Spinner />;
  if (friends.filtered.length < 1) {
    return (
      <>
        {button}
        <Text className="friends-selector-info">{t('emptyCheckSearch')}</Text>
      </>
    );
  }

  const friendsToRender = friends.filtered.map((friend) => (
    <FriendItem
      onClick={() => action(friend)}
      key={friend.id}
      isClosed={friend.is_closed}
      displayName={`${friend.first_name} ${friend.last_name}`}
      photo={friend.photo_200_orig}
    />
  ));

  return (
    <>
      {button}
      {friendsToRender}
    </>
  );
};

export default FriendsList;
