import { Tabs, TabsItem } from '@vkontakte/vkui';
import { t } from 'i18next';
import {
  useState, SyntheticEvent, memo,
} from 'react';

export const TAB_FRIENDS = 'friends';
export const TAB_PARAMS = 'params';

interface Props {
  onTabChange: (tab: string) => void;
}

const HomeTabs = ({ onTabChange }: Props) => {
  const [currentTab, setCurrentTab] = useState(TAB_FRIENDS);
  const setTab = (e: SyntheticEvent<HTMLElement>) => {
    const tab = e.currentTarget.dataset.name as string;

    onTabChange(tab);
    return setCurrentTab(tab);
  };

  return (
    <Tabs>
      <TabsItem
        id={`tab-${TAB_FRIENDS}`}
        aria-controls={`tab-content-${TAB_FRIENDS}`}
        selected={currentTab === TAB_FRIENDS}
        onClick={setTab}
        data-name={TAB_FRIENDS}
      >
        {t('friends')}
      </TabsItem>
      <TabsItem
        id={`tab-${TAB_PARAMS}`}
        aria-controls={`tab-content-${TAB_PARAMS}`}
        selected={currentTab === TAB_PARAMS}
        onClick={setTab}
        data-name={TAB_PARAMS}
      >
        {t('params')}
      </TabsItem>
    </Tabs>
  );
};

export default memo(
  HomeTabs,
  (prevProps, newProps) => prevProps.onTabChange !== newProps.onTabChange,
);
