import { useThemeContext } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import RoundedHexagon from './RoundedHexagon';

interface Props {
    name: string;
    alias: string;
    title: string;
    image?: string;
}

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
