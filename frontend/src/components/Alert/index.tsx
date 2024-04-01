import {
  FormStatus, Group, Div, Header, Button,
} from '@vkontakte/vkui';

import { Icon24Cancel, Icon28ReportOutline } from '@vkontakte/icons';
import { useSelector } from 'react-redux';

import { TRootState } from '../../store';
import { EAlertType } from '../../store/slices/ui/alert/types';

import './alert.css';
import useActions from '../../hooks/useActions';

const Alert = () => {
  const {
    type, header, visible, description, isCloseable,
  } = useSelector((state: TRootState) => state.ui.alert);

  const { removeAlert } = useActions();

  const closeAlert = () => removeAlert();

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
        <Div className="alert-group--btn">
          {isCloseable ? (
            <Button mode="link" onClick={closeAlert}>
              <Icon24Cancel />
            </Button>
          ) : null }
        </Div>
      </Group>
    </FormStatus>
  ) : null;
};

export default Alert;
