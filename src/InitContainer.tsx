import { SkeletonTheme } from 'react-loading-skeleton';
import {
  Epic, SplitLayout, useAppearance,
} from '@vkontakte/vkui';
import { useSelector } from 'react-redux';

import Home from './pages/Home';
import BottomMenu from './components/BottomMenu';
import selectStory from './store/selectors/epic.selectors';
import ModalContainer from './modals';

const InitContainer = () => {
  const appearance = useAppearance();
  const activeStory = useSelector(selectStory);

  const skeletonBaseColor = (appearance === 'dark') ? '#202020' : undefined;
  const skeletonHighlightColor = (appearance === 'dark') ? '#444' : undefined;

  return (
    <SkeletonTheme baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor}>
      <SplitLayout modal={<ModalContainer />}>
        <Epic activeStory={activeStory} tabbar={<BottomMenu />}>
          <Home id="home" />
        </Epic>
      </SplitLayout>
    </SkeletonTheme>
  );
};

export default InitContainer;
