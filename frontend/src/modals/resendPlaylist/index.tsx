import React from 'react';
import {
  Button,
  ButtonGroup,
  ModalCard,
} from '@vkontakte/vkui';
import { Icon48Playlist } from '@vkontakte/icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { setActiveModalName } from '../../store/slices/ui/modals';
import { TRootState, useAppDispatch } from '../../store';
import { useSendPlaylistMutation } from '../../services/api';

interface Props {
  id: string;
}

const SendPlaylistModal = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentPlaylist = useSelector((state: TRootState) => state.user.currentPlaylist);
  const userId = useSelector((state: TRootState) => state.user.id);

  const closeModal = () => dispatch(setActiveModalName(''));

  const [sendPlaylist] = useSendPlaylistMutation();

  return (
    <ModalCard
      id={id}
      onClose={() => closeModal()}
      icon={<Icon48Playlist />}
      header={t('playlistSendHeader', { title: currentPlaylist?.title })}
      subheader={t('playlistSendDescription')}
      actions={(
        <ButtonGroup mode="horizontal" stretched gap="m" align="right">
          <Button
            size="l"
            mode="primary"
            onClick={() => {
              if (currentPlaylist !== null) {
                sendPlaylist({
                  user_id: userId,
                  playlist_id: currentPlaylist.playlist_id,
                });
              }

              return closeModal();
            }}
          >
            {t('send')}
          </Button>
          <Button
            size="l"
            mode="outline"
            onClick={() => closeModal()}
          >
            {t('close')}
          </Button>
        </ButtonGroup>
      )}
    />
  );
};

export default SendPlaylistModal;
