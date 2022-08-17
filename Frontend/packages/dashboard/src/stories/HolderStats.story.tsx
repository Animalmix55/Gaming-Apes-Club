/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import HolderStats from '../organisms/HolderStats';
import '../styles/global.css';

export default {
    title: 'Dashboard/Organisms/HolderStats',
    component: HolderStats,
};

const Template = (
    args: React.ComponentProps<typeof HolderStats>
): JSX.Element => {
    return (
        <div
            style={{
                padding: '3rem',
                backgroundColor: 'black',
                overflow: 'hidden',
            }}
        >
            <HolderStats />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {};
