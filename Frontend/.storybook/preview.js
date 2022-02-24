import '../src/styles/global.css';
import GamingApeClubDecorator from './GamingApeClubDecorator';
import ProviderDecorator from './ProviderDecorator';
import StyletronDecorator from "./StyletronDecorator";
import ThemeDecorator from './ThemeDecorator';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [StyletronDecorator, ThemeDecorator, ProviderDecorator, GamingApeClubDecorator];