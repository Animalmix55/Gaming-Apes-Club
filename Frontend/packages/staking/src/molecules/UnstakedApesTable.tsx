import { Spinner, SpinnerSize } from '@fluentui/react';
import { Button, ButtonType, useThemeContext, useWeb3 } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { UnstakedApeTile } from '../atoms/UnstakedTokenTile';
import { useAppConfiguration } from '../contexts/AppConfigurationContext';
import { useStakingContext } from '../contexts/StakingContext';
import { useTokensHeld } from '../web3/hooks/useTokensHeld';

export const UnstakedApesTableInner = (): JSX.Element => {
    const { GamingApeClubAddress, EthereumChainId } = useAppConfiguration();
    const { accounts, web3 } = useWeb3(EthereumChainId);

    const { setTokenIdsToStake, tokenIdsToStake } = useStakingContext();
    const UnstakedTokens = useTokensHeld(
        web3,
        accounts?.[0],
        GamingApeClubAddress
    );

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

    if (!UnstakedTokens.data || UnstakedTokens.isLoading)
        return (
            <div className={containerClass}>
                <Spinner size={SpinnerSize.medium} />
            </div>
        );

    if (UnstakedTokens.isError) {
        return (
            <div className={containerClass}>
                <div>Error loading unstaked tokens</div>
            </div>
        );
    }

    return (
        <div className={containerClass}>
            {UnstakedTokens.data.map((token) => {
                const selected = tokenIdsToStake.includes(token);
                return (
                    <UnstakedApeTile
                        tokenId={token}
                        key={token}
                        selected={selected}
                        onSelect={(): void =>
                            setTokenIdsToStake((t) =>
                                selected
                                    ? t.filter((id) => id !== token)
                                    : [...t, token]
                            )
                        }
                        className={css({
                            flexShrink: 0,
                            margin: '12px',
                            alignSelf: 'stretch',
                        })}
                    />
                );
            })}
        </div>
    );
};

export const UnstakedApesTable = (): JSX.Element | null => {
    const [css] = useStyletron();
    const theme = useThemeContext();
    const { GamingApeClubAddress, EthereumChainId } = useAppConfiguration();
    const { accounts, web3 } = useWeb3(EthereumChainId);

    const { setTokenIdsToStake, tokenIdsToStake } = useStakingContext();
    const UnstakedTokens = useTokensHeld(
        web3,
        accounts?.[0],
        GamingApeClubAddress
    );

    const allSelected = tokenIdsToStake.length === UnstakedTokens.data?.length;
    if (!accounts?.length) return null;

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
                    Unstaked Apes
                </div>
                {UnstakedTokens.data && UnstakedTokens.data.length !== 0 && (
                    <div className={css({ marginLeft: 'auto' })}>
                        <Button
                            onClick={(): void =>
                                allSelected
                                    ? setTokenIdsToStake([])
                                    : setTokenIdsToStake(
                                          UnstakedTokens.data ?? []
                                      )
                            }
                            text={allSelected ? 'Deselect all' : 'Select all'}
                            themeType={ButtonType.secondary}
                        />
                    </div>
                )}
            </div>
            <UnstakedApesTableInner />
        </div>
    );
};

export default UnstakedApesTable;
