import React, { useState } from 'react';
import {
  Button, Counter, Spinner, Text,
} from '@vkontakte/vkui';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import FriendItem from './FriendItem';
import { TRootState, useAppDispatch } from '../store';
import { TFriendItem, setSelectedFriends } from '../store/slices/friends';
import { closeAllModals } from '../store/slices/ui/modals.slice';

interface Props {
  mode: 'selectable' | 'view' | 'removable';
}

const FriendsList: React.FC<Props> = ({ mode }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [friendsToAdd, setFriendsToAdd] = useState<TFriendItem[]>([]);

  const friends = useSelector((state: TRootState) => state.friends);
  const status = useSelector((state: TRootState) => state.friends.status);

  const toggleFriendSelection = (friendProvided: TFriendItem) => {
    if (friendsToAdd.includes(friendProvided)) {
      setFriendsToAdd(friendsToAdd.filter((friend) => friend !== friendProvided));
    } else {
      setFriendsToAdd([...friendsToAdd, friendProvided]);
    }
  };

  const onSubmit = () => {
    dispatch(setSelectedFriends(friendsToAdd));
    dispatch(closeAllModals());
  };

  const renderFriendItem = (friend: TFriendItem) => {
    switch (mode) {
      case 'view':
        return (
          <FriendItem
            onClick={() => {}}
            key={friend.id}
            isClosed={friend.is_closed}
            displayName={`${friend.first_name} ${friend.last_name}`}
            photo={friend.photo_200_orig}
          />
        );
      case 'selectable':
      case 'removable':
        return (
          <FriendItem
            onClick={() => toggleFriendSelection(friend)}
            key={friend.id}
            isClosed={friend.is_closed}
            displayName={`${friend.first_name} ${friend.last_name}`}
            photo={friend.photo_200_orig}
            mode={mode}
          />
        );
      default:
        return null;
    }
  };

  const addFriendsButton = () => (
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

  const renderFriends = () => {
    if (status === 'pending') {
      return <Spinner />;
    }

    switch (mode) {
      case 'view':
        return friends.selected.map(renderFriendItem);
      case 'selectable':
      case 'removable':
        if (friends.filtered.length < 1) {
          return (
            <Text className="friends-selector-info">{t('emptyCheckSearch')}</Text>
          );
        }
        return (
          <>
            {addFriendsButton()}
            {friends.filtered.map(renderFriendItem)}
          </>
        );
      default:
        return null;
    }
  };

  return <>{renderFriends()}</>;
};

export default FriendsList;
