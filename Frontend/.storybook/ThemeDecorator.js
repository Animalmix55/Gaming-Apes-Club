import { ThemeContextProvider, DefaultTheme } from '../src/contexts/ThemeContext';

export default (story) => <ThemeContextProvider value={DefaultTheme}>{story()}</ThemeContextProvider> 