import { BigNumber } from '@ethersproject/bignumber';
import {
    Button,
    ButtonType,
    ClassNameBuilder,
    Icons,
    MOBILE,
    useConfirmationContext,
    useThemeContext,
    useWeb3,
} from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useAppConfiguration } from '../contexts/AppConfigurationContext';
import { useStakingContext } from '../contexts/StakingContext';
import { useRewardByAmount } from '../hooks/useRewardByAmount';
import { StakingModal } from '../molecules/StakingModal';
import { TiersModal } from '../molecules/TiersModal';
import { UnstakingModal } from '../molecules/UnstakingModal';
import { useStaker } from '../web3/hooks/useStaker';
import { useTokensHeld } from '../web3/hooks/useTokensHeld';
import { useTokensStaked } from '../web3/hooks/useTokensStaked';
import { useUnstaker } from '../web3/hooks/useUnstaker';
import { BlockchainReward } from '../web3/Requests';
import { ApprovalButton } from './ApprovalButton';
import { Divider, Fraction, TokenDisplay } from './DataBadge';

export interface BasketProps {
    className?: string;
}

export const NumberDisplay = ({
    number,
    className,
}: {
    number: number;
    className?: string;
}): JSX.Element => {
    const theme = useThemeContext();
    const [css] = useStyletron();

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    color: theme.foregroundPallette.white.toRgbaString(),
                    backgroundColor:
                        theme.foregroundPallette.primary.toRgbaString(),
                    fontWeight: 900,
                    fontStyle: 'italic',
                    fontSize: '20px',
                    height: '48px',
                    width: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                })
            )}
        >
            {number}
        </div>
    );
};

const PlaceholderTier: BlockchainReward = {
    amount: 0,
    reward: BigNumber.from(0),
};

