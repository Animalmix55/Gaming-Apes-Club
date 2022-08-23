import React from 'react';
import {
    ClassNameBuilder,
    Icons,
    MOBILE,
    RoundedHexagon,
} from '@gac/shared-v2';
import { useStyletron } from 'styletron-react';

interface Props {
    image: string;
    name: string;
    discord: string;
    className?: string;
}

const getId = (id: string): string => {
    return (id ?? '').replace('.', '-').replace('#', '-').replace(' ', '_');
};

const ProfileHeader: React.FC<Props> = ({
    image,
    name,
    discord,
    className,
}): JSX.Element => {
    const [css] = useStyletron();
    return (
        <div
            className={ClassNameBuilder(
                css({
                    display: 'flex',
                    gap: '24px',

                    alignItems: 'center',

                    [MOBILE]: {
                        textAlign: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: '16px',
                    },
                }),
                className
            )}
        >
            <div className={css({ width: '80px' })}>
                <RoundedHexagon id={getId(discord)} radius={5} width={80}>
                    <img
                        src={image}
                        alt={name}
                        className={css({ objectFit: 'contain', width: '80px' })}
                    />
                </RoundedHexagon>
            </div>
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    [MOBILE]: {
                        gap: '4px',
                    },
                })}
            >
                <h1
                    className={css({
                        fontWeight: 900,
                        fontSize: '28px',
                        lineHeight: '28px',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                    })}
                >
                    {name}
                </h1>
                <div
                    className={css({
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '24px',
                    })}
                >
                    <p
                        className={css({
                            display: 'flex',
                            gap: '4px',
                            alignItems: 'center',

                            [MOBILE]: {
                                justifyContent: 'center',
                            },
                        })}
                    >
                        <span>
                            <img
                                src={Icons.Discord}
                                className={css({
                                    height: '20px',
                                    width: 'auto',
                                })}
                                alt="Discord"
                            />
                        </span>
                        {discord}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
