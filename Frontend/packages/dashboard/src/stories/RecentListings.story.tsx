/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import RecentListings from '../organisms/RecentListings';
import '../styles/global.css';

export default {
    title: 'Dashboard/Organisms/RecentListings',
    component: RecentListings,
};

const Template = (
    args: React.ComponentProps<typeof RecentListings>
): JSX.Element => {
    return (
        <div
            style={{
                padding: '3rem',
                backgroundColor: 'black',
                overflow: 'hidden',
            }}
        >
            <RecentListings />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {};
