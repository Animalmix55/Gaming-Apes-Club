import { TooltipHost } from '@fluentui/react';
import {
    ClassNameBuilder,
    HOVERABLE,
    MOBILE,
    useThemeContext,
} from '@gac/shared';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { Listing } from '../api/Models/Listing';
import XPIcon from '../assets/png/GAC_XP_ICON.png';

interface ListingTileProps {
    listing: Listing;
    className?: string;
    onClick?: (listing: Listing) => void;
}

export const ListingTile = (props: ListingTileProps): JSX.Element => {
    const { listing, className, onClick } = props;
    const { image, title, price } = listing;
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <button
            type="button"
            onClick={(): void => onClick?.(listing)}
            className={ClassNameBuilder(
                className,
                css({
                    background: 'unset',
                    border: 'unset',
                    cursor: 'pointer',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '375px',
                    overflow: 'hidden',
                    fontSize: '30px',
                    padding: '10px',
                    boxSizing: 'border-box',
                    transition: 'background-color 500ms',
                    ...(onClick && {
                        [HOVERABLE]: {
                            ':hover': {
                                background:
                                    theme.backgroundGradients.purpleBlueButton,
                            },
                        },
                    }),
                    [MOBILE]: {
                        width: '90%',
                    },
                })
            )}
        >
            <div
                className={css({
                    position: 'relative',
                    display: 'flex',
                    backgroundColor: theme.backgroundColor.light.toRgbaString(),
                    padding: '4px',
                    height: '350px',
                    width: '350px',
                    [MOBILE]: {
                        width: '80%',
                        height: 'auto',
                    },
                })}
            >
                <img
                    className={css({
                        zIndex: 1,
                        height: '100%',
                        width: 'auto',
                        [MOBILE]: {
                            width: '100%',
                            height: 'auto',
                        },
                    })}
                    src={image}
                    alt={title}
                />
            </div>
            <div
                className={css({
                    fontFamily: theme.fonts.headers,
                    color: theme.fontColors.light.toRgbaString(),
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    [MOBILE]: {
                        fontSize: '6vw',
                    },
                })}
            >
                <TooltipHost content={title}>{title}</TooltipHost>
            </div>
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                })}
            >
                <img
                    src={XPIcon}
                    alt="XP"
                    className={css({
                        height: '1.5em',
                        width: 'auto',
                        marginRight: '10px',
                    })}
                />
                <div
                    className={css({
                        fontFamily: theme.fonts.headers,
                        color: theme.fontColors.accent.toRgbaString(),
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        [MOBILE]: {
                            fontSize: '6vw',
                        },
                    })}
                >
                    <TooltipHost content={`${price.toLocaleString()} XP`}>
                        {price.toLocaleString()}
                    </TooltipHost>
                </div>
            </div>
        </button>
    );
};

export default ListingTile;
