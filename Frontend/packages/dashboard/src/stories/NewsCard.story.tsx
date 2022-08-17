/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import NewsCard from '../atoms/NewsCard';
import data from '../assets/news';
import '../styles/global.css';

export default {
    title: 'Dashboard/Atoms/NewsCard',
    component: NewsCard,
};

const Template = (args: React.ComponentProps<typeof NewsCard>): JSX.Element => {
    return (
        <div style={{ padding: '3rem', backgroundColor: 'black' }}>
            <NewsCard {...args} />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = { ...data.latestNews[0] };
