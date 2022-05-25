import React from 'react';
import { ButtonType } from '../atoms/Button';
import Home from '../assets/png/action/Home.png';
import { SidebarButton } from '../atoms/SidebarButton';

export default {
    title: 'Shared/v2/Atoms/SidebarButton',
    component: SidebarButton,
};

export const Primary = ({
    selected,
    disabled,
}: {
    selected: boolean;
    disabled: boolean;
}): JSX.Element => {
    return (
        <SidebarButton
            themeType={ButtonType.primary}
            icon={Home}
            disabled={disabled}
            selected={selected}
            text="Dashboard"
        />
    );
};

Primary.args = { selected: false, disabled: false };

export const PrimaryCollapsed = ({
    selected,
}: {
    selected: boolean;
}): JSX.Element => {
    return (
        <SidebarButton
            collapsed
            themeType={ButtonType.primary}
            icon={Home}
            selected={selected}
            text="Dashboard"
        />
    );
};

PrimaryCollapsed.args = { selected: false };

export const Secondary = ({ selected }: { selected: boolean }): JSX.Element => {
    return (
        <SidebarButton
            themeType={ButtonType.secondary}
            icon={Home}
            selected={selected}
            text="Dashboard"
        />
    );
};

Secondary.args = { selected: false };

export const SecondaryCollapsed = ({
    selected,
}: {
    selected: boolean;
}): JSX.Element => {
    return (
        <SidebarButton
            collapsed
            themeType={ButtonType.secondary}
            icon={Home}
            selected={selected}
            text="Dashboard"
        />
    );
};

SecondaryCollapsed.args = { selected: false };
