import React from 'react';
import { useStyletron } from 'styletron-react';
import { useThemeContext } from '@gac/shared-v2/lib/contexts/ThemeContext';
import Background from '@gac/shared-v2/lib/assets/png/misc/BankVault.png';
import {
    Button,
    ButtonType,
    ClassNameBuilder,
    Icons,
    MOBILE,
} from '@gac/shared-v2';

export interface NeedMoreModuleProps {
    className?: string;
    onClickOpenSea: () => void;
}

export const NeedMoreModule = (props: NeedMoreModuleProps): JSX.Element => {
    const { className, onClickOpenSea } = props;
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    backgroundImage: `url(${Background})`,
                    width: '100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    boxSizing: 'border-box',
                    backgroundSize: 'cover',
                    minHeight: '328px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '40px',
                    fontFamily: theme.font,
                    color: theme.foregroundPallette.white.toRgbaString(),
                    [MOBILE]: {
                        flexDirection: 'column',
                        minHeight: '574px',
                    },
                })
            )}
        >
            <div
                className={css({
                    marginRight: 'auto',
                    backgroundColor:
                        theme.foregroundPallette.primary.toRgbaString(0.4),
                    backdropFilter: 'blur(40px)',
                    borderRadius: '20px',
                    maxWidth: '456px',
                    boxSizing: 'border-box',
                    padding: '24px',
                    [MOBILE]: {
                        width: '100%',
                        maxWidth: 'unset',
                        marginBottom: '26px',
                        marginTop: 'auto',
                    },
                })}
            >
                <div
                    className={css({
                        fontWeight: 900,
                        fontStyle: 'italic',
                        fontSize: '28px',
                        marginBottom: '16px',
                        textTransform: 'uppercase',
                        whiteSpace: 'break-spaces',
                    })}
                >
                    Start Earning Now
                </div>
                <div className={css({ fontWeight: 500, fontSize: '15px' })}>
                    You will need all the GAC Apes you can get in order to
                    accrue GACXP! Go to OpenSea and find the apes that are right
                    for you today!
                </div>
            </div>
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    [MOBILE]: {
                        width: '100%',
                        justifyContent: 'center',
                    },
                })}
            >
                <div
                    className={css({
                        marginRight: '16px',
                        fontWeight: 700,
                        fontSize: '14px',
                    })}
                >
                    View collection on
                </div>
                <div>
                    <Button
                        onClick={onClickOpenSea}
                        text="OpenSea"
                        icon={Icons.OpenSeaRound}
                        themeType={ButtonType.primary}
                    />
                </div>
            </div>
        </div>
    );
};

export default NeedMoreModule;
