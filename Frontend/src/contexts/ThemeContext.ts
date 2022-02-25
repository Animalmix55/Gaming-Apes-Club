import React from 'react';
import RGBA, { rgba } from '../utilties/Colors';

interface Fonts {
    title: string;
    body: string;
}

interface FontColors {
    light: RGBA;
    dark: RGBA;
}

interface BackgroundGradients {
    purpleBlue: string;
    purpleBlueButton: string;
}

interface Pallette {
    purple: RGBA;
}

interface BackgroundColors {
    dark: RGBA;
}

export interface ThemeContextType {
    fonts: Fonts;
    fontColors: FontColors;
    pallette: Pallette;
    backgroundGradients: BackgroundGradients;
    backgroundColor: BackgroundColors;
}

export const DefaultTheme: ThemeContextType = {
    fonts: {
        title: 'RapierZero',
        body: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
    },
    fontColors: {
        light: rgba(255, 255, 255),
        dark: rgba(0, 0, 0),
    },
    pallette: {
        purple: rgba(136, 74, 187),
    },
    backgroundGradients: {
        purpleBlue: 'linear-gradient(90deg, #623fe2, #238df3)',
        purpleBlueButton: 'linear-gradient(235deg, #a200ff, #060c21, #00bcd4)',
    },
    backgroundColor: {
        dark: rgba(0, 0, 0),
    },
};

export const ThemeContext = React.createContext<ThemeContextType>(DefaultTheme);

export const ThemeContextProvider = ThemeContext.Provider;

export const useThemeContext = (): ThemeContextType =>
    React.useContext(ThemeContext);
