import { SyntheticEvent, useState } from 'react';
import { Tabs, TabsItem, Group } from '@vkontakte/vkui';
import { useTranslation } from 'react-i18next';

interface Props {
  tabs: string[];
  children: JSX.Element[];
  defaultTab: string;
}

const TabsWrapper = ({ tabs, children, defaultTab = '' }: Props) => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState(defaultTab);

  const selectTab = (e: SyntheticEvent<HTMLElement>) => {
    setCurrentTab(e.currentTarget.dataset.name ?? '');
  };

  const renderInnerTab = () => children.find((element) => element.props.id === currentTab);

  return (
    <>
      <Group mode="plain">
        <Tabs>
          {tabs.map((name) => (
            <TabsItem
              key={name}
              selected={name === currentTab}
              onClick={selectTab}
              data-name={name}
            >
              {t(name)}
            </TabsItem>
          ))}
        </Tabs>
      </Group>
      {renderInnerTab()}
    </>
  );
};

export default TabsWrapper;
