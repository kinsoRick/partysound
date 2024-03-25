import { Avatar, Cell } from '@vkontakte/vkui';
import Skeleton from 'react-loading-skeleton';

const SkeletonFriendItem = () => (
  <Cell before={(
    <Avatar>
      <Skeleton circle height={48} width={48} />
    </Avatar>
  )}
  >
    <div style={{ marginLeft: '8px', flex: 1 }}>
      <Skeleton height={20} width={150} style={{ marginBottom: '8px' }} />
      <Skeleton height={14} width={100} />
    </div>
  </Cell>
);

export default SkeletonFriendItem;
