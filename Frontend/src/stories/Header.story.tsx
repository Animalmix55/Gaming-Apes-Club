import React from 'react';
import Header from '../molecules/Header';

export default {
    title: 'Molecules/Header',
    component: Header,
    decorators: [
        (Story: () => JSX.Element): JSX.Element => (
            <div
                style={{
                    backgroundColor: 'black',
                    height: '75vh',
                    overflow: 'hidden',
                }}
            >
                {Story()}
            </div>
        ),
    ],
};

export const StandAlone = (): JSX.Element => <Header />;
