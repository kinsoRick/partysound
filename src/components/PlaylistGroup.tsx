import {
  Group, Header, Link, Placeholder,
} from '@vkontakte/vkui';
import { useTranslation } from 'react-i18next';

const PlaylistGroup = () => {
  const { t } = useTranslation();

  return (
    <Group mode="plain">
      <Header mode="primary" aside={<Link href="/">{t('viewAll')}</Link>}>
        {t('playlists')}
      </Header>
      <Placeholder
        header={t('noPlaylists')}
      >
        {t('noPlaylistsAction')}
      </Placeholder>
    </Group>
  );
};

export default PlaylistGroup;
