import React, { useState } from 'react';
import {
  Button, Counter, Spinner, Text,
} from '@vkontakte/vkui';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import FriendItem, { SkeletonFriendItem } from './FriendItem';
import { TRootState } from '../store';
import { TFriendItem } from '../store/slices/friends/types';
import { useFriendsMusicDeniedMutation } from '../services/api';
import useActions from '../hooks/useActions';

interface Props {
  mode: 'selectable' | 'view' | 'removable';
}

const FriendsList: React.FC<Props> = ({ mode }: Props) => {
  const { t } = useTranslation();
  const { setSelectedFriends, closeAllModals } = useActions();

  const [getDeniedFriendsMusic] = useFriendsMusicDeniedMutation();
  const [friends, setFriends] = useState<Set<TFriendItem>>(new Set());

  const {
    selected, filtered, closed, status,
  } = useSelector((state: TRootState) => state.friends);

  const toggleFriendSelection = (friend: TFriendItem) => {
    const friendsSet = new Set(friends);
    if (friendsSet.has(friend)) {
      friendsSet.delete(friend);
    } else {
      friendsSet.add(friend);
    }
    setFriends(friendsSet);
  };

  const onSubmit = () => {
    const friendsArray = Array.from(friends);
    const friendsIds = friendsArray.map((friend) => friend.id);

    setSelectedFriends(friendsArray);
    getDeniedFriendsMusic(friendsIds);

    closeAllModals();
  };

  const renderFriendItem = (friend: TFriendItem) => {
    const isAccessToToggle = (!friend.is_closed && mode !== 'view' && closed.indexOf(friend.id) === -1);
    return (
      <FriendItem
        onClick={() => (isAccessToToggle && toggleFriendSelection(friend))}
        key={friend.id}
        isClosed={friend.is_closed || closed.indexOf(friend.id) !== -1}
        displayName={`${friend.first_name} ${friend.last_name}`}
        photo={friend.photo_200_orig}
        mode={(isAccessToToggle) ? mode : undefined}
      />
    );
  };

  const addFriendsButton = () => (
    <Button
      appearance="positive"
      className="btn-flex-trim btn-fixed-bottom"
      size="m"
      after={<Counter>{friends.size}</Counter>}
      onClick={onSubmit}
    >
      {t('selectFriends')}
    </Button>
  );

  const renderFriends = () => {
    if (status === 'pending') {
      if (mode === 'view') return <Spinner />;

      return Array.from({ length: 10 }, (_, i) => i + 1)
        .map((index) => <SkeletonFriendItem key={index} />);
    }

    switch (mode) {
      case 'view':
        return selected.map(renderFriendItem);
      case 'selectable':
      case 'removable':
        if (filtered.length < 1) {
          return <Text className="friends-selector-info">{t('emptyCheckSearch')}</Text>;
        }
        return (
          <>
            {addFriendsButton()}
            {filtered.map(renderFriendItem)}
          </>
        );
      default:
        return null;
    }
  };

  return <>{renderFriends()}</>;
};

export default FriendsList;
