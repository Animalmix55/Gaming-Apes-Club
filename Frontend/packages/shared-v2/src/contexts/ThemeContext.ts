import '../styles/global.css';
import React from 'react';
import { initializeIcons } from '@fluentui/react';
import { RGBA, rgba } from '../utilties/Colors';

initializeIcons();

interface ForegroundPallette {
    primary: RGBA;
    secondary: RGBA;
    accent: RGBA;
    white: RGBA;
    black: RGBA;
}

interface BackgroundPallette {
    light: RGBA;
    dark: RGBA;
    darker: RGBA;
}

interface ButtonPallette {
    primary: RGBA;
    secondary: RGBA;
    hovered: RGBA;
    disabled: RGBA;
    error: RGBA;
    inactive: RGBA;
}

export interface ThemeContextType {
    font: string;
    foregroundPallette: ForegroundPallette;
    backgroundPallette: BackgroundPallette;
    buttonPallette: ButtonPallette;
}

export const DefaultTheme: ThemeContextType = {
    font: 'Montserrat',
    foregroundPallette: {
        primary: rgba(115, 91, 242),
        secondary: rgba(255, 255, 255, 1),
        accent: rgba(255, 217, 82, 1),
        white: rgba(255, 255, 255, 1),
        black: rgba(0, 0, 0, 1),
    },
    backgroundPallette: {
        light: rgba(35, 44, 69, 1),
        dark: rgba(22, 28, 45, 0.8),
        darker: rgba(12, 17, 24, 0.6),
    },
    buttonPallette: {
        primary: rgba(115, 91, 242, 1),
        secondary: rgba(115, 91, 242, 0.2),
        hovered: rgba(69, 55, 145, 1),
        disabled: rgba(22, 28, 45, 1),
        error: rgba(144, 0, 0, 1),
        inactive: rgba(36, 36, 36, 1),
    },
};

export const ThemeContext = React.createContext<ThemeContextType>(DefaultTheme);

export const ThemeContextProvider = ThemeContext.Provider;

export const useThemeContext = (): ThemeContextType =>
    React.useContext(ThemeContext);
