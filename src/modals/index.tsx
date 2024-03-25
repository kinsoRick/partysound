import {
  ModalRoot,
} from '@vkontakte/vkui';
import { useSelector } from 'react-redux';

import selectModal from '../store/selectors/modals.selectors';
import { setActiveModalName } from '../store/slices/ui/modals';

import FriendsSelectorModal from './FriendsSelectorModal';
import { useAppDispatch } from '../store';

const ModalContainer = () => {
  const activeModal = useSelector(selectModal);
  const dispatch = useAppDispatch();

  const closeModal = () => dispatch(setActiveModalName(''));

  return (
    <ModalRoot activeModal={activeModal} onClose={closeModal}>
      <FriendsSelectorModal id="friendsSelectorModal" />
    </ModalRoot>
  );
};

export default ModalContainer;
