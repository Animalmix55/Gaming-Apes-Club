import { Spinner, SpinnerSize } from '@fluentui/react';
import {
    Button,
    ButtonType,
    MOBILE,
    useConfirmationContext,
    useThemeContext,
    useWeb3,
} from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { StakedApeTile } from '../atoms/StakedTokenTile';
import { useAppConfiguration } from '../contexts/AppConfigurationContext';
import { useStakingContext } from '../contexts/StakingContext';
import { useTokensStaked } from '../web3/hooks/useTokensStaked';
import { useUnstaker } from '../web3/hooks/useUnstaker';
import { UnstakingModal } from './UnstakingModal';

export const StakedApesTableInner = (): JSX.Element => {
    const { EthereumChainId } = useAppConfiguration();
    const { accounts } = useWeb3(EthereumChainId);

    const { tokenIdsToUnstake, setTokenIdsToUnstake } = useStakingContext();
    const stakedTokens = useTokensStaked(accounts?.[0]);
    const unstakeMutator = useUnstaker();
    const { txHash } = unstakeMutator;
    const [modalOpen, setModalOpen] = React.useState(false);

    React.useEffect(() => {
        if (txHash) setModalOpen(true);
    }, [txHash]);

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
        [MOBILE]: {
            flexWrap: 'nowrap',
            overflow: 'auto',
        },
    });

    const confirm = useConfirmationContext();

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
                    <React.Fragment key={token}>
                        {modalOpen && txHash && (
                            <UnstakingModal
                                transactionHash={txHash}
                                isOpen
                                onClose={(): void => setModalOpen(false)}
                            />
                        )}
                        <StakedApeTile
                            tokenId={token}
                            key={token}
                            selected={selected}
                            onUnstake={(): Promise<void> =>
                                confirm(
                                    'Are you sure?',
                                    'Unstaking will retrieve your token and claim any pending rewards, resetting your daily timer.'
                                ).then((r) => {
                                    if (r) unstakeMutator.mutate([[token]]);
                                })
                            }
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
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export const StakedApesTable = (): JSX.Element | null => {
    const [css] = useStyletron();
    const theme = useThemeContext();
    const { EthereumChainId } = useAppConfiguration();
    const { accounts } = useWeb3(EthereumChainId);
    const stakedTokens = useTokensStaked(accounts?.[0]);
    const { tokenIdsToUnstake, setTokenIdsToUnstake } = useStakingContext();

    const allSelected = tokenIdsToUnstake.length === stakedTokens.data?.length;

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
                    Staked Apes
                </div>
                {stakedTokens.data && stakedTokens.data.length !== 0 && (
                    <div
                        className={css({
                            marginLeft: 'auto',
                            [MOBILE]: {
                                marginRight: '24px',
                            },
                        })}
                    >
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
