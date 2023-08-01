import {
  Avatar,
  Gradient,
  Group,
  Header,
  ModalPage,
  Button,
  Title,
  Search,
} from '@vkontakte/vkui';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
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
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState('');
  const searchChange = (value: string) => {
    setSearch(value);
  };

  const debouncedSearchChange = debounce(searchChange, 700);

  const firstName = useSelector((state: TRootState) => state.user.firstName);
  const lastName = useSelector((state: TRootState) => state.user.lastName);
  const photo = useSelector((state: TRootState) => state.user.photo);

  const friends = useSelector((state: TRootState) => state.friends.all);

  useEffect(() => {
    const filtered = friends.filter((friend) => {
      const firstNameStart = friend.first_name.startsWith(search);
      const lastNameStart = friend.last_name.startsWith(search);
      return firstNameStart || lastNameStart;
    });

    dispatch(setFilteredFriends(filtered));
  }, [friends, search, dispatch]);

  const closeModal = () => dispatch(setActiveModalName(''));

  return (
    <ModalPage id={id} onClose={closeModal} settlingHeight={100}>
      <Gradient
        className="friends-selector-header"
      >
        <Avatar size={96} src={photo} />
        <Title className="header-title" level="2" weight="2">
          {`${firstName} ${lastName}`}
        </Title>
      </Gradient>

      <Group
        header={(
          <Header mode="secondary" indicator={friends.length}>
            Друзья
          </Header>
        )}
        className="flex flex-column content-center"
      >
        <Search onChange={(e) => debouncedSearchChange(e.currentTarget.value)} />

        <Button
          appearance="positive"
          className="btn-flex-trim"
        >
          {t('selectFriends')}
        </Button>

        <FriendsList />
      </Group>
    </ModalPage>
  );
};

export default FriendsSelectorModal;
