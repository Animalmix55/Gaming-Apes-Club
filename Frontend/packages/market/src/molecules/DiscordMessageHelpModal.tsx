import { ITextFieldStyles, TextField, ThemeProvider } from '@fluentui/react';
import { useThemeContext, Modal } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';

interface Props {
    isOpen?: boolean;
    onClose?: () => void;
    value?: string;
    onValueChange: (newValue?: string) => void;
    disabled?: boolean;
}

export const DiscordMessageHelpModal = (props: Props): JSX.Element => {
    const { isOpen, onClose, value, onValueChange, disabled } = props;
    const { defaultDiscordMessage } = useGamingApeContext();

    const theme = useThemeContext();
    const styles: Partial<ITextFieldStyles> = {
        description: { color: theme.foregroundPallette.white.toRgbaString() },
        field: {
            color: theme.foregroundPallette.black.toRgbaString(
                disabled ? 0.5 : 1
            ),
        },
    };
    const [css] = useStyletron();
    const fieldClass = css({ margin: '5px' });

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ThemeProvider
                applyTo="none"
                theme={{
                    palette: {
                        themePrimary:
                            theme.foregroundPallette.accent.toRgbaString(),
                        neutralPrimary:
                            theme.foregroundPallette.white.toRgbaString(),
                        neutralDark:
                            theme.foregroundPallette.white.toRgbaString(),
                        black: theme.foregroundPallette.black.toRgbaString(),
                        white: theme.foregroundPallette.white.toRgbaString(),
                    },
                }}
            >
                <div>
                    <div>
                        <TextField
                            disabled={disabled}
                            className={fieldClass}
                            label="Discord Message"
                            description="The message sent to the GAC Shack discord channel after the transaction completes"
                            value={value}
                            placeholder={defaultDiscordMessage}
                            styles={styles}
                            multiline
                            resizable={false}
                            onChange={(_, v): void => onValueChange(v)}
                        />
                    </div>
                    <div
                        className={css({
                            color: theme.foregroundPallette.white.toRgbaString(),
                            fontFamily: theme.font,
                        })}
                    >
                        <div
                            className={css({
                                padding: '5px',
                                margin: '5px',
                            })}
                        >
                            <div
                                className={css({
                                    fontFamily: theme.font,
                                    color: theme.foregroundPallette.accent.toRgbaString(),
                                    fontWeight: 'bold',
                                })}
                            >
                                Valid References
                            </div>
                            <div>
                                Inside the Discord Message field you can
                                reference any of the attributes on the listing
                                and/or user involved in the transaction.
                                <br />
                                You can make these references inline following
                                the syntax:{' '}
                            </div>
                        </div>
                        <div
                            className={css({
                                backgroundColor: 'white',
                                color: 'black',
                                fontFamily: 'sans-serif',
                                padding: '5px',
                                margin: '5px',
                                textAlign: 'center',
                            })}
                        >
                            <span className={css({ color: 'red' })}>{'{'}</span>
                            <span className={css({ color: 'blue' })}>
                                {'<'}user
                            </span>
                            <span> | </span>
                            <span className={css({ color: 'blue' })}>
                                transaction
                            </span>
                            <span> | </span>
                            <span className={css({ color: 'blue' })}>
                                listing{'>'}
                            </span>
                            <span className={css({ color: 'green' })}>.</span>
                            <span className={css({ color: 'blue' })}>
                                {'<'}attribute{'>'}
                            </span>
                            <span className={css({ color: 'red' })}>{'}'}</span>
                        </div>
                        <div
                            className={css({
                                display: 'flex',
                                justifyContent: 'center',
                            })}
                        >
                            <div className={css({ padding: '5px' })}>
                                <div
                                    className={css({
                                        fontWeight: 'bold',
                                        fontFamily: theme.font,
                                    })}
                                >
                                    User Attributes
                                </div>
                                <div>id</div>
                                <div>username</div>
                                <div>discriminator</div>
                                <div>avatar</div>
                                <div>mfa_enabled</div>
                                <div>banner</div>
                                <div>accent_color</div>
                                <div>locale</div>
                                <div>verified</div>
                                <div>email</div>
                                <div>flags</div>
                                <div>premium_type</div>
                                <div>public_flags</div>
                            </div>
                            <div className={css({ padding: '5px' })}>
                                <div
                                    className={css({
                                        fontWeight: 'bold',
                                        fontFamily: theme.font,
                                    })}
                                >
                                    Listing Attributes
                                </div>
                                <div>title</div>
                                <div>description</div>
                                <div>image</div>
                                <div>price</div>
                                <div>supply</div>
                                <div>maxPerUser</div>
                                <div>requiresHoldership</div>
                                <div>requiresLinkedAddress</div>
                                <div>disabled</div>
                                <div>discordMessage</div>
                            </div>
                            <div className={css({ padding: '5px' })}>
                                <div
                                    className={css({
                                        fontWeight: 'bold',
                                        fontFamily: theme.font,
                                    })}
                                >
                                    Transaction Attributes
                                </div>
                                <div>id</div>
                                <div>listingId</div>
                                <div>user</div>
                                <div>address</div>
                                <div>date</div>
                                <div>quantity</div>
                            </div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </Modal>
    );
};

export default DiscordMessageHelpModal;
