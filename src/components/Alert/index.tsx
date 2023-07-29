import {
  FormStatus, Group, Div, Header, Button,
} from '@vkontakte/vkui';
import './alert.css';
import { Icon24Cancel } from '@vkontakte/icons';

interface Props {
  header: string;
  description: string;
  type: 'default' | 'error' | undefined;
  icon: JSX.Element;
  action: JSX.Element;
}

const Alert = ({
  header, description, type, icon, action,
}: Props) => (
  <FormStatus mode={type}>
    <Group className="alert-group" mode="plain">
      <Div>
        {icon}
      </Div>
      <Div className="flex flex-column">
        <Header size="large" className="alert-header">
          {header}
        </Header>

        <p>{description}</p>
        {action}
      </Div>
      <Div>
        <Button mode="link"><Icon24Cancel /></Button>
      </Div>
    </Group>
  </FormStatus>
);

export default Alert;
