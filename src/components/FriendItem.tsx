import { Avatar, Cell } from '@vkontakte/vkui';
import { AnyFunction } from '@vkontakte/vkui/dist/types';
import { memo } from 'react';

import { useTranslation } from 'react-i18next';

interface Props {
  isClosed: boolean;
  displayName: string;
  photo: string;
  onClick: AnyFunction;
}

const FriendItem = ({
  isClosed, displayName, photo, onClick,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Cell
      onClick={onClick}
      subtitle={isClosed ? <span style={{ color: '#F05A5A' }}>{t('audiosHidden')}</span> : null}
      before={<Avatar src={photo} />}
      mode="selectable"
    >
      {displayName}
    </Cell>
  );
};

export default memo(
  FriendItem,
  (prevProps, newProps) => prevProps.displayName !== newProps.displayName,
);
