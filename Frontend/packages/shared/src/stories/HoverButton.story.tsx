import React from 'react';
import { GlowButton } from '../atoms/GlowButton';

export default {
    title: 'Atoms/HoverButton',
    component: GlowButton,
};

export const StandAlone = (): JSX.Element => {
    return <GlowButton>Test</GlowButton>;
};

export const Round = (): JSX.Element => {
    return <GlowButton round>Test</GlowButton>;
};
