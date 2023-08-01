import { createSlice } from '@reduxjs/toolkit';

export enum EAlertType {
  ERROR = 'ERROR',
  DEFAULT = 'DEFAULT',
}

interface IAlertState {
  visible: boolean;
  header: string;
  description: string | null;
  type: EAlertType;
}

const initialState: IAlertState = {
  visible: false,
  header: '',
  description: null,
  type: EAlertType.DEFAULT,
};

type TCreateAlertPayload = {
  payload: {
    description: string | null;
    header: string;
    type: EAlertType;
  }
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    removeAlert: (state) => {
      state.description = initialState.description;
      state.header = initialState.header;
      state.type = initialState.type;
      state.visible = initialState.visible;
    },
    createAlert: (state, { payload }: TCreateAlertPayload) => {
      state.description = payload.description;
      state.header = payload.header;
      state.type = payload.type;
      state.visible = true;
    },
  },
});

export const { removeAlert, createAlert } = alertSlice.actions;
export default alertSlice.reducer;
