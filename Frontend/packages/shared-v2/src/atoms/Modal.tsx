import { Layer } from '@fluentui/react';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useThemeContext } from '../contexts/ThemeContext';
import { ClassNameBuilder } from '../utilties';
import { Icons } from '../utilties/Icons';
import { Button } from './Button';

export interface ModalProps {
    children: React.ReactNode;
    curtainClass?: string;
    modalClass?: string;
    onClose?: () => void;
    isOpen?: boolean;
}

export const Modal = (props: ModalProps): JSX.Element | null => {
    const { children, curtainClass, modalClass, onClose, isOpen } = props;

    const [css] = useStyletron();
    const theme = useThemeContext();

    if (!isOpen) {
        return null;
    }

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
                    })
                )}
            >
                <div
                    className={ClassNameBuilder(
                        modalClass,
                        css({
                            padding: '24px',
                            borderRadius: '20px',
                            position: 'relative',
                            minHeight: '200px',
                            minWidth: '200px',
                            boxShadow: theme.shadowPallette.rainbow,
                        })
                    )}
                >
                    {onClose && (
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
                            })}
                        />
                    )}
                    {children}
                </div>
            </div>
        </Layer>
    );
};
