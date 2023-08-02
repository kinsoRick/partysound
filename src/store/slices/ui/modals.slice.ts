import { createSlice } from '@reduxjs/toolkit';

interface IModalsState {
  activeModal: string;
}

const initialState: IModalsState = {
  activeModal: '',
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

export const { setActiveModalName, closeAllModals } = modalsSlice.actions;
export default modalsSlice.reducer;
