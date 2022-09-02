/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PartnerCard from '../atoms/PartnerCard';
import partners from '../assets/partners';
import '../styles/global.css';

export default {
    title: 'Dashboard/Atoms/PartnerCard',
    component: PartnerCard,
};

const Template = (
    args: React.ComponentProps<typeof PartnerCard>
): JSX.Element => {
    return (
        <div style={{ padding: '3rem', backgroundColor: 'black' }}>
            <PartnerCard {...args} />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    ...partners[0],
};
