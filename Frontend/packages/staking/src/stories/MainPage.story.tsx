import React from 'react';
import { useStyletron } from 'styletron-react';
import { MainPage } from '../pages/Main';

export default {
    title: 'Staking/MainPage',
    component: MainPage,
};

export const StandAlone = (): JSX.Element => {
    const [css] = useStyletron();
    return (
        <div className={css({ height: '90vh', width: '90vw' })}>
            <MainPage />
        </div>
    );
};
