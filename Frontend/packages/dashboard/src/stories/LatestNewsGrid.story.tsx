/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import LatestNewsGrid from '../organisms/LatestNewsGrid';
import '../styles/global.css';

export default {
    title: 'Dashboard/Organisms/LatestNewsGrid',
    component: LatestNewsGrid,
};

const Template = (
    args: React.ComponentProps<typeof LatestNewsGrid>
): JSX.Element => {
    return (
        <div style={{ padding: '3rem', backgroundColor: 'black' }}>
            <LatestNewsGrid />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {};
