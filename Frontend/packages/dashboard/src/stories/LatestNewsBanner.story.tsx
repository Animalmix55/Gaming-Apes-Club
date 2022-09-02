/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import LatestNewsBanner from '../organisms/LatestNewsBanner';
import '../styles/global.css';

export default {
    title: 'Dashboard/Organisms/LatestNewsBanner',
    component: LatestNewsBanner,
};

const Template = (
    args: React.ComponentProps<typeof LatestNewsBanner>
): JSX.Element => {
    return (
        <div
            style={{
                padding: '3rem',
                backgroundColor: 'black',
                overflow: 'hidden',
            }}
        >
            <LatestNewsBanner />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {};
