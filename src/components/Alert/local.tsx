import {
  FormStatus, Group, Div, Header, Button,
} from '@vkontakte/vkui';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Icon24Cancel, Icon28ReportOutline } from '@vkontakte/icons';

import { EAlertType } from '../../store/slices/ui/alert/types';

import './alert.css';
import { TRootState } from '../../store';

interface Props {
  type: EAlertType;
  header: string;
  visible?: boolean;
  description: string;
  isCloseable: boolean;
}

const LocalAlert = ({
  type, header, description, isCloseable, visible = true,
}: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(visible);
  const globalIsVisible = useSelector((state: TRootState) => state.ui.alert.visible);
  const closeAlert = () => setIsVisible(false);
  const icon = (type === EAlertType.ERROR) ? <Icon28ReportOutline fill="E64646" /> : null;

  return (isVisible && !globalIsVisible) ? (
    <FormStatus mode="default" className="">
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

export default memo(LocalAlert);
