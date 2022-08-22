import { Spinner, SpinnerSize } from '@fluentui/react';
import {
    AccentTextStyles,
    ClassNameBuilder,
    Fraction,
    Icons,
    MOBILE,
    TokenDisplay,
    useERC20Supply,
    useMatchMediaQuery,
    useNFTBalance,
    useThemeContext,
    useWeb3,
} from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import Heading from '../atoms/Heading';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';

interface StatItemProps {
    className?: string;
    heading: string;
    smallHeading?: boolean;
    loading?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({
    className,
    heading,
    smallHeading,
    children,
    loading,
}): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    backgroundColor:
                        theme.backgroundPallette.light.toRgbaString(),
                    padding: '16px',
                    borderRadius: '20px',

                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                })
            )}
        >
            <StatHeading small={smallHeading}>{heading}</StatHeading>
            {loading ? (
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
            ) : (
                children
            )}
        </div>
    );
};

const StatHeading: React.FC<{ className?: string; small?: boolean }> = ({
    children,
    className,
    small,
}): JSX.Element => {
    const [css] = useStyletron();
    return (
        <h3
            className={ClassNameBuilder(
                className,
                css({ letterSpacing: '0.03em', textAlign: 'center' }),
                css(
                    small
                        ? {
                              fontWeight: '900',
                              fontSize: '12px',
                              lineHeight: '16px',
                          }
                        : {
                              fontWeight: '900',
                              fontSize: '16px',
                              lineHeight: '20px',
                          }
                )
            )}
        >
            {children}
        </h3>
    );
};

const StatDescription: React.FC<{
    text: string;
    icon?: string;
    iconAlt?: string;
}> = ({ text, icon, iconAlt }): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();
    const isMobile = useMatchMediaQuery(MOBILE);

    return (
        <p
            className={css({
                display: 'inline-flex',
                gap: '8px',
                alignItems: 'center',

                fontWeight: '900',
                fontSize: '20px',
                letterSpacing: '0.1em',
                lineHeight: '32px',
                color: theme.foregroundPallette.accent.toRgbaString(),
            })}
        >
            <span>{text}</span>
            {icon && (
                <img
                    alt={iconAlt}
                    src={icon}
                    className={css({
                        height: isMobile ? '20px' : '30px',
                        width: 'auto',
                    })}
                />
            )}
        </p>
    );
};

export const HolderStatsFigma = (): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <section
            className={css({
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',

                backgroundColor: theme.backgroundPallette.dark.toRgbaString(),
                borderRadius: '20px',
                padding: '24px',
            })}
        >
            <Heading
                className={css({
                    flex: '1',
                })}
                highlightedTitle="Overal GAC"
                title="Holder Stats"
            />
            <div
                className={css({
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
                    gap: '1rem',
                })}
            >
                <StatItem
                    className={css({ gridColumn: 'span 3' })}
                    heading="Total GAC XP Earned"
                >
                    <StatDescription
                        text="19,857,602"
                        icon={Icons.GACXP}
                        iconAlt="XP"
                    />
                </StatItem>
                <StatItem
                    className={css({
                        [MOBILE]: {
                            gridColumn: 'span 3',
                        },
                    })}
                    heading="GAC Holders"
                    smallHeading
                >
                    <StatDescription text="2,453" />
                </StatItem>
                <StatItem
                    className={css({
                        [MOBILE]: {
                            gridColumn: 'span 3',
                        },
                    })}
                    heading="Diamond District"
                    smallHeading
                >
                    <StatDescription text="1,952" />
                </StatItem>
                <StatItem
                    className={css({
                        [MOBILE]: {
                            gridColumn: 'span 3',
                        },
                    })}
                    heading="Whitelist Purchased"
                    smallHeading
                >
                    <StatDescription text="2,671" />
                </StatItem>
                <StatItem
                    className={css({ gridColumn: 'span 3' })}
                    heading="Total GAC XP Spent"
                >
                    <StatDescription
                        text="857,602"
                        icon={Icons.GACXP}
                        iconAlt="XP"
                    />
                </StatItem>
            </div>
        </section>
    );
};

const HolderStats = (): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    const {
        ethereumChainId,
        polygonChainId,
        gacStakingContractAddress,
        gamingApeClubAddress,
        gacXPAddress,
    } = useGamingApeContext();
    const { provider: ethProvider } = useWeb3(ethereumChainId);
    const { provider: polygonProvider } = useWeb3(polygonChainId);

    const totalStaked = useNFTBalance(
        ethProvider,
        gacStakingContractAddress,
        gamingApeClubAddress
    );

    const rewardTokenSupply = useERC20Supply(polygonProvider, gacXPAddress);

    return (
        <section
            className={css({
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',

                backgroundColor: theme.backgroundPallette.dark.toRgbaString(),
                borderRadius: '20px',
                padding: '24px',
            })}
        >
            <Heading highlightedTitle="Overal GAC" title="Holder Stats" />
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                })}
            >
                <StatItem
                    heading="Total Apes Staked"
                    loading={totalStaked.isLoading}
                >
                    <Fraction
                        className={css(AccentTextStyles(theme))}
                        left={totalStaked.data ?? 0}
                        right={6550}
                    />
                </StatItem>
                <StatItem
                    heading="Total Rewards"
                    loading={rewardTokenSupply.isLoading}
                >
                    <TokenDisplay amount={rewardTokenSupply.data} />
                </StatItem>
            </div>
        </section>
    );
};

export default HolderStats;
