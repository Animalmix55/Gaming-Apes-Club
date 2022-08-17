/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ShackSpecials from '../organisms/ShackSpecials';
import '../styles/global.css';

export default {
    title: 'Dashboard/Organisms/ShackSpecials',
    component: ShackSpecials,
};

const Template = (
    args: React.ComponentProps<typeof ShackSpecials>
): JSX.Element => {
    return (
        <div
            style={{
                padding: '3rem',
                backgroundColor: 'black',
                overflow: 'hidden',
            }}
        >
            <ShackSpecials />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {};
