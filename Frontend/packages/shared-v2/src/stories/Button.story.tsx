import React from 'react';
import { ButtonType, Button } from '../atoms/Button';
import OpenSea from '../assets/png/social/Opensea.png';

export default {
    title: 'Shared/v2/Atoms/Button',
    component: Button,
};

export const Primary = (): JSX.Element => {
    return <Button themeType={ButtonType.primary} type="button" text="Test" />;
};

export const Secondary = (): JSX.Element => {
    return (
        <Button themeType={ButtonType.secondary} type="button" text="Test" />
    );
};

export const PrimaryWithIcon = (): JSX.Element => {
    return (
        <Button
            icon={OpenSea}
            themeType={ButtonType.primary}
            type="button"
            text="Test"
        />
    );
};
