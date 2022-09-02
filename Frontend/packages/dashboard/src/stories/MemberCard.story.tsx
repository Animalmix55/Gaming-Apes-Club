/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import MemberCard from '../atoms/MemberCard';
import '../styles/global.css';
import data from '../assets/team';

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
    name: data[0].name,
    alias: data[0].alias,
    title: data[0].title,
    image: data[0].image,
    twitter: data[0].twitter,
};
