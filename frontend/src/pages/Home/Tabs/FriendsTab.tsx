import { Div, Separator } from '@vkontakte/vkui';

import PlaylistGroup from '../../../components/PlaylistGroup';
import FriendsSelector from '../../../components/FriendsSelector/FriendsSelector';

interface Props {
  id: string;
}

const FriendsTab = ({ id }: Props) => (
  <Div id={id}>
    <Separator />
    <PlaylistGroup />
    <FriendsSelector />
  </Div>
);

export default FriendsTab;
