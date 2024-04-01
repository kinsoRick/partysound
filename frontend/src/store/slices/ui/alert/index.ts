import { createSlice } from '@reduxjs/toolkit';
import { EAlertType, IAlertState, TCreateAlertPayload } from './types';

const initialState: IAlertState = {
  visible: false,
  header: '',
  description: null,
  type: EAlertType.ERROR,
  isCloseable: true,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    removeAlert: (state) => {
      state.description = initialState.description;
      state.header = initialState.header;
      state.type = initialState.type;
      state.visible = false;
    },
    createAlert: (state, { payload }: { payload: TCreateAlertPayload }) => {
      state.description = payload.description;
      state.header = payload.header;
      state.type = payload.type ?? EAlertType.DEFAULT;
      state.isCloseable = payload.isCloseable ?? state.isCloseable;
      state.visible = true;
    },
  },
});

export const { actions } = alertSlice;
export const { removeAlert, createAlert } = alertSlice.actions;
export default alertSlice.reducer;
