import { ClassNameBuilder } from '@gac/shared';
import { Button, Icons } from '@gac/shared-v2';
import { BigNumber } from 'ethers';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useGACXPMigrator } from '../api/hooks/useGACXPMigrator';

export const MoveGACXPOffchainButton = ({
    className,
}: {
    className?: string;
}): JSX.Element => {
    const mutator = useGACXPMigrator();
    const [css] = useStyletron();

    return (
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
            onClick={(): void =>
                mutator.mutate([BigNumber.from('10000000000000000')])
            }
        />
    );
};

export default MoveGACXPOffchainButton;
