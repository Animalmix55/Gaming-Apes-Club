/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Partners from '../organisms/Partners';
import '../styles/global.css';

export default {
    title: 'Dashboard/Organisms/Partners',
    component: Partners,
};

const Template = (args: React.ComponentProps<typeof Partners>): JSX.Element => {
    return (
        <div
            style={{
                padding: '3rem',
                backgroundColor: 'black',
                overflow: 'hidden',
            }}
        >
            <Partners />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {};
