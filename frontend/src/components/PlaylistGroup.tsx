import React from 'react';
import {
  Group, Header, Placeholder, HorizontalScroll, HorizontalCell, Image, Subhead,
} from '@vkontakte/vkui';
import { AnyFunction } from '@vkontakte/vkui/dist/types';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Icon28MusicOutline } from '@vkontakte/icons';

import { TRootState } from '../store';
import useActions from '../hooks/useActions';

const musicGradient = 'linear-gradient(135deg, #ADE6FF 0%, #ABE3FF 1%, #A7DCFF 3%, #A0CFFF 7%, #97BCFF 12%, #8DA4FF 19%, #8285FF 26%, #8B76FF 34%, #9C6AFF 43%, #B05FFF 52%, #C655FF 62%, #DB4CFF 71%, #EE45FF 81%, #FA41FF 91%, #FF3FFF 100%)';

const renderPlaylists = (
  playlists: { id: number; title: string; owner_id: string; track_count: number; }[],
  onClick: AnyFunction,
) => playlists.map(({
  id,
  title,
  track_count,
}, index) => (
  <HorizontalCell
    onClick={() => onClick(playlists[index])}
    key={id}
    data-playlist-id={id}
    style={{
      maxWidth: '138px',
      display: 'block',
    }}
    size="l"
    header={(
      <Subhead
        weight="1"
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </Subhead>
    )}
  >
    <Image size={128} style={{ backgroundImage: musicGradient }}>
      <p style={{ color: 'white' }}>
        {`${track_count} `}
      </p>
      <Icon28MusicOutline fill="#fff" />
    </Image>
  </HorizontalCell>
));

const PlaylistGroup = () => {
  const { t } = useTranslation();
  const playlists = useSelector((state: TRootState) => state.user.playlists);
  const { setActiveModalName, setCurrentPlaylist } = useActions();

  return (
    <Group mode="plain">
      <Header mode="primary">
        {t('playlists')}
      </Header>
      {playlists.length > 0 && (
        <HorizontalScroll showArrows>
          <div className="flex">
            {renderPlaylists(playlists, (playlist) => {
              setCurrentPlaylist(playlist);
              setActiveModalName('resendPlaylistModal');
            })}
          </div>
        </HorizontalScroll>
      )}
      {playlists.length < 1 && (
        <Placeholder
          header={t('noPlaylists')}
        >
          {t('noPlaylistsAction')}
        </Placeholder>
      )}

    </Group>
  );
};

export default PlaylistGroup;
