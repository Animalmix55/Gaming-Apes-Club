/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ShackSpecialCard from '../atoms/ShackSpecialCard';
import specials from '../assets/specials';
import '../styles/global.css';

export default {
    title: 'Dashboard/Atoms/ShackSpecialCard',
    component: ShackSpecialCard,
};

const Template = (
    args: React.ComponentProps<typeof ShackSpecialCard>
): JSX.Element => {
    return (
        <div style={{ padding: '3rem', backgroundColor: 'black' }}>
            <ShackSpecialCard {...args} />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    ...specials[0],
};
