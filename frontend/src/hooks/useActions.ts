import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useAppDispatch } from '../store';

import { actions as friendsActions } from '../store/slices/friends';
import { actions as modalsActions } from '../store/slices/ui/modals';
import { actions as epicActions } from '../store/slices/ui/epic';
import { actions as alertActions } from '../store/slices/ui/alert';
import { actions as userActions } from '../store/slices/user';

const rootActions = {
  ...friendsActions,
  ...modalsActions,
  ...epicActions,
  ...alertActions,
  ...userActions,
};

const useActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};

export default useActions;
