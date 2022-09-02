/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import HeaderControls from '../atoms/HeaderControls';
import '../styles/global.css';

export default {
    title: 'Dashboard/Atoms/BannerControls',
    component: HeaderControls,
};

const Template = (
    args: React.ComponentProps<typeof HeaderControls>
): JSX.Element => {
    return (
        <div style={{ padding: '3rem', backgroundColor: 'black' }}>
            <HeaderControls {...args} />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    total: 10,
    currentIndex: 5,
};
