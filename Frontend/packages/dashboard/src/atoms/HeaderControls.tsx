/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { Icons, useThemeContext } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';

interface Props {
    total: number;
    currentIndex: number;
    showArrows?: boolean;
    onNext?: () => void;
    onPrev?: () => void;
}

const Button: React.FC<{ disabled?: boolean; onClick?: () => void }> = ({
    children,
    disabled,
    onClick,
}): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                height: '48px',
                aspectRatio: '1 / 1',
                borderRadius: '50%',

                opacity: disabled ? '0.5' : '1',

                transition: '0.2s background-color linear',
                backgroundColor: theme.buttonPallette.secondary.toRgbaString(),

                backdropFilter: 'blur(40px)',
                border: 'unset',

                cursor: disabled ? 'default' : 'pointer',

                ':hover:not(:disabled), :focus:not(:disabled)': {
                    backgroundColor:
                        theme.buttonPallette.primary.toRgbaString(),
                },
            })}
        >
            {children}
        </button>
    );
};

const BannerControls: React.FC<Props> = ({
    total,
    currentIndex,
    showArrows = true,
    onNext,
    onPrev,
}): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div
            className={css({
                display: 'flex',
                gap: '16px',

                alignItems: 'center',
            })}
        >
            <div
                className={css({
                    flex: '1',
                    display: 'grid',
                    gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))`,
                    gap: '8px',
                })}
            >
                {[...Array(total)].map((e, i) => (
                    <div
                        className={css({
                            height: '4px',
                            minWidth: '4px',
                            borderRadius: '2px',

                            backgroundColor:
                                i === currentIndex
                                    ? theme.buttonPallette.primary.toRgbaString()
                                    : 'rgba(196, 196, 196, 0.2)',
                        })}
                        key={i}
                    />
                ))}
            </div>
            {showArrows && (
                <div
                    className={css({
                        display: 'flex',
                        gap: '24px',
                    })}
                >
                    <Button onClick={onPrev} disabled={currentIndex === 0}>
                        <img
                            src={Icons.ChevronLeft}
                            alt="Previous"
                            className={css({
                                height: '12px',
                                marginRight: '3px',
                            })}
                        />
                    </Button>
                    <Button
                        onClick={onNext}
                        disabled={currentIndex === total - 1}
                    >
                        <img
                            src={Icons.ChevronRight}
                            alt="Previous"
                            className={css({
                                height: '12px',
                                marginLeft: '3px',
                            })}
                        />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default BannerControls;
