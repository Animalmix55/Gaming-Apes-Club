/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import TeamMembers from '../molecules/TeamMembers';
import '../styles/global.css';

export default {
    title: 'Dashboard/Molecules/TeamMembers',
    component: TeamMembers,
};

const Template = (
    args: React.ComponentProps<typeof TeamMembers>
): JSX.Element => {
    return (
        <div style={{ padding: '3rem', backgroundColor: 'black' }}>
            <TeamMembers />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {};
