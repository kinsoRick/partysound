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
import {
  useEffect, useState,
} from 'react';
import debounce from 'lodash.debounce';

import { setActiveModalName } from '../store/slices/ui/modals.slice';
import { TRootState, useAppDispatch } from '../store';

import FriendsList from '../components/FriendsList';

import './friends-selector-modal.css';
import { setFilteredFriends } from '../store/slices/friends';

interface Props {
  id: string;
}

const FriendsSelectorModal = ({ id }: Props) => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState('');
  const searchChange = (value: string) => setSearch(value);
  const debouncedSearchChange = debounce(searchChange, 700);

  const firstName = useSelector((state: TRootState) => state.user.firstName);
  const lastName = useSelector((state: TRootState) => state.user.lastName);
  const photo = useSelector((state: TRootState) => state.user.photo);

  const friendsAll = useSelector((state: TRootState) => state.friends.all);
  const friendsStatus = useSelector((state: TRootState) => state.friends.status);

  useEffect(() => {
    if (friendsStatus === 'fulfilled') {
      const filtered = friendsAll.filter((friend) => {
        const firstNameStart = friend.first_name.startsWith(search);
        const lastNameStart = friend.last_name.startsWith(search);
        return firstNameStart || lastNameStart;
      });
      dispatch(setFilteredFriends(filtered));
    }
  }, [friendsAll, dispatch, search, friendsStatus]);

  const closeModal = () => dispatch(setActiveModalName(''));

  return (
    <ModalPage
      dynamicContentHeight
      id={id}
      onClose={closeModal}
    >
      <Gradient className="friends-selector-header">
        <Button className="modal-btn-close" mode="link" onClick={closeModal}>
          <Icon24CancelOutline />
        </Button>
        <Avatar size={96} src={photo} />
        <Title className="header-title" level="2" weight="2">
          {`${firstName} ${lastName}`}
        </Title>
      </Gradient>

      <Group
        header={(
          <Header mode="secondary" indicator={friendsAll.length}>
            Друзья
          </Header>
        )}
        className="flex flex-column content-center"
      >
        <Search
          onChange={(e) => debouncedSearchChange(e.currentTarget.value)}
        />

        <FriendsList mode="select" />
      </Group>
    </ModalPage>
  );
};

export default FriendsSelectorModal;
