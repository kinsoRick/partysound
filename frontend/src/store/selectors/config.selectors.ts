import { TRootState } from '..';

const selectTheme = (state: TRootState) => state.config.theme;
export default selectTheme;
