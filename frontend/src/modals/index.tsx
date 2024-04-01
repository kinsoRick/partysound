import {
  ModalRoot,
} from '@vkontakte/vkui';
import { useSelector } from 'react-redux';

import selectModal from '../store/selectors/modals.selectors';
import { setActiveModalName } from '../store/slices/ui/modals';

import FriendsSelectorModal from './friendsSelector';
import { useAppDispatch } from '../store';
import ResendPlaylistModal from './resendPlaylist';

const ModalContainer = () => {
  const activeModal = useSelector(selectModal);
  const dispatch = useAppDispatch();

  const closeModal = () => dispatch(setActiveModalName(''));

  return (
    <ModalRoot activeModal={activeModal} onClose={closeModal}>
      <FriendsSelectorModal id="friendsSelectorModal" />
      <ResendPlaylistModal id="resendPlaylistModal" />
    </ModalRoot>
  );
};

export default ModalContainer;
