import { TRootState } from '..';

const selectStory = (state: TRootState) => state.ui.epic.activeStory;
export default selectStory;
