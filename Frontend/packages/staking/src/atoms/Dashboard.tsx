import {
    Button,
    ButtonType,
    ClassNameBuilder,
    Icons,
    MOBILE,
    useCurrentTime,
    useThemeContext,
    useWeb3,
    WalletLoginModal,
} from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useAppConfiguration } from '../contexts/AppConfigurationContext';
import { useClaimer } from '../web3/hooks/useClaimer';
import { useCurrentReward } from '../web3/hooks/useCurrentReward';
import { useERC20Balance } from '../web3/hooks/useERC20Balance';
import { useERC20Supply } from '../web3/hooks/useERC20Supply';
import { useNFTBalance } from '../web3/hooks/useNFTBalance';
import { useStakeLastUpdatedTime } from '../web3/hooks/useStakeLastUpdatedTime';
import { useTokensStaked } from '../web3/hooks/useTokensStaked';
import {
    AccentTextStyles,
    DataBadge,
    Divider,
    Fraction,
    TokenDisplay,
} from './DataBadge';

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
    const { accounts, web3 } = useWeb3(EthereumChainId);
    const { web3: polygonWeb3 } = useWeb3(PolygonChainId);

    const account = accounts?.[0];
    const [loginModalOpen, setWalletModalOpen] = React.useState(false);

    const userStake = useTokensStaked(account);
    const userNFTBalance = useNFTBalance(web3, account, GamingApeClubAddress);
    const totalStaked = useNFTBalance(
        web3,
        GACStakingContractAddress,
        GamingApeClubAddress
    );
    const userRewardBalance = useERC20Balance(
        account,
        polygonWeb3,
        GACXPContractAddress
    );
    const lastRewardTime = useStakeLastUpdatedTime(account);
    const pendingReward = useCurrentReward(account);
    const rewardTokenSupply = useERC20Supply(polygonWeb3, GACXPContractAddress);
    const currentTime = useCurrentTime();

    const secondsUntilNextReward = React.useMemo(() => {
        if (lastRewardTime.isLoading) return 0;
        if (!lastRewardTime.data) return undefined;

        const secondsToCompleteData =
            86400 - ((currentTime - lastRewardTime.data) % 86400);

        return secondsToCompleteData;
    }, [currentTime, lastRewardTime.data, lastRewardTime.isLoading]);

    const [css] = useStyletron();
    const theme = useThemeContext();
    const bodyClass = ClassNameBuilder(
        className,
        css({
            borderRadius: '20px',
            backgroundColor: theme.backgroundPallette.light.toRgbaString(),
            color: theme.foregroundPallette.white.toRgbaString(),
            fontFamily: theme.font,
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            [MOBILE]: {
                flexWrap: 'wrap',
            },
        })
    );

    const claimer = useClaimer();

    if (!account) {
        return (
            <div className={bodyClass}>
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
                            right={6650}
                        />
                    }
                    className={css({ padding: '0 16px' })}
                />
                <Divider />
                <DataBadge
                    topText="Total Rewards"
                    isLoading={rewardTokenSupply.isLoading}
                    lowerElement={
                        <TokenDisplay amount={rewardTokenSupply.data} />
                    }
                    className={css({ padding: '0 16px' })}
                />
                <Button
                    icon={Icons.ETHWhite}
                    themeType={ButtonType.primary}
                    className={css({ marginLeft: '32px' })}
                    text="Connect Wallet"
                    onClick={(): void => setWalletModalOpen(true)}
                />
            </div>
        );
    }

    return (
        <div className={bodyClass}>
            <WalletLoginModal
                isOpen={loginModalOpen}
                onClose={(): void => setWalletModalOpen(false)}
            />
            <DataBadge
                topText="Staked Apes"
                isLoading={userNFTBalance.isLoading || userStake.isLoading}
                lowerElement={
                    <Fraction
                        className={css(AccentTextStyles(theme))}
                        left={userStake.data?.length ?? 0}
                        right={
                            (userNFTBalance.data ?? 0) +
                            (userStake.data?.length ?? 0)
                        }
                    />
                }
                className={css({
                    [MOBILE]: { flexBasis: '49%' },
                    padding: '0px 16px',
                })}
            />
            <Divider />
            <DataBadge
                topText="Reward Balance"
                isLoading={userRewardBalance.isLoading}
                lowerElement={<TokenDisplay amount={userRewardBalance.data} />}
                className={css({
                    [MOBILE]: { flexBasis: '49%' },
                    padding: '0px 16px',
                })}
            />
            <Divider
                className={css({
                    [MOBILE]: { display: 'none' },
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
            <Divider className={css({ marginTop: '24px' })} />
            <DataBadge
                topText="Claimable"
                isLoading={pendingReward.isLoading}
                lowerElement={<TokenDisplay amount={pendingReward.data} />}
                className={css({
                    [MOBILE]: { flexBasis: '49%' },
                    padding: '0px 16px',
                    marginTop: '24px',
                })}
            />
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
                disabled={!pendingReward.data || pendingReward.data.isZero()}
                onClick={(): void => claimer.mutate([])}
            />
        </div>
    );
};

export default Dashboard;
