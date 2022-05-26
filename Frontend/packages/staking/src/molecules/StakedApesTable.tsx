import { Spinner, SpinnerSize } from '@fluentui/react';
import { useThemeContext, useWeb3 } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { StakedApeTile } from '../atoms/StakedTokenTile';
import { useTokensStaked } from '../web3/hooks/useTokensStaked';

export const StakedApesTableInner = (): JSX.Element => {
    const { accounts } = useWeb3();

    const stakedTokens = useTokensStaked(accounts?.[0]);

    const [css] = useStyletron();
    const theme = useThemeContext();

    const containerClass = css({
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'center',
        fontFamily: theme.font,
        color: theme.foregroundPallette.white.toRgbaString(),
    });

    if (!stakedTokens.data || stakedTokens.isLoading)
        return (
            <div className={containerClass}>
                <Spinner size={SpinnerSize.medium} />
            </div>
        );

    if (stakedTokens.isError) {
        return (
            <div className={containerClass}>
                <div>Error loading staked tokens</div>
            </div>
        );
    }

    return (
        <div className={containerClass}>
            {stakedTokens.data.map((token, i) => (
                <StakedApeTile
                    tokenId={token}
                    key={token}
                    className={css({
                        flexShrink: 0,
                        marginRight:
                            i !== stakedTokens.data.length - 1
                                ? '24px'
                                : undefined,
                    })}
                />
            ))}
        </div>
    );
};

export const StakedApesTable = (): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div>
            <div
                className={css({
                    fontFamily: theme.font,
                    fontWeight: 900,
                    fontSize: '20px',
                    fontStyle: 'italic',
                    textTransform: 'uppercase',
                    marginBottom: '30px',
                    color: theme.foregroundPallette.white.toRgbaString(),
                })}
            >
                My Staked Apes
            </div>
            <StakedApesTableInner />
        </div>
    );
};

export default StakedApesTable;
