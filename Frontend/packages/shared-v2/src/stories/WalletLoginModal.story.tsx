import React from 'react';
import { Modal } from '../atoms/Modal';
import { WalletLoginModal } from '../molecules/WalletLoginModal';

export default {
    title: 'Shared/v2/Atoms/WalletLoginModal',
    component: Modal,
};

export const StandAlone = (): JSX.Element => {
    const [open, setOpen] = React.useState(true);

    return (
        <WalletLoginModal isOpen={open} onClose={(): void => setOpen(false)} />
    );
};
