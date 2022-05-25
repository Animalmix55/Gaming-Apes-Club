import React from 'react';
import { LoginButton } from '../atoms/LoginButton';

export default {
    title: 'Shared/v2/Atoms/LoginButton',
    component: LoginButton,
};

export const Primary = ({ active }: { active: boolean }): JSX.Element => {
    return <LoginButton active={active} />;
};

Primary.args = { active: false };
