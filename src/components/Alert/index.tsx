import {
  FormStatus, Group, Div, Header, Button,
} from '@vkontakte/vkui';

import { Icon24Cancel, Icon28ReportOutline } from '@vkontakte/icons';
import { useSelector } from 'react-redux';
import { TRootState, useAppDispatch } from '../../store';
import { EAlertType, removeAlert } from '../../store/slices/ui/alert.slice';

import './alert.css';

const Alert = () => {
  const dispatch = useAppDispatch();

  const type = useSelector((state: TRootState) => state.ui.alert.type);
  const header = useSelector((state: TRootState) => state.ui.alert.header);
  const visible = useSelector((state: TRootState) => state.ui.alert.visible);
  const description = useSelector((state: TRootState) => state.ui.alert.description);

  const closeAlert = () => dispatch(removeAlert());

  const icon = (type === EAlertType.ERROR) ? <Icon28ReportOutline fill="E64646" /> : null;

  return visible ? (
    <FormStatus mode="default">
      <Group className="alert-group" mode="plain">
        <Div>{icon}</Div>
        <Div className="flex flex-column">
          <Header size="large" className="alert-header">
            {header}
          </Header>

          <p>{description}</p>
        </Div>
        <Div>
          <Button mode="link" onClick={closeAlert}>
            <Icon24Cancel />
          </Button>
        </Div>
      </Group>
    </FormStatus>
  ) : null;
};

export default Alert;
