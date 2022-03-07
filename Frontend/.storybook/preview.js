import '@gac/mint/src/styles/global.css';
import '@gac/market/src/styles/global.css';
import ContractContextDecorator from './ContractContextDecorator';
import GamingApeClubDecorator from './GamingApeClubDecorator';
import ProviderDecorator from './ProviderDecorator';
import QueryClientDecorator from './QueryClientDecorator';
import StyletronDecorator from "./StyletronDecorator";
import ThemeDecorator from './ThemeDecorator';
import ToastDecorator from './ToastDecorator';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [QueryClientDecorator, ContractContextDecorator, StyletronDecorator, ThemeDecorator, ProviderDecorator, GamingApeClubDecorator, ToastDecorator];