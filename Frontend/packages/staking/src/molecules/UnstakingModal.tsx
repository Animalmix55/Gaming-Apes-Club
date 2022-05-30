import { Button, ButtonType, Modal, useThemeContext } from '@gac/shared-v2';
import React from 'react';
import XP from '@gac/shared-v2/src/assets/png/misc/XP 1.png';
import { useStyletron } from 'styletron-react';
import { useAppConfiguration } from '../contexts/AppConfigurationContext';

export interface UnstakingModalProps {
    transactionHash: string;
    onClose: () => void;
    isOpen?: boolean;
}

export const UnstakingModal = (props: UnstakingModalProps): JSX.Element => {
    const { transactionHash, onClose, isOpen } = props;

    const { EtherscanUrl } = useAppConfiguration();
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <Modal
            isOpen={isOpen}
            modalClass={css({
                textAlign: 'center',
                fontFamily: theme.font,
                color: theme.foregroundPallette.white.toRgbaString(),
                padding: '24px',
                maxWidth: '354px',
                width: '100%',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '16px',
                })}
            >
                <img
                    src={XP}
                    className={css({ height: '80px', width: 'auto' })}
                    alt="GACXP"
                />
            </div>
            <div
                className={css({
                    fontWeight: 900,
                    fontStyle: 'italic',
                    fontSize: '28px',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                })}
            >
                <div
                    className={css({
                        color: theme.foregroundPallette.primary.toRgbaString(),
                    })}
                >
                    Your GAC Apes
                </div>
                <div>Are Unstaking</div>
            </div>
            <div>
                It may take up to 15 minutes for your transaction to reflect on
                Polygon.{' '}
                {EtherscanUrl && (
                    <>
                        You can view your transaction{' '}
                        <a
                            href={`${EtherscanUrl}/tx/${transactionHash}`}
                            className={css({
                                color: theme.foregroundPallette.accent.toRgbaString(),
                            })}
                        >
                            here
                        </a>
                    </>
                )}
                .
            </div>
            <div className={css({ display: 'flex', justifyContent: 'center' })}>
                <Button
                    themeType={ButtonType.primary}
                    text="Back to staking page"
                    onClick={onClose}
                    className={css({ marginTop: '24px' })}
                />
            </div>
        </Modal>
    );
};

export default UnstakingModal;
