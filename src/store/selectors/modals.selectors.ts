import { TRootState } from '..';

const selectModal = (state: TRootState) => state.ui.modals.activeModal;
export default selectModal;
