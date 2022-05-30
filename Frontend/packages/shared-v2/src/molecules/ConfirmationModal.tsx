import React from 'react';
import { useStyletron } from 'styletron-react';
import { ButtonType, Button } from '../atoms/Button';
import { Modal } from '../atoms/Modal';
import { useThemeContext } from '../contexts/ThemeContext';

export interface ConfirmationModalProps {
    title: string;
    body?: string;
    confirmButtonText?: string;
    rejectButtonText?: string;
    isOpen?: boolean;
    onRepond?: (confirm: boolean) => void;
}

export const ConfirmationModal = (
    props: ConfirmationModalProps
): JSX.Element => {
    const {
        title,
        body,
        confirmButtonText,
        rejectButtonText,
        isOpen,
        onRepond,
    } = props;
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <Modal
            isOpen={isOpen}
            modalClass={css({
                minHeight: 'unset !important',
                maxWidth: '340px',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: theme.font,
                    color: theme.foregroundPallette.white.toRgbaString(),
                    fontWeight: 600,
                    fontSize: '12px',
                    flexDirection: 'column',
                })}
            >
                <div
                    className={css({
                        fontWeight: 900,
                        fontStyle: 'italic',
                        fontSize: '28px',
                        marginBottom: '16px',
                        textTransform: 'uppercase',
                    })}
                >
                    {title}
                </div>
                <div className={css({ fontWeight: 500, fontSize: '15px' })}>
                    {body}
                </div>
                <div
                    className={css({
                        display: 'flex',
                        marginTop: '30px',
                        width: '100%',
                        justifyContent: 'center',
                    })}
                >
                    <Button
                        themeType={ButtonType.primary}
                        onClick={(): void => onRepond?.(true)}
                        text={confirmButtonText ?? 'Yes'}
                        className={css({
                            marginRight: '20px',
                            flex: 1,
                            justifyContent: 'center',
                        })}
                    />
                    <Button
                        themeType={ButtonType.error}
                        className={css({ flex: 1, justifyContent: 'center' })}
                        onClick={(): void => onRepond?.(false)}
                        text={rejectButtonText ?? 'No'}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
