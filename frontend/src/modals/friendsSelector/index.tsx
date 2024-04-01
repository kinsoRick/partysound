import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Gradient,
  Group,
  Header,
  ModalPage,
  Title,
  Button,
  Search,
} from '@vkontakte/vkui';
import { Icon24CancelOutline } from '@vkontakte/icons';
import { useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import { setActiveModalName } from '../../store/slices/ui/modals';
import { TRootState, useAppDispatch } from '../../store';
import FriendsList from '../../components/FriendsList';
import { setFilteredFriends } from '../../store/slices/friends';

import './friends-selector-modal.css';
import { useGetFriendsMutation } from '../../services/api/vk';

interface Props {
  id: string;
}

const FriendsSelectorModal: React.FC<Props> = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const [getFriends] = useGetFriendsMutation();
  const [search, setSearch] = useState('');

  const {
    firstName, lastName, photo, accessToken,
  } = useSelector((state: TRootState) => state.user);
  const friendsAll = useSelector((state: TRootState) => state.friends.all);
  const friendsStatus = useSelector((state: TRootState) => state.friends.status);

  const searchChange = (value: string) => setSearch(value);
  const debouncedSearchChange = debounce(searchChange, 700);

  useEffect(() => {
    if (friendsStatus === 'idle') {
      getFriends(accessToken);
    }
    if (friendsStatus === 'fulfilled') {
      const loweredSearch = search.toLowerCase();
      const capitalizedSearch = loweredSearch.charAt(0).toUpperCase() + loweredSearch.slice(1);

      const filtered = friendsAll.filter((friend) => {
        const firstNameStart = friend.first_name.startsWith(capitalizedSearch);
        const lastNameStart = friend.last_name.startsWith(capitalizedSearch);
        return firstNameStart || lastNameStart;
      });

      dispatch(setFilteredFriends(filtered));
    }
  }, [friendsAll, dispatch, search, friendsStatus, getFriends, accessToken]);

  const closeModal = () => dispatch(setActiveModalName(''));

  return (
    <ModalPage dynamicContentHeight id={id} onClose={closeModal}>
      <Gradient className="friends-selector-header">
        <Button className="modal-btn-close" mode="link" onClick={closeModal}>
          <Icon24CancelOutline />
        </Button>
        <Avatar size={96} src={photo} />
        <Title className="header-title" level="2" weight="2">
          {`${firstName} ${lastName}`}
        </Title>
      </Gradient>

      <Group header={<Header mode="secondary" indicator={friendsAll.length}>Друзья</Header>} className="flex flex-column content-center">
        <Search onChange={(e) => debouncedSearchChange(e.currentTarget.value)} />
        <FriendsList mode="selectable" />
      </Group>
    </ModalPage>
  );
};

export default FriendsSelectorModal;
