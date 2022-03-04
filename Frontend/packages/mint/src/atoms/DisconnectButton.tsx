import React from 'react';
import { useStyletron } from 'styletron-react';
import { GlowButton, useProvider } from '@gac/shared';

export const DisconnectButton = ({
    className,
}: {
    className?: string;
}): JSX.Element => {
    const { disconnect, accounts } = useProvider();
    const [css] = useStyletron();

    if (!disconnect || !accounts) return <></>;

    return (
        <GlowButton
            className={className}
            innerclass={css({ padding: '5px' })}
            onClick={disconnect}
        >
            Disconnect
        </GlowButton>
    );
};

export default DisconnectButton;
