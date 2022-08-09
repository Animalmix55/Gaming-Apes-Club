import React from 'react';
import { CheckableButton } from '../atoms/CheckableButton';
import { ButtonType } from '../atoms/Button';

export default {
    title: 'Shared/v2/Atoms/CheckableButton',
    component: CheckableButton,
};

export const Primary = (): JSX.Element => {
    const [checked, setChecked] = React.useState(false);

    return (
        <CheckableButton
            checked={checked}
            onClick={(): void => setChecked((c): boolean => !c)}
            themeType={ButtonType.primary}
            text="Test"
        />
    );
};

export const Secondary = (): JSX.Element => {
    const [checked, setChecked] = React.useState(false);

    return (
        <CheckableButton
            checked={checked}
            onClick={(): void => setChecked((c): boolean => !c)}
            themeType={ButtonType.secondary}
            text="Test"
        />
    );
};
