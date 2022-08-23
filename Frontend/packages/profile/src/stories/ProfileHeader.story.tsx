/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ProfileHeader from '../atoms/ProfileHeader';
import '../styles/global.css';

export default {
    title: 'Profile/Atoms/ProfileHeader',
    component: ProfileHeader,
};

const Template = (
    args: React.ComponentProps<typeof ProfileHeader>
): JSX.Element => {
    return (
        <div style={{ padding: '3rem', backgroundColor: 'darkgrey' }}>
            <ProfileHeader {...args} />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    name: 'Mr. Krockett',
    image: 'https://lh3.googleusercontent.com/gtRedQThacyBS3cJikU2QXkyhJL6vmmz8GlLQAEB5f8GsiXlqjRxWgRKAlbxyu1cBbwUoidpo3vxp64VH8tkUPW00eepbiV126wmLA=w600',
    discord: 'Mr Krockett#0014',
};
