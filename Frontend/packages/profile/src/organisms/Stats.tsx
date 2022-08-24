import React, { useMemo } from 'react';
import { useStyletron } from 'styletron-react';
import {
    AccentTextStyles,
    Button,
    ButtonType,
    ClassNameBuilder,
    Fraction,
    Icons,
    MOBILE,
    TokenDisplay,
    useERC20Balance,
    useNFTBalance,
    useThemeContext,
    useWeb3,
    WalletLoginModal,
} from '@gac/shared-v2';
import { BigNumber } from '@ethersproject/bignumber';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';
import { useTokensStaked } from '../web3/hooks/useTokensStaked';
import { useCurrentReward } from '../web3/hooks/useCurrentReward';
import useRewardByAmount from '../web3/hooks/useRewardByAmount';
import StatItem from '../atoms/StatItem';

const AccountStats = ({ account }: { account: string }): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    const {
        ethereumChainId,
        polygonChainId,
        gamingApeClubAddress,
        gacXPAddress,
    } = useGamingApeContext();
    const { provider: ethProvider } = useWeb3(ethereumChainId);
    const { provider: polygonProvider } = useWeb3(polygonChainId);

    const userStake = useTokensStaked(account);
    const amountStaked = userStake.data?.length ?? 0;
    const userNFTBalance = useNFTBalance(
        ethProvider,
        account,
        gamingApeClubAddress
    );

    const userRewardBalance = useERC20Balance(
        account,
        polygonProvider,
        gacXPAddress
    );

    const pendingReward = useCurrentReward(account);
    const { reward: dailyYield } = useRewardByAmount(userStake.data?.length);

    const weeklyYield = useMemo(() => {
        return (dailyYield ?? BigNumber.from(0)).mul(7);
    }, [dailyYield]);

    const tokenClass = css({
        fontWeight: 900,
        fontSize: '20px !important',
        lineHeight: '32px',
        letterSpacing: '0.1em !important',
    });

    const fractionClass = css({
        fontFamily: theme.font,
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '14px',
        letterSpacing: '0.05em',
        color: `${theme.foregroundPallette.white.toRgbaString(0.6)} !important`,
    });

    return (
        <div
            className={css({
                backgroundColor: theme.backgroundPallette.dark.toRgbaString(),
                borderRadius: '20px',
                padding: '24px',

                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                gap: '16px',

                [MOBILE]: {
                    gridTemplateColumns: '1fr',
                },
            })}
        >
            <StatItem
                title="Staked Apes"
                loading={userStake.isLoading || userNFTBalance.isLoading}
            >
                <Fraction
                    className={ClassNameBuilder(
                        css(AccentTextStyles(theme)),
                        tokenClass
                    )}
                    left={amountStaked ?? 0}
                    right={userNFTBalance.data ?? 0}
                />
            </StatItem>
            <StatItem title="Current Yield">
                <Fraction
                    className={css({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    })}
                    rightClassName={fractionClass}
                    slashClassName={fractionClass}
                    left={
                        <TokenDisplay
                            className={tokenClass}
                            amount={weeklyYield}
                        />
                    }
                    right="week"
                />
            </StatItem>
            <StatItem title="My Balance" loading={userRewardBalance.isLoading}>
                <TokenDisplay
                    className={tokenClass}
                    amount={userRewardBalance.data}
                />
            </StatItem>
            <StatItem title="Claimable" loading={pendingReward.isLoading}>
                <TokenDisplay
                    className={tokenClass}
                    amount={pendingReward.data}
                />
            </StatItem>
        </div>
    );
};

export const Stats = (): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    const { ethereumChainId } = useGamingApeContext();
    const { accounts } = useWeb3(ethereumChainId);
    const account = accounts?.[0];

    const [loginModalOpen, setWalletModalOpen] = React.useState(false);

    return account ? (
        <AccountStats account={account} />
    ) : (
        <>
            <WalletLoginModal
                isOpen={loginModalOpen}
                onClose={(): void => setWalletModalOpen(false)}
            />

            <div
                className={css({
                    backgroundColor:
                        theme.backgroundPallette.dark.toRgbaString(),
                    borderRadius: '20px',
                    padding: '24px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '16px',

                    [MOBILE]: {
                        flexDirection: 'column',
                        gap: 'unset',
                    },
                })}
            >
                <p>View Account Stats</p>
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
            </div>
        </>
    );
};

export default Stats;
