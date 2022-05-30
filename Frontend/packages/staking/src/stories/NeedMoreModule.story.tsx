/* eslint-disable no-void */
import React from 'react';
import { useStyletron } from 'styletron-react';
import { NeedMoreModule } from '../atoms/NeedMoreModule';

export default {
    title: 'Staking/Atoms/NeedMoreModule',
    component: NeedMoreModule,
};

export const StandAlone = (): JSX.Element => {
    const [css] = useStyletron();
    return (
        <NeedMoreModule
            onClickOpenSea={(): void => void 0}
            className={css({ width: '1128px !important', maxWidth: '100%' })}
        />
    );
};
