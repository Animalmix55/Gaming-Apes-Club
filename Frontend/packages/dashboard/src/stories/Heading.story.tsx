/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Heading from '../atoms/Heading';
import '../styles/global.css';

export default {
    title: 'Dashboard/Atoms/Heading',
    component: Heading,
};

const Template = (args: React.ComponentProps<typeof Heading>): JSX.Element => {
    return (
        <div style={{ padding: '3rem', backgroundColor: 'black' }}>
            <Heading {...args} />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    highlightedTitle: 'Meet the',
    title: 'founding team',
};
