import {
    ClassNameBuilder,
    MOBILE,
    useMatchMediaQuery,
    useThemeContext,
} from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import Heading from '../atoms/Heading';
import XPIcon from '../assets/png/GAC_XP_ICON.png';

interface StatItemProps {
    className?: string;
    heading: string;
    smallHeading?: boolean;
    text: string;
    icon?: string;
    iconAlt?: string;
}

const StatItem: React.FC<StatItemProps> = ({
    className,
    heading,
    smallHeading,
    text,
    icon,
    iconAlt,
}): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();
    const isMobile = useMatchMediaQuery(MOBILE);

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
                })
            )}
        >
            <StatHeading small={smallHeading}>{heading}</StatHeading>
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

export const HolderStats = (): JSX.Element => {
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
                    text="19,857,602"
                    icon={XPIcon}
                    iconAlt="XP"
                />
                <StatItem
                    className={css({
                        [MOBILE]: {
                            gridColumn: 'span 3',
                        },
                    })}
                    heading="GAC Holders"
                    smallHeading
                    text="2,453"
                />
                <StatItem
                    className={css({
                        [MOBILE]: {
                            gridColumn: 'span 3',
                        },
                    })}
                    heading="Diamond District"
                    smallHeading
                    text="1,952"
                />
                <StatItem
                    className={css({
                        [MOBILE]: {
                            gridColumn: 'span 3',
                        },
                    })}
                    heading="Whitelist Purchased"
                    smallHeading
                    text="2,671"
                />
                <StatItem
                    className={css({ gridColumn: 'span 3' })}
                    heading="Total GAC XP Spent"
                    text="857,602"
                    icon={XPIcon}
                    iconAlt="XP"
                />
            </div>
        </section>
    );
};

export default HolderStats;
