import React from 'react';
import { Modal } from '../atoms/Modal';

export default {
    title: 'Shared/v2/Atoms/Modal',
    component: Modal,
};

export const StandAlone = (): JSX.Element => {
    const [open, setOpen] = React.useState(true);
    return (
        <Modal isOpen={open} onClose={(): void => setOpen(false)}>
            <div>Test Contents</div>
        </Modal>
    );
};
