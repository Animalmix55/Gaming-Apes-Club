import { Spinner, SpinnerSize } from '@fluentui/react';
import { Button, ButtonType, useThemeContext, useWeb3 } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { StakedApeTile } from '../atoms/StakedTokenTile';
import { useStakingContext } from '../contexts/StakingContext';
import { useTokensStaked } from '../web3/hooks/useTokensStaked';

export const StakedApesTableInner = (): JSX.Element => {
    const { accounts } = useWeb3();

    const { tokenIdsToUnstake, setTokenIdsToUnstake } = useStakingContext();
    const stakedTokens = useTokensStaked(accounts?.[0]);

    const [css] = useStyletron();
    const theme = useThemeContext();

    const containerClass = css({
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'center',
        fontFamily: theme.font,
        transform: 'translateX(-12px)',
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
            {stakedTokens.data.map((token) => {
                const selected = tokenIdsToUnstake.includes(token);
                return (
                    <StakedApeTile
                        tokenId={token}
                        key={token}
                        selected={selected}
                        onSelect={(): void =>
                            setTokenIdsToUnstake((t) =>
                                selected
                                    ? t.filter((id) => id !== token)
                                    : [...t, token]
                            )
                        }
                        className={css({
                            flexShrink: 0,
                            margin: '12px',
                        })}
                    />
                );
            })}
        </div>
    );
};

export const StakedApesTable = (): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();
    const { accounts } = useWeb3();
    const stakedTokens = useTokensStaked(accounts?.[0]);
    const { tokenIdsToUnstake, setTokenIdsToUnstake } = useStakingContext();

    const allSelected = tokenIdsToUnstake.length === stakedTokens.data?.length;

    return (
        <div className={css({ width: '100%' })}>
            <div
                className={css({
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    marginBottom: '30px',
                    width: '100%',
                })}
            >
                <div
                    className={css({
                        fontFamily: theme.font,
                        fontWeight: 900,
                        fontSize: '20px',
                        fontStyle: 'italic',
                        textTransform: 'uppercase',
                        color: theme.foregroundPallette.white.toRgbaString(),
                    })}
                >
                    My Staked Apes
                </div>
                {stakedTokens.data && stakedTokens.data.length !== 0 && (
                    <div className={css({ marginLeft: 'auto' })}>
                        <Button
                            onClick={(): void =>
                                allSelected
                                    ? setTokenIdsToUnstake([])
                                    : setTokenIdsToUnstake(
                                          stakedTokens.data ?? []
                                      )
                            }
                            text={allSelected ? 'Deselect all' : 'Select all'}
                            themeType={ButtonType.secondary}
                        />
                    </div>
                )}
            </div>
            <StakedApesTableInner />
        </div>
    );
};

export default StakedApesTable;