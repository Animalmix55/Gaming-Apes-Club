import { useWeb3 } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useBalance } from '../api/hooks/useBalance';
import { useAuthorizationContext } from '../contexts/AuthorizationContext';
import { MoveGACXPOffchainButton } from '../molecules/MoveGACXPOffchainButton';
import { LocalBalanceWidget } from './BalanceWidgetLocal';

export const BalanceWidget = ({
    className,
}: {
    className?: string;
}): JSX.Element => {
    const { accounts } = useWeb3();
    const account = accounts?.[0];
    const { claims } = useAuthorizationContext();
    const discordId = claims?.id;
    const [css] = useStyletron();

    const { data: balance, isLoading } = useBalance(discordId);

    return (
        <LocalBalanceWidget
            className={className}
            isLoading={isLoading}
            balance={balance}
            additionalContent={
                <>
                    {discordId && account && (
                        <MoveGACXPOffchainButton
                            className={css({ marginLeft: '5px' })}
                        />
                    )}
                </>
            }
        />
    );
};

export default BalanceWidget;
