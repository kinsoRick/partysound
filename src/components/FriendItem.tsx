import { Avatar, Cell } from '@vkontakte/vkui';
import { AnyFunction } from '@vkontakte/vkui/dist/types';
import { memo } from 'react';

import { useTranslation } from 'react-i18next';

interface Props {
  isClosed: boolean;
  displayName: string;
  photo: string;
  onClick: AnyFunction;
  mode?: 'selectable' | 'removable';
}

const FriendItem = ({
  isClosed, displayName, photo, onClick, mode,
}: Props) => {
  const { t } = useTranslation();

  if (mode === undefined) {
    return (
      <Cell
        onChange={onClick}
        subtitle={isClosed ? <span style={{ color: '#F05A5A' }}>{t('audiosHidden')}</span> : null}
        before={<Avatar src={photo} />}
      >
        {displayName}
      </Cell>
    );
  }

  return (
    <Cell
      onChange={onClick}
      subtitle={isClosed ? <span style={{ color: '#F05A5A' }}>{t('audiosHidden')}</span> : null}
      before={<Avatar src={photo} />}
      mode={mode}
    >
      {displayName}
    </Cell>
  );
};

export default memo(
  FriendItem,
  (prevProps, newProps) => prevProps.displayName !== newProps.displayName,
);
