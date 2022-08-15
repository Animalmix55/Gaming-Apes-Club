import React from 'react';
import { HistoryModal } from '../molecules/HistoryModal';

export default {
    title: 'Market/Molecules/HistoryModal',
    component: HistoryModal,
};

export const StandAlone = (): JSX.Element => {
    return <HistoryModal isOpen />;
};
