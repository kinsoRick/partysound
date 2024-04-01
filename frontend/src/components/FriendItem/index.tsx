import { memo, useState } from 'react';

import { Avatar, Cell } from '@vkontakte/vkui';
import { AnyFunction } from '@vkontakte/vkui/dist/types';
import { useTranslation } from 'react-i18next';
import SkeletonFriendItem from './Skeleton';

interface Props {
  isClosed: boolean;
  displayName: string;
  photo: string;
  onClick: AnyFunction;
  mode?: 'selectable' | 'removable' | 'view';
}

const FriendItem = ({
  isClosed, displayName, photo, onClick, mode,
}: Props) => {
  const { t } = useTranslation();
  const [isSelected, setIsSelected] = useState(false);
  const subtitle = isClosed ? <span style={{ color: '#F05A5A' }}>{t('audiosHidden')}</span> : null;
  const currentMode = (mode !== 'view') ? mode : undefined;

  const onChange = () => {
    setIsSelected(!isSelected);
    onClick();
  };

  return (
    <Cell
      onClick={onChange}
      subtitle={subtitle}
      before={<Avatar src={photo} />}
      after={(currentMode === 'selectable') ? <Cell.Checkbox onChange={() => {}} checked={isSelected} /> : null}
    >
      {displayName}
    </Cell>
  );
};

export { SkeletonFriendItem };
export default memo(
  FriendItem,
  (prevProps, newProps) => prevProps.displayName !== newProps.displayName,
);
