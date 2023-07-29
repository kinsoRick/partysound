import { useTranslation } from 'react-i18next';
import { Link, Div, Separator } from '@vkontakte/vkui';
import { Icon28ReportOutline } from '@vkontakte/icons';

import Alert from '../../../components/Alert';
import PlaylistGroup from '../../../components/PlaylistGroup';
import FriendsSelector from '../../../components/FriendsSelector/FriendsSelector';

interface Props {
  id: string;
}

const FriendsTab = ({ id }: Props) => {
  const { t } = useTranslation();

  return (
    <Div id={id}>
      <Alert
        header={t('noAccessToAudios')}
        description={t('audiosPrivacy')}
        type="default"
        icon={<Icon28ReportOutline fill="E64646" />}
        action={<Link href="/">{t('changePrivacySettings')}</Link>}
      />
      <Separator />
      <PlaylistGroup />
      <FriendsSelector />
    </Div>
  );
};

export default FriendsTab;