export const TierDisplay = ({
    tier,
    index,
    amount,
    className,
}: {
    tier?: BlockchainReward;
    index?: number;
    amount: number;
    className?: string;
}): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    const fractionClass = css({
        fontFamily: theme.font,
        fontWeight: 700,
        fontSize: '10px',
        color: `${theme.foregroundPallette.white.toRgbaString(0.6)} !important`,
    });

    const resolvedTier = tier ?? PlaceholderTier;

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '5px 16px',
                    borderRadius: '8px',
                    backgroundColor:
                        amount >= resolvedTier.amount
                            ? theme.backgroundPallette.darker.toRgbaString()
                            : theme.backgroundPallette.dark.toRgbaString(0.4),
                })
            )}
        >
            <div
                className={css({
                    textTransform: 'uppercase',
                    fontSize: '10px',
                    fontWeight: 700,
                })}
            >
                Tier {!tier || index === undefined ? 0 : index + 1}
            </div>
            <div>
                {amount < resolvedTier.amount && (
                    <Fraction
                        left={amount}
                        leftClassName={css({
                            color: theme.foregroundPallette.accent.toRgbaString(),
                            fontWeight: 900,
                        })}
                        right={resolvedTier.amount}
                        slashClassName={fractionClass}
                        rightClassName={fractionClass}
                    />
                )}
                {amount >= resolvedTier.amount && (
                    <div>
                        <img
                            src={Icons.CheckmarkGold}
                            alt="Checkmark"
                            className={css({ height: '10px' })}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export const Basket = (props: BasketProps): JSX.Element | null => {
    const { className } = props;

    const { GamingApeClubAddress, GACStakingContractAddress, EthereumChainId } =
        useAppConfiguration();
    const {
        setTokenIdsToUnstake,
        setTokenIdsToStake,
        tokenIdsToStake,
        tokenIdsToUnstake,
    } = useStakingContext();
    const { accounts, provider } = useWeb3(EthereumChainId);
    const account = accounts?.[0];

    const { data: stakedApes } = useTokensStaked(account);
    const { data: unstakedApes } = useTokensHeld(
        provider,
        account,
        GamingApeClubAddress
    );

    const newAmountStaked =
        (stakedApes?.length ?? 0) +
        tokenIdsToStake.length -
        tokenIdsToUnstake.length;

    const { tiers, currentTierIndex, currentTier, reward } =
        useRewardByAmount(newAmountStaked);

    const nextTier = tiers.data
        ? tiers.data[(currentTierIndex ?? -1) + 1]
        : undefined;

    React.useEffect(() => {
        setTokenIdsToStake((t) =>
            t.filter((item) => unstakedApes?.includes(item))
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unstakedApes]);

    React.useEffect(() => {
        setTokenIdsToUnstake((t) =>
            t.filter((item) => stakedApes?.includes(item))
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stakedApes]);

    const staker = useStaker();
    const { txHash: stakingHash } = staker;

    const unstaker = useUnstaker();
    const { txHash: unstakingHash } = unstaker;

    const [showTxModal, setShowTxModal] = React.useState(false);
    const [showTier, setShowTierModal] = React.useState(false);
    const txHash = React.useMemo((): string | undefined => {
        if (tokenIdsToStake.length) return staker.txHash;
        if (tokenIdsToUnstake.length) return unstaker.txHash;

        return undefined;
    }, [
        staker.txHash,
        tokenIdsToStake.length,
        tokenIdsToUnstake.length,
        unstaker.txHash,
    ]);

    React.useEffect(() => {
        if (stakingHash || unstakingHash) {
            setShowTxModal(true);
        }
    }, [stakingHash, unstakingHash]);

    const [css] = useStyletron();
    const theme = useThemeContext();
    const bodyClass = ClassNameBuilder(
        className,
        css({
            borderRadius: '12px',
            backgroundColor: theme.backgroundPallette.light.toRgbaString(),
            color: theme.foregroundPallette.white.toRgbaString(),
            fontFamily: theme.font,
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            [MOBILE]: {
                flexWrap: 'wrap',
            },
        })
    );

    const confirm = useConfirmationContext();

    let allSelected =
        unstakedApes && unstakedApes.length === tokenIdsToStake.length;

    const tierDisplay = (
        <div
            className={css({
                display: 'flex',
                alignItems: 'center',
                [MOBILE]: {
                    display: 'none',
                },
            })}
        >
            <TierDisplay
                tier={currentTier}
                index={currentTierIndex}
                amount={newAmountStaked}
                className={css({ alignSelf: 'stretch' })}
            />
            {nextTier && (
                <>
                    <img
                        src={Icons.ChevronRight}
                        alt="Chevron Right"
                        className={css({ margin: '0px 15px' })}
                    />
                    <TierDisplay
                        tier={nextTier}
                        index={(currentTierIndex ?? -1) + 1}
                        amount={newAmountStaked}
                        className={css({ alignSelf: 'stretch' })}
                    />
                </>
            )}
        </div>
    );

    if (tokenIdsToStake.length > 0) {
        return (
            <div className={bodyClass}>
                {showTxModal && txHash && (
                    <StakingModal
                        isOpen
                        transactionHash={txHash}
                        onClose={(): void => {
                            setTokenIdsToStake([]);
                            setShowTxModal(false);
                        }}
                    />
                )}
                <TiersModal
                    isOpen={showTier}
                    onClose={(): void => setShowTierModal(false)}
                />
                <div
                    className={css({
                        display: 'flex',
                        [MOBILE]: {
                            flexBasis: '100%',
                        },
                    })}
                >
                    <NumberDisplay number={tokenIdsToStake.length} />
                    <div className={css({ margin: '0px 8px 0px 16px' })}>
                        <div
                            className={css({
                                fontFamily: theme.font,
                                fontWeight: 900,
                                color: theme.foregroundPallette.white.toRgbaString(),
                                fontStyle: 'italic',
                                fontSize: '20px',
                                textTransform: 'uppercase',
                            })}
                        >
                            Apes Selected
                        </div>
                        <div
                            className={css({
                                fontFamily: theme.font,
                                fontWeight: 600,
                                color: theme.foregroundPallette.white.toRgbaString(
                                    0.5
                                ),
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                            })}
                        >
                            You will yield{' '}
                            <Fraction
                                className={css({
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: '5px',
                                })}
                                left={<TokenDisplay amount={reward} />}
                                right="day"
                            />
                            <Button
                                icon={Icons.Info}
                                className={css({
                                    padding: 'unset !important',
                                    height: 'unset !important',
                                    marginLeft: '5px',
                                })}
                                onClick={(): void => setShowTierModal(true)}
                            />
                        </div>
                    </div>
                </div>
                <Divider
                    className={css({
                        height: '48px !important',
                        margin: '0px 20px',
                        [MOBILE]: {
                            display: 'none',
                        },
                    })}
                />
                {tierDisplay}
                <div
                    className={css({
                        display: 'flex',
                        marginLeft: 'auto',
                        [MOBILE]: {
                            flexBasis: '100%',
                            marginTop: '16px',
                            justifyContent: 'center',
                            marginLeft: 'unset',
                        },
                    })}
                >
                    <Button
                        text={allSelected ? 'Deselect all' : 'Select all'}
                        themeType={ButtonType.secondary}
                        className={css({
                            marginLeft: 'auto',
                            marginRight: '10px',
                            [MOBILE]: {
                                marginLeft: 'unset',
                            },
                        })}
                        disabled={!unstakedApes}
                        onClick={
                            unstakedApes && !allSelected
                                ? (): void => setTokenIdsToStake(unstakedApes)
                                : (): void => setTokenIdsToStake([])
                        }
                    />
                    <ApprovalButton
                        tokenAddress={GamingApeClubAddress}
                        operator={GACStakingContractAddress}
                        owner={account}
                        themeType={ButtonType.primary}
                        whenApproved={
                            <Button
                                text="Stake Apes"
                                themeType={ButtonType.error}
                                onClick={(): Promise<void> =>
                                    confirm(
                                        'Are you sure?',
                                        'Staking will claim any pending rewards, resetting your daily timer.'
                                    ).then((r) => {
                                        if (r) staker.mutate([tokenIdsToStake]);
                                    })
                                }
                            />
                        }
                    />
                </div>
            </div>
        );
    }

    allSelected = stakedApes && stakedApes.length === tokenIdsToUnstake.length;

    if (tokenIdsToUnstake.length > 0) {
        return (
            <div className={bodyClass}>
                {showTxModal && txHash && (
                    <UnstakingModal
                        transactionHash={txHash}
                        isOpen
                        onClose={(): void => {
                            setTokenIdsToUnstake([]);
                            setShowTxModal(false);
                        }}
                    />
                )}
                <TiersModal
                    isOpen={showTier}
                    onClose={(): void => setShowTierModal(false)}
                />
                <div
                    className={css({
                        display: 'flex',
                        [MOBILE]: {
                            flexBasis: '100%',
                        },
                    })}
                >
                    <NumberDisplay number={tokenIdsToUnstake.length} />
                    <div className={css({ margin: '0px 8px 0px 16px' })}>
                        <div
                            className={css({
                                fontFamily: theme.font,
                                fontWeight: 900,
                                color: theme.foregroundPallette.white.toRgbaString(),
                                fontStyle: 'italic',
                                fontSize: '20px',
                                textTransform: 'uppercase',
                            })}
                        >
                            Apes Selected
                        </div>
                        <div
                            className={css({
                                fontFamily: theme.font,
                                fontWeight: 600,
                                color: theme.foregroundPallette.white.toRgbaString(
                                    0.5
                                ),
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                            })}
                        >
                            You will yield{' '}
                            <Fraction
                                className={css({
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: '5px',
                                })}
                                left={<TokenDisplay amount={reward} />}
                                right="day"
                            />
                            <Button
                                icon={Icons.Info}
                                className={css({
                                    padding: 'unset !important',
                                    height: 'unset !important',
                                    marginLeft: '5px',
                                })}
                                onClick={(): void => setShowTierModal(true)}
                            />
                        </div>
                    </div>
                </div>
                <Divider
                    className={css({
                        height: '48px !important',
                        margin: '0px 20px',
                        [MOBILE]: {
                            display: 'none',
                        },
                    })}
                />
                {tierDisplay}
                <div
                    className={css({
                        marginLeft: 'auto',
                        display: 'flex',
                        [MOBILE]: {
                            flexBasis: '100%',
                            marginTop: '16px',
                            marginLeft: 'unset',
                            justifyContent: 'center',
                        },
                    })}
                >
                    <Button
                        text={allSelected ? 'Deselect all' : 'Select all'}
                        themeType={ButtonType.secondary}
                        className={css({
                            marginLeft: 'auto',
                            marginRight: '10px',
                            [MOBILE]: {
                                marginLeft: 'unset',
                            },
                        })}
                        disabled={!stakedApes}
                        onClick={
                            stakedApes && !allSelected
                                ? (): void => setTokenIdsToUnstake(stakedApes)
                                : (): void => setTokenIdsToUnstake([])
                        }
                    />
                    <ApprovalButton
                        tokenAddress={GamingApeClubAddress}
                        operator={GACStakingContractAddress}
                        owner={account}
                        themeType={ButtonType.primary}
                        whenApproved={
                            <Button
                                text="Unstake Apes"
                                themeType={ButtonType.error}
                                onClick={(): Promise<void> =>
                                    confirm(
                                        'Are you sure?',
                                        'Unstaking will claim any pending rewards, resetting your daily timer.'
                                    ).then((r) => {
                                        if (r)
                                            unstaker.mutate([
                                                tokenIdsToUnstake,
                                            ]);
                                    })
                                }
                            />
                        }
                    />
                </div>
            </div>
        );
    }

    return null;
};

export default Basket;
