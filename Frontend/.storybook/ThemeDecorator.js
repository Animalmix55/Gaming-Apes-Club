import { ThemeContextProvider, DefaultTheme } from '@gac/shared';
import { ThemeContextProvider as ThemeContextProviderV2, DefaultTheme as DefaultThemeV2 } from '@gac/shared-v2';

export default (story) => 
    <ThemeContextProvider value={DefaultTheme}>
        <ThemeContextProviderV2 value={DefaultThemeV2}>
            {story()}
        </ThemeContextProviderV2>
    </ThemeContextProvider> 