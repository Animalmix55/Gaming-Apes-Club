/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Header from '../atoms/Header';

export default {
    title: 'Shared/v2/Atoms/Header',
    component: Header,
};

const Template = (args: React.ComponentProps<typeof Header>): JSX.Element => {
    return (
        <div style={{ padding: '3rem', backgroundColor: 'black' }}>
            <Header {...args} />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    title: 'Meet the',
    subtitle: 'founding team',
};
