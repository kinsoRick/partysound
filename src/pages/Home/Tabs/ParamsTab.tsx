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

interface Props {
  id: string;
}

const ParamsTab = ({ id }: Props) => {
  const { t } = useTranslation();

  return (
    <Div id={id}>
      <Formik
        initialValues={{
          playlistName: '',
          useUserAccount: true,
          verifiedArtistsOnly: false,
          quantityToAdd: 2,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          values, handleChange, setFieldValue, submitForm,
        }) => (
          <FormLayout>
            <FormItem top={t('playlistName')}>
              <Input
                id="playlistName"
                name="playlistName"
                value={values.playlistName}
                onChange={handleChange}
                placeholder={t('setPlaylistName')}
              />
            </FormItem>

            <FormItem top={t('options')}>
              <Checkbox
                description={t('useUserAccountDescription')}
                checked={values.useUserAccount}
                name="useUserAccount"
                id="useUserAccount"
                onChange={handleChange}
              >
                {t('useUserAccount')}
              </Checkbox>
              <Checkbox
                checked={values.verifiedArtistsOnly}
                description={t('onlyVerifiedArtistsDescription')}
                name="verifiedArtistsOnly"
                id="verifiedArtistsOnly"
                onChange={handleChange}
              >
                {t('onlyVerifiedArtists')}
              </Checkbox>
            </FormItem>

            <FormItem top={values.quantityToAdd}>
              <Slider
                min={2}
                max={10}
                value={values.quantityToAdd}
                step={1}
                onChange={(value) => setFieldValue('quantityToAdd', value)}
              />
            </FormItem>
            <ButtonGroup mode="horizontal" className="friends-group--btn-group">
              <Button
                appearance="positive"
                size="l"
                stretched
                onClick={submitForm}
              >
                {t('select')}
              </Button>
            </ButtonGroup>
          </FormLayout>
        )}
      </Formik>
    </Div>
  );
};

export default ParamsTab;
