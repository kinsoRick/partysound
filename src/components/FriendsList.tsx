import { Spinner, Text } from '@vkontakte/vkui';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import FriendItem from './FriendItem';
import { TRootState } from '../store';

const FriendsList = (): JSX.Element => {
  const { t } = useTranslation();
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);

  const friends = useSelector((state: TRootState) => state.friends.filtered);
  const allFriendsLength = useSelector((state: TRootState) => state.friends.all.length);

  const action = (id: number) => {
    if (selectedFriends.includes(id)) {
      setSelectedFriends(selectedFriends.filter((friend) => friend !== id));
    } else {
      setSelectedFriends([...selectedFriends, id]);
    }
  };

  if (allFriendsLength < 1) {
    return <Spinner />;
  }
  if (friends.length < 1) {
    return <Text className="friends-selector-info">{t('emptyCheckSearch')}</Text>;
  }

  return (
    <>
      {friends.map((friend) => (
        <FriendItem
          onClick={() => action(friend.id)}
          checked={selectedFriends.includes(friend.id)}
          key={friend.id}
          isClosed={friend.is_closed}
          displayName={`${friend.first_name} ${friend.last_name}`}
          photo={friend.photo_200_orig}
        />
      ))}
    </>
  );
};

export default FriendsList;
