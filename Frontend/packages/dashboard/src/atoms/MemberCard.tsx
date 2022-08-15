import { ClassNameBuilder, useThemeContext } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';

interface Props {
    name: string;
    alias: string;
    title: string;
    image?: string;
}

const RoundedHexagon: React.FC<{
    id: string;
    className?: string;
    radius?: number;
}> = ({ id, children, className, radius = 10 }): JSX.Element => {
    const [css] = useStyletron();
    const filterId = `round-${id}`;

    return (
        <>
            <svg
                style={{ visibility: 'hidden', position: 'absolute' }}
                width="0"
                height="0"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
            >
                <defs>
                    <filter id={filterId}>
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation={radius}
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="goo"
                        />
                        <feComposite
                            in="SourceGraphic"
                            in2="goo"
                            operator="atop"
                        />
                    </filter>
                </defs>
            </svg>
            <div
                className={ClassNameBuilder(
                    className,
                    css({
                        width: '264px',

                        '::before': {
                            content: '""',
                            paddingTop: '86.6%',
                            display: 'block',
                            background: 'red',
                            clipPath:
                                'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                        },

                        filter: `url(#${filterId})`,
                    })
                )}
            >
                {children}
            </div>
        </>
    );
};

const MemberCard: React.FC<Props> = ({
    name,
    alias,
    title,
    image,
}): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div
            className={css({
                width: '264px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
            })}
        >
            <RoundedHexagon
                id={name}
                className={css({
                    width: '264px',
                })}
                radius={10}
            />

            <div
                className={css({
                    padding: '0 0.5rem',
                    textAlign: 'center',

                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',

                    fontFamily: theme.font,
                    fontStyle: 'italic',

                    color: theme.foregroundPallette.white.toRgbaString(),
                })}
            >
                <p
                    className={css({
                        fontWeight: 900,
                        fontSize: '28px',
                        lineHeight: '34px',
                        textTransform: 'uppercase',
                    })}
                >
                    <span className={css({ display: 'block' })}>{name}</span>
                    <span
                        className={css({
                            display: 'block',
                            color: theme.foregroundPallette.primary.toRgbaString(),
                        })}
                    >
                        ({alias})
                    </span>
                </p>
                <p className={css({ fontWeight: 700, fontSize: '16px' })}>
                    {title}
                </p>
            </div>
        </div>
    );
};

export default MemberCard;
