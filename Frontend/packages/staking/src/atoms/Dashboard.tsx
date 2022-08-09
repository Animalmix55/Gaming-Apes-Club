import {
    Button,
    ButtonType,
    Icons,
    MOBILE,
    useConfirmationContext,
    useCurrentTime,
    useERC20Balance,
    useERC20Supply,
    useNFTBalance,
    useThemeContext,
    useWeb3,
    WalletLoginModal,
    AccentTextStyles,
    DataBadge,
    Fraction,
    TokenDisplay,
    DividedDashboard,
} from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useAppConfiguration } from '../contexts/AppConfigurationContext';
import { useRewardByAmount } from '../hooks/useRewardByAmount';
import { useClaimer } from '../web3/hooks/useClaimer';
import { useCurrentReward } from '../web3/hooks/useCurrentReward';
import { useStakeLastUpdatedTime } from '../web3/hooks/useStakeLastUpdatedTime';
import { useTokensStaked } from '../web3/hooks/useTokensStaked';

export interface DashboardProps {
    className?: string;
}

export const Dashboard = (props: DashboardProps): JSX.Element => {
    const { className } = props;
    const {
        GamingApeClubAddress,
        EthereumChainId,
        PolygonChainId,
        GACXPContractAddress,
        GACStakingContractAddress,
    } = useAppConfiguration();
    const { accounts, provider: ethProvider } = useWeb3(EthereumChainId);
    const { provider: polygonProvider } = useWeb3(PolygonChainId);

    const account = accounts?.[0];
    const [loginModalOpen, setWalletModalOpen] = React.useState(false);

    const userStake = useTokensStaked(account);
    const userNFTBalance = useNFTBalance(
        ethProvider,
        account,
        GamingApeClubAddress
    );
    const totalStaked = useNFTBalance(
        ethProvider,
        GACStakingContractAddress,
        GamingApeClubAddress
    );
    const userRewardBalance = useERC20Balance(
        account,
        polygonProvider,
        GACXPContractAddress
    );
    const lastRewardTime = useStakeLastUpdatedTime(account);
    const pendingReward = useCurrentReward(account);
    const rewardTokenSupply = useERC20Supply(
        polygonProvider,
        GACXPContractAddress
    );
    const currentTime = useCurrentTime();

    const secondsUntilNextReward = React.useMemo(() => {
        if (lastRewardTime.isLoading) return 0;
        if (!lastRewardTime.data) return undefined;

        const secondsToCompleteData =
            86400 - ((currentTime - lastRewardTime.data) % 86400);

        return secondsToCompleteData;
    }, [currentTime, lastRewardTime.data, lastRewardTime.isLoading]);

    const confirm = useConfirmationContext();

    const [css] = useStyletron();
    const theme = useThemeContext();

    const claimer = useClaimer();
    const { reward } = useRewardByAmount(userStake.data?.length);

    if (!account) {
        return (
            <DividedDashboard
                className={className}
                rightItem={
                    <Button
                        icon={Icons.ETHWhite}
                        themeType={ButtonType.primary}
                        className={css({
                            [MOBILE]: {
                                flex: '1',
                                textAlign: 'center',
                                marginLeft: 'unset',
                                marginTop: '24px',
                                display: 'flex',
                                justifyContent: 'center',
                            },
                        })}
                        text="Connect Wallet"
                        onClick={(): void => setWalletModalOpen(true)}
                    />
                }
            >
                <>
                    <WalletLoginModal
                        isOpen={loginModalOpen}
                        onClose={(): void => setWalletModalOpen(false)}
                    />
                    <DataBadge
                        topText="Total Apes Staked"
                        isLoading={totalStaked.isLoading}
                        lowerElement={
                            <Fraction
                                className={css(AccentTextStyles(theme))}
                                left={totalStaked.data ?? 0}
                                right={6550}
                            />
                        }
                        className={css({ padding: '0 16px' })}
                    />
                </>
                <DataBadge
                    topText="Total Rewards"
                    isLoading={rewardTokenSupply.isLoading}
                    lowerElement={
                        <TokenDisplay amount={rewardTokenSupply.data} />
                    }
                    className={css({ padding: '0 16px' })}
                />
            </DividedDashboard>
        );
    }

    const fractionClass = css({
        fontFamily: theme.font,
        fontWeight: 700,
        fontSize: '10px',
        color: `${theme.foregroundPallette.white.toRgbaString(0.6)} !important`,
    });

    return (
        <DividedDashboard
            className={className}
            rightItem={
                <Button
                    themeType={ButtonType.primary}
                    className={css({
                        marginLeft: '32px',
                        [MOBILE]: {
                            flex: '1',
                            textAlign: 'center',
                            marginLeft: 'unset',
                            marginTop: '24px',
                            display: 'flex',
                            justifyContent: 'center',
                        },
                    })}
                    text="Claim Reward"
                    disabled={
                        !pendingReward.data || pendingReward.data.isZero()
                    }
                    onClick={(): Promise<void> =>
                        confirm(
                            'Are you sure?',
                            'Claiming will claim any pending rewards, resetting your daily timer.'
                        ).then((r) => {
                            if (r) claimer.mutate([]);
                        })
                    }
                />
            }
        >
            <>
                <WalletLoginModal
                    isOpen={loginModalOpen}
                    onClose={(): void => setWalletModalOpen(false)}
                />
                <DataBadge
                    topText="Yield Rate"
                    isLoading={userNFTBalance.isLoading || userStake.isLoading}
                    lowerElement={
                        <Fraction
                            className={css({
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            })}
                            rightClassName={fractionClass}
                            slashClassName={fractionClass}
                            left={<TokenDisplay amount={reward} />}
                            right="day"
                        />
                    }
                    className={css({
                        [MOBILE]: { flexBasis: '49%' },
                        padding: '0px 16px',
                    })}
                />
            </>
            <DataBadge
                topText="Reward Balance"
                isLoading={userRewardBalance.isLoading}
                lowerElement={<TokenDisplay amount={userRewardBalance.data} />}
                className={css({
                    [MOBILE]: { flexBasis: '49%' },
                    padding: '0px 16px',
                })}
            />
            <DataBadge
                topText="Next rewards in"
                isLoading={lastRewardTime.isLoading}
                lowerElement={
                    secondsUntilNextReward !== undefined ? (
                        <div className={css({ textAlign: 'center' })}>
                            <span className={css(AccentTextStyles(theme))}>
                                {Math.floor(secondsUntilNextReward / 3600)}
                            </span>
                            <span
                                className={css({
                                    fontSize: '10px',
                                    color: theme.foregroundPallette.white.toRgbaString(
                                        0.6
                                    ),
                                    margin: '0px 8px 0px 4px',
                                })}
                            >
                                hrs
                            </span>
                            <span className={css(AccentTextStyles(theme))}>
                                {Math.floor(
                                    (secondsUntilNextReward % 3600) / 60
                                )}
                            </span>
                            <span
                                className={css({
                                    fontSize: '10px',
                                    color: theme.foregroundPallette.white.toRgbaString(
                                        0.6
                                    ),
                                    margin: '0px 0px 0px 4px',
                                })}
                            >
                                mins
                            </span>
                        </div>
                    ) : (
                        <div className={css(AccentTextStyles(theme))}>N/A</div>
                    )
                }
                className={css({
                    [MOBILE]: { flexBasis: '49%', marginTop: '24px' },
                    padding: '0px 16px',
                })}
            />
            <DataBadge
                topText="Claimable"
                isLoading={pendingReward.isLoading}
                lowerElement={<TokenDisplay amount={pendingReward.data} />}
                className={css({
                    [MOBILE]: { flexBasis: '49%', marginTop: '24px' },
                    padding: '0px 16px',
                })}
            />
        </DividedDashboard>
    );
};

export default Dashboard;
