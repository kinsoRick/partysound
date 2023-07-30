import {
  ModalRoot,
} from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';

import selectModal from '../store/selectors/modals.selectors';
import { setActiveModalName } from '../store/slices/ui/modals.slice';

import FriendsSelectorModal from './FriendsSelectorModal';

const ModalContainer = () => {
  const activeModal = useSelector(selectModal);
  const dispatch = useDispatch();

  const closeModal = () => dispatch(setActiveModalName(''));

  return (
    <ModalRoot activeModal={activeModal} onClose={closeModal}>
      <FriendsSelectorModal id="friendsSelectorModal" />
    </ModalRoot>
  );
};

export default ModalContainer;