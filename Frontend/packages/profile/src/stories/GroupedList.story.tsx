/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import GroupedList from '../atoms/GroupedList';
import '../styles/global.css';

export default {
    title: 'Profile/Atoms/GroupedList',
    component: GroupedList,
};

const DAYS = 86400000;

const items = [
    { text: '1', key: '1', createdAt: Date.now() },
    { text: '2', key: '2', createdAt: Date.now() - 200 },
    { text: '3', key: '3', createdAt: Date.now() - 400 },
    { text: '4', key: '4', createdAt: Date.now() - DAYS },
    { text: '5', key: '5', createdAt: Date.now() - DAYS * 2 },
    { text: '6', key: '6', createdAt: Date.now() - DAYS * 2 },
];

export const List = (): JSX.Element => {
    return (
        <div style={{ padding: '3rem', backgroundColor: 'darkgrey' }}>
            <GroupedList
                items={items}
                render={(i): React.ReactElement => <p>{i.text}</p>}
            />
        </div>
    );
};
