import { createSlice } from '@reduxjs/toolkit';
import { IModalsState } from './types';

const initialState: IModalsState = {
  activeModal: 'resendPlaylistModal',
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setActiveModalName: (state, { payload }) => {
      state.activeModal = payload;
    },
    closeAllModals: (state) => {
      state.activeModal = '';
    },
  },
});

export const { actions } = modalsSlice;
export const { setActiveModalName, closeAllModals } = modalsSlice.actions;
export default modalsSlice.reducer;
