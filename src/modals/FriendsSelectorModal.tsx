import {
  Avatar,
  Gradient,
  Group,
  Header,
  ModalPage,
  Title,
} from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import { setActiveModalName } from '../store/slices/ui/modals.slice';

interface Props {
  id: string;
}

const FriendsSelectorModal = ({ id }: Props) => {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(setActiveModalName(''));

  return (
    <ModalPage
      id={id}
      onClose={closeModal}
      settlingHeight={100}
    >
      <Gradient
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 32,
        }}
      >
        <Avatar size={96} src="" />
        <Title style={{ marginBottom: 8, marginTop: 20 }} level="2" weight="2">
          KAMIL MASNAVEEV
        </Title>
      </Gradient>
      <Group
        header={(
          <Header mode="secondary" indicator="25">
            Друзья
          </Header>
        )}
      />
    </ModalPage>
  );
};

export default FriendsSelectorModal;
