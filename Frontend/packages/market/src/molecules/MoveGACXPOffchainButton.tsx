import { Button, Icons, ClassNameBuilder } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { MigrateGACXPModal } from './MigrateGACXPModal';

export const MoveGACXPOffchainButton = ({
    className,
}: {
    className?: string;
}): JSX.Element => {
    const [css] = useStyletron();

    const [modalOpen, setModalOpen] = React.useState(false);

    return (
        <>
            <MigrateGACXPModal
                onClose={(): void => setModalOpen(false)}
                isOpen={modalOpen}
            />
            <Button
                icon={Icons.Polygon}
                className={ClassNameBuilder(
                    className,
                    css({ padding: 'unset !important' })
                )}
                iconClass={css({
                    height: '35px !important',
                    width: '35px !important',
                })}
                onClick={(): void => setModalOpen(true)}
            />
        </>
    );
};

export default MoveGACXPOffchainButton;
