import { BigNumber } from '@ethersproject/bignumber';
import { Spinner, SpinnerSize } from '@fluentui/react';
import {
    Button,
    ButtonType,
    ClassNameBuilder,
    Icons,
    useCustomRpcProvider,
    useGACStakingChildContract,
    useGACXPContract,
    useGamingApeClubContract,
    useThemeContext,
    useWeb3,
    WalletLoginModal,
} from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
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
        <div
            className={css({
                color: theme.foregroundPallette.accent.toRgbaString(),
                fontFamily: theme.font,
                fontWeight: 900,
                fontSize: '14px',
                textAlign: 'center',
            })}
        >
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
    const number = amount?.div(10 ** 18).toNumber() ?? 0;
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
            <span
                className={css({
                    fontFamily: theme.font,
                    fontWeight: 900,
                    fontSize: '14px',
                })}
            >
                {number}
            </span>
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
    const nextRewardTime = useStakeLastUpdatedTime(account);
    const pendingReward = useCurrentReward(account);
    const rewardTokenSupply = useERC20Supply(
        polygonProvider?.web3,
        GACXPContractAddress
    );

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
                    isLoading={totalStaked.isLoading === undefined}
                    lowerElement={
                        <Fraction left={totalStaked.data ?? 0} right={6650} />
                    }
                />
                <Divider />
                <DashboardItem
                    topText="Total Rewards"
                    isLoading={rewardTokenSupply.isLoading === undefined}
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
            <Divider />
            <DashboardItem
                topText="Reward Balance"
                isLoading={userRewardBalance.isLoading === undefined}
                lowerElement={<TokenDisplay amount={userRewardBalance.data} />}
            />
        </div>
    );
};

export default Dashboard;
