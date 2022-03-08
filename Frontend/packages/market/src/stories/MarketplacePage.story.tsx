import React from 'react';
import { MarketplacePage } from '../organisms/MarketplacePage';

export default {
    title: 'Market/Organisms/MarketplacePage',
    component: MarketplacePage,
};

export const StandAlone = (): JSX.Element => {
    return <MarketplacePage />;
};
