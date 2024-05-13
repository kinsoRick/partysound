import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Div,
  FormLayout,
  FormItem,
  Checkbox,
  Input,
  Slider,
  Button,
  ButtonGroup,
} from '@vkontakte/vkui';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { TRootState } from '../../../store';

import { useCreatePlaylistMutation } from '../../../services/api';
import { selectSelectedFriendIds } from '../../../store/slices/friends/selectors';

import FriendsList from '../../../components/FriendsList';
import LocalAlert from '../../../components/Alert/local';
import { EAlertType } from '../../../store/slices/ui/alert/types';
import useActions from '../../../hooks/useActions';

interface Props {
  id: string;
}

type TFormValues = {
  playlistName: string;
  useUserAccount: boolean;
  verifiedArtistsOnly: boolean;
  quantityToAdd: number;
};

const ParamsTab = ({ id }: Props) => {
  const { t } = useTranslation();
  const currentStatusFriends = useSelector((state: TRootState) => state.friends.status);
  const firstName = useSelector((state: TRootState) => state.user.firstName);

  const closedIds = useSelector((state: TRootState) => state.friends.closed);
  const selectedIds = useSelector(selectSelectedFriendIds);

  const { setActiveModalName, setCurrentPlaylist } = useActions();
  const [availableFriends, setAvailableFriends] = useState<number[]>(selectedIds);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(true);

  const [createPlaylist] = useCreatePlaylistMutation();

  const userId = useSelector((state: TRootState) => state.user.id);

  const getMaxUsers = (useUserAccount: boolean) => {
    if (useUserAccount) return availableFriends.length + 1;
    return availableFriends.length;
  };

  useEffect(() => {
    setAvailableFriends(selectedIds.filter((friend) => !closedIds.includes(friend)));
    const isFormDisable = availableFriends.length < 1 || currentStatusFriends !== 'fulfilled';
    setIsFormDisabled(isFormDisable);
  }, [availableFriends.length, closedIds, selectedIds, currentStatusFriends]);

  const submitPlaylistCreation = (values: TFormValues) => {
    const userIds = (values.useUserAccount) ? [userId, ...availableFriends] : availableFriends;

    const data = {
      title: values.playlistName,
      verified_artists_only: values.useUserAccount,
      occurences_to_track_add: values.quantityToAdd,
      user_ids: userIds,
    };

    setIsFormDisabled(true);

    createPlaylist(data)
      .then((playlist) => {
        if ('data' in playlist) {
          setCurrentPlaylist(playlist.data);
        }
        setActiveModalName('resendPlaylistModal');

        setIsFormDisabled(false);
      })
      .catch(() => {
        setIsFormDisabled(false);
      });
  };

  return (
    <Div id={id}>
      {(isFormDisabled && availableFriends.length < 1) ? (
        <LocalAlert type={EAlertType.ERROR} header={t('friendsAudiosHidden')} description={t('friendsAudiosHiddenDescription')} isCloseable={false} />
      ) : null}
      <Formik
        initialValues={{
          playlistName: `Плейлист пользователя ${firstName}`,
          useUserAccount: true,
          verifiedArtistsOnly: false,
          quantityToAdd: 2,
        }}
        onSubmit={submitPlaylistCreation}
      >
        {({
          values, handleChange, setFieldValue, submitForm,
        }) => (
          <FormLayout style={{ marginBottom: '15px' }}>
            <FormItem top={t('playlistName')}>
              <Input
                id="playlistName"
                name="playlistName"
                value={values.playlistName}
                onChange={handleChange}
                placeholder={t('setPlaylistName')}
                disabled={isFormDisabled}
              />
            </FormItem>

            <FormItem top={t('options')}>
              <Checkbox
                description={t('useUserAccountDescription')}
                checked={values.useUserAccount}
                name="useUserAccount"
                id="useUserAccount"
                onChange={handleChange}
                disabled={availableFriends.length < 2}
              >
                {t('useUserAccount')}
              </Checkbox>
              <Checkbox
                checked={values.verifiedArtistsOnly}
                description={t('onlyVerifiedArtistsDescription')}
                name="verifiedArtistsOnly"
                id="verifiedArtistsOnly"
                onChange={handleChange}
                disabled={isFormDisabled}
              >
                {t('onlyVerifiedArtists')}
              </Checkbox>
            </FormItem>

            <FormItem top={`${values.quantityToAdd}/${getMaxUsers(values.useUserAccount)} вхождений используется`}>
              <Slider
                min={2}
                max={getMaxUsers(values.useUserAccount)}
                value={values.quantityToAdd}
                step={1}
                onChange={(value) => setFieldValue('quantityToAdd', value)}
                disabled={isFormDisabled}
              />
            </FormItem>
            <ButtonGroup mode="horizontal" className="flex flex-column">
              <Button
                appearance="positive"
                size="l"
                stretched
                onClick={submitForm}
                disabled={isFormDisabled}
              >
                {t('createPlaylist')}
              </Button>
            </ButtonGroup>
          </FormLayout>
        )}
      </Formik>
      <FriendsList mode="view" />
    </Div>
  );
};

export default ParamsTab;
