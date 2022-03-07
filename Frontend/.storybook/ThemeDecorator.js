import { ThemeContextProvider, DefaultTheme } from '@gac/shared';

export default (story) => <ThemeContextProvider value={DefaultTheme}>{story()}</ThemeContextProvider> 