import { Avatar, Cell } from '@vkontakte/vkui';
import { AnyFunction } from '@vkontakte/vkui/dist/types';
import { useTranslation } from 'react-i18next';

interface Props {
  isClosed: boolean;
  displayName: string;
  photo: string;
  checked: boolean;
  onClick: AnyFunction
}

const FriendItem = ({
  isClosed, displayName, photo, checked, onClick,
}: Props) => {
  const { t } = useTranslation();
  return (
    <Cell
      onClick={onClick}
      subtitle={isClosed ? <span style={{ color: '#F05A5A' }}>{t('audiosHidden')}</span> : null}
      before={<Avatar src={photo} />}
      after={
        isClosed ? null : <Cell.Checkbox checked={checked} onChange={() => {}} />
      }
    >
      {displayName}
    </Cell>
  );
};

export default FriendItem;
