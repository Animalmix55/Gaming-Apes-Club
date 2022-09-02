import React from 'react';
import { LinkButtonType, LinkButton } from '../atoms/LinkButton';
import OpenSea from '../assets/png/social/Opensea.png';

export default {
    title: 'Shared/v2/Atoms/LinkButton',
    component: LinkButton,
};

export const Primary = (): JSX.Element => {
    return (
        <LinkButton href="#" themeType={LinkButtonType.primary} text="Test" />
    );
};

export const Secondary = (): JSX.Element => {
    return (
        <LinkButton href="#" themeType={LinkButtonType.secondary} text="Test" />
    );
};

export const PrimaryWithIcon = (): JSX.Element => {
    return (
        <LinkButton
            href="#"
            icon={OpenSea}
            themeType={LinkButtonType.primary}
            text="Test"
        />
    );
};
