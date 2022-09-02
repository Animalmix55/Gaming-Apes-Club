/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import RankItem from '../atoms/RankItem';
import '../styles/global.css';

export default {
    title: 'Profile/Atoms/RankItem',
    component: RankItem,
};

const Template = (args: React.ComponentProps<typeof RankItem>): JSX.Element => {
    return (
        <div style={{ padding: '3rem', backgroundColor: 'darkgrey' }}>
            <RankItem {...args} />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    name: 'Mr. Krockett',
    image: 'https://lh3.googleusercontent.com/gtRedQThacyBS3cJikU2QXkyhJL6vmmz8GlLQAEB5f8GsiXlqjRxWgRKAlbxyu1cBbwUoidpo3vxp64VH8tkUPW00eepbiV126wmLA=w600',
    subtitle: 'Ranked 10th',
    xp: 102000,
};
