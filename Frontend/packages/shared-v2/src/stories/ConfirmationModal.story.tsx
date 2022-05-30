import React from 'react';
import { ConfirmationModal } from '../molecules/ConfirmationModal';

export default {
    title: 'Shared/v2/Molecules/ConfirmationModal',
    component: ConfirmationModal,
};

export const StandAlone = (): JSX.Element => {
    return (
        <ConfirmationModal
            isOpen
            title="Are You Sure?"
            body="Doing so will do bad things."
            confirmButtonText="Yes"
            rejectButtonText="No"
        />
    );
};
