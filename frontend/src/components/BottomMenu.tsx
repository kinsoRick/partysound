import { SyntheticEvent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import { useSelector } from 'react-redux';
import {
  Icon24HomeOutline,
  Icon24Home,
} from '@vkontakte/icons';
import selectStory from '../store/selectors/epic.selectors';
import useActions from '../hooks/useActions';

const BottomMenu = () => {
  const { t } = useTranslation();
  const activeStory = useSelector(selectStory);

  const { setActiveStory } = useActions();

  const selectTab = (e: SyntheticEvent<HTMLElement>) => {
    setActiveStory(e.currentTarget.dataset.story);
  };

  const menuTabs = useMemo(
    () => [
      {
        name: 'home',
        icon: <Icon24HomeOutline />,
        selectedIcon: <Icon24Home />,
        text: t('main'),
      },
    ],
    [t],
  );

  return (
    <Tabbar>
      {menuTabs.map(({
        name, text, icon, selectedIcon,
      }) => (
        <TabbarItem
          key={text}
          onClick={selectTab}
          selected={name === activeStory}
          data-story={name}
          text={text}
        >
          {name === activeStory ? selectedIcon : icon}
        </TabbarItem>
      ))}
    </Tabbar>
  );
};

export default BottomMenu;
