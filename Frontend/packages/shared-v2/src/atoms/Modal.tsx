/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Layer } from '@fluentui/react';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useThemeContext } from '../contexts/ThemeContext';
import { useMatchMediaQuery } from '../hooks/useMatchMediaQuery';
import { ClassNameBuilder, MOBILE } from '../utilties';
import { Icons } from '../utilties/Icons';
import { Button } from './Button';

export interface ModalProps {
    children: React.ReactNode;
    curtainClass?: string;
    modalClass?: string;
    onClose?: () => void;
    isOpen?: boolean;
    suppressCloseButton?: boolean;
}

export const Modal = (props: ModalProps): JSX.Element | null => {
    const {
        children,
        curtainClass,
        modalClass,
        onClose,
        suppressCloseButton,
        isOpen,
    } = props;

    const [css] = useStyletron();
    const theme = useThemeContext();
    const isMobile = useMatchMediaQuery(MOBILE);

    if (!isOpen) {
        return null;
    }

    const hasCloseButton = onClose && !suppressCloseButton;

    return (
        <Layer>
            <div
                className={ClassNameBuilder(
                    curtainClass,
                    css({
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        width: '100vw',
                        backdropFilter: 'blur(40px)',
                        boxSizing: 'border-box',
                        color: theme.foregroundPallette.white.toRgbaString(),
                        backgroundColor:
                            theme.backgroundPallette.darker.toRgbaString(),
                        padding: '24px',
                        [MOBILE]: {
                            padding: `${
                                onClose ? '80px' : '44px'
                            } 24px 44px 24px`,
                            position: 'relative',
                        },
                    })
                )}
                onClick={onClose}
            >
                {isMobile && onClose && (
                    <Button
                        onClick={onClose}
                        icon={Icons.Close}
                        iconClass={css({ height: '36px !important' })}
                        className={css({
                            zIndex: 10,
                            top: '24px',
                            left: '24px',
                            position: 'absolute',
                            padding: 'unset !important',
                            height: 'auto !important',
                        })}
                    />
                )}
                <div
                    className={ClassNameBuilder(
                        modalClass,
                        css({
                            padding: hasCloseButton ? '24px' : '16px',
                            borderRadius: '20px',
                            position: 'relative',
                            boxSizing: 'border-box',
                            minHeight: '200px',
                            minWidth: '200px',
                            boxShadow: theme.shadowPallette.rainbow,
                            maxHeight: '100%',
                            maxWidth: '100%',
                            backgroundColor:
                                theme.backgroundPallette.dark.toRgbaString(),
                            [MOBILE]: {
                                height: '100%',
                                width: '100%',
                            },
                        })
                    )}
                    onClick={(e): void => e.stopPropagation()}
                >
                    {hasCloseButton && !isMobile && (
                        <Button
                            onClick={onClose}
                            icon={Icons.Close}
                            iconClass={css({ height: '36px !important' })}
                            className={css({
                                zIndex: 10,
                                top: '20px',
                                right: '20px',
                                position: 'absolute',
                                padding: 'unset !important',
                                height: 'auto !important',
                                [MOBILE]: {
                                    position: 'relative',
                                    top: 'unset',
                                    right: 'unset',
                                },
                            })}
                        />
                    )}
                    {children}
                </div>
            </div>
        </Layer>
    );
};
