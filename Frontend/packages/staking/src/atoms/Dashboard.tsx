import { BigNumber } from '@ethersproject/bignumber';
import { Spinner, SpinnerSize } from '@fluentui/react';
import {
    Button,
    ButtonType,
    ClassNameBuilder,
    Icons,
    ThemeContextType,
    useCurrentTime,
    useCustomRpcProvider,
    useThemeContext,
    useWeb3,
    WalletLoginModal,
} from '@gac/shared-v2';
import React from 'react';
import { StyleObject, useStyletron } from 'styletron-react';
import {
    RPCProviderTag,
    useAppConfiguration,
} from '../contexts/AppConfigurationContext';
import { useCurrentReward } from '../web3/hooks/useCurrentReward';
import { useERC20Balance } from '../web3/hooks/useERC20Balance';
import { useERC20Supply } from '../web3/hooks/useERC20Supply';
import { useNFTBalance } from '../web3/hooks/useNFTBalance';
import { useStakeLastUpdatedTime } from '../web3/hooks/useStakeLastUpdatedTime';
import { useTokensStaked } from '../web3/hooks/useTokensStaked';

export interface DashboardItemProps {
    className?: string;
    topText: string;
    isLoading?: boolean;
    lowerElement: React.ReactNode;
}

const AccentTextStyles = (theme: ThemeContextType): StyleObject => ({
    color: theme.foregroundPallette.accent.toRgbaString(),
    fontFamily: theme.font,
    fontWeight: 900,
    fontSize: '14px',
    textAlign: 'center',
});

export const DashboardItem = (props: DashboardItemProps): JSX.Element => {
    const { className, isLoading, topText, lowerElement } = props;
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div className={className}>
            {!isLoading && (
                <>
                    <div
                        className={css({
                            fontFamily: theme.font,
                            color: theme.foregroundPallette.white.toRgbaString(),
                            fontWeight: 700,
                            fontSize: '10px',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                        })}
                    >
                        {topText}
                    </div>
                    <div>{lowerElement}</div>
                </>
            )}
            {!!isLoading && (
                <div
                    className={css({
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    })}
                >
                    <Spinner size={SpinnerSize.medium} />
                </div>
            )}
        </div>
    );
};

const Fraction = ({
    left,
    right,
}: {
    left: React.ReactNode;
    right: React.ReactNode;
}): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div className={css(AccentTextStyles(theme))}>
            <span>{left}</span>
            <span
                className={css({
                    margin: '0px 8px',
                    fontWeight: 700,
                    fontSize: '10px',
                    color: theme.foregroundPallette.white.toRgbaString(),
                })}
            >
                /
            </span>
            <span>{right}</span>
        </div>
    );
};

const Divider = (): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div
            className={css({
                height: '100%',
                width: '1px',
                margin: '0px 16px',
                backgroundColor: theme.foregroundPallette.white.toRgbaString(),
                opacity: 0.1,
            })}
        />
    );
};

const TokenDisplay = ({ amount }: { amount?: BigNumber }): JSX.Element => {
    const number = amount?.div(String(1e18)).toString() ?? 0;
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div
            className={css({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            })}
        >
            <span className={css(AccentTextStyles(theme))}>{number}</span>
            <img
                src={Icons.GACXP}
                className={css({
                    height: '19px',
                    width: 'auto',
                    marginLeft: '4px',
                })}
                alt="GACXP"
            />
        </div>
    );
};

export interface DashboardProps {
    className?: string;
}

export const Dashboard = (props: DashboardProps): JSX.Element => {
    const { className } = props;
    const {
        GamingApeClubAddress,
        GACXPContractAddress,
        GACStakingContractAddress,
    } = useAppConfiguration();
    const { accounts, web3 } = useWeb3();
    const polygonProvider = useCustomRpcProvider(RPCProviderTag.Polygon);
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
        polygonProvider?.web3,
        GACXPContractAddress
    );
    const lastRewardTime = useStakeLastUpdatedTime(account);
    const pendingReward = useCurrentReward(account);
    const rewardTokenSupply = useERC20Supply(
        polygonProvider?.web3,
        GACXPContractAddress
    );
    const currentTime = useCurrentTime();

    const secondsUntilNextReward = React.useMemo(() => {
        if (lastRewardTime.isLoading) return 0;
        if (!lastRewardTime.data) return undefined;

        const dif = currentTime - lastRewardTime.data;
        return dif;
    }, [currentTime, lastRewardTime.data, lastRewardTime.isLoading]);

    const [css] = useStyletron();
    const theme = useThemeContext();
    const bodyClass = ClassNameBuilder(
        className,
        css({
            borderRadius: '20px',
            backgroundColor: theme.backgroundPallette.dark.toRgbaString(),
            color: theme.foregroundPallette.white.toRgbaString(),
            fontFamily: theme.font,
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
        })
    );

    if (!account) {
        return (
            <div className={bodyClass}>
                <WalletLoginModal
                    isOpen={loginModalOpen}
                    onClose={(): void => setWalletModalOpen(false)}
                />
                <DashboardItem
                    topText="Total Apes Staked"
                    isLoading={totalStaked.isLoading}
                    lowerElement={
                        <Fraction left={totalStaked.data ?? 0} right={6650} />
                    }
                />
                <Divider />
                <DashboardItem
                    topText="Total Rewards"
                    isLoading={rewardTokenSupply.isLoading}
                    lowerElement={
                        <TokenDisplay amount={rewardTokenSupply.data} />
                    }
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
            <DashboardItem
                topText="Staked Apes"
                isLoading={userNFTBalance.isLoading || userStake.isLoading}
                lowerElement={
                    <Fraction
                        left={userStake.data?.length ?? 0}
                        right={
                            (userNFTBalance.data ?? 0) +
                            (userStake.data?.length ?? 0)
                        }
                    />
                }
            />
            <Divider />
            <DashboardItem
                topText="Reward Balance"
                isLoading={userRewardBalance.isLoading}
                lowerElement={<TokenDisplay amount={userRewardBalance.data} />}
            />
            <Divider />
            <DashboardItem
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
            />
            <Divider />
            <DashboardItem
                topText="Claimable"
                isLoading={pendingReward.isLoading}
                lowerElement={<TokenDisplay amount={pendingReward.data} />}
            />
            <Button
                icon={Icons.ETHWhite}
                themeType={ButtonType.primary}
                className={css({ marginLeft: '32px' })}
                text="Claim Reward"
                disabled={!pendingReward.data || pendingReward.data.isZero()}
            />
        </div>
    );
};

export default Dashboard;
