import React from 'react';
import {
    ClassNameBuilder,
    Icons,
    MOBILE,
    RoundedHexagon,
    TokenDisplay,
} from '@gac/shared-v2';
import { useStyletron } from 'styletron-react';

interface Props {
    image: string;
    name: string;
    subtitle: string;
    className?: string;
    xp: number;
}

const getId = (id: string): string => {
    return (id ?? '').replace('.', '-').replace('#', '-').replace(' ', '_');
};

const RankItem: React.FC<Props> = ({
    image,
    name,
    subtitle,
    xp,
    className,
}): JSX.Element => {
    const [css] = useStyletron();
    return (
        <div
            className={ClassNameBuilder(
                css({
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                }),
                className
            )}
        >
            <div className={css({ flexShrink: 0 })}>
                <RoundedHexagon id={getId(name)} radius={5} width={48}>
                    <img
                        src={image}
                        alt={name}
                        className={css({
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                        })}
                    />
                </RoundedHexagon>
            </div>

            <div
                className={css({
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',

                    [MOBILE]: {
                        gap: '4px',
                    },
                })}
            >
                <p
                    className={css({
                        fontWeight: 600,
                        fontSize: '12px',
                        lineHeight: '16px',
                        letterSpacing: '0.02em',
                        opacity: 0.5,
                    })}
                >
                    {subtitle}
                </p>
                <p
                    className={css({
                        fontWeight: 900,
                        fontSize: '14px',
                        lineHeight: '20px',
                        letterSpacing: '0.03em',
                    })}
                >
                    {name}
                </p>
            </div>
            <TokenDisplay
                className={css({
                    fontWeight: 900,
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '0.1em',
                    flexShrink: 0,
                })}
                amount={xp}
            />
        </div>
    );
};

export default RankItem;
