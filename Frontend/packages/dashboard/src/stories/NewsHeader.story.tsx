/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import NewsHeader from '../organisms/NewsHeader';
import '../styles/global.css';

export default {
    title: 'Dashboard/Organisms/NewsHeader',
    component: NewsHeader,
};

const Template = (
    args: React.ComponentProps<typeof NewsHeader>
): JSX.Element => {
    return (
        <div
            style={{
                padding: '3rem',
                backgroundColor: 'black',
                overflow: 'hidden',
            }}
        >
            <NewsHeader />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {};
