import React from 'react';
import { Badge } from '../atoms/Badge';
import { useThemeContext } from '../contexts/ThemeContext';

export default {
    title: 'Shared/v2/Atoms/Badge',
    component: Badge,
};

export const Red = (): JSX.Element => {
    const theme = useThemeContext();

    return (
        <Badge
            text="Raffle"
            color={theme.additionalPallette.red.toRgbaString()}
            textColor={theme.foregroundPallette.white.toRgbaString()}
        />
    );
};
