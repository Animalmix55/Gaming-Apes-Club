/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import MemberCard from '../atoms/MemberCard';
import '../styles/global.css';

export default {
    title: 'Dashboard/Atoms/MemberCard',
    component: MemberCard,
};

const Template = (
    args: React.ComponentProps<typeof MemberCard>
): JSX.Element => {
    return (
        <div style={{ padding: '3rem', backgroundColor: 'black' }}>
            <MemberCard {...args} />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    name: 'David',
    alias: 'Politikos',
    title: 'Chief Executive Officer',
    image: undefined,
    twitter: 'david',
};
