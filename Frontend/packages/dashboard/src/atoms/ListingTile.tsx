import { TooltipHost } from '@fluentui/react';
import { ClassNameBuilder, HOVERABLE, useThemeContext } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { Listing, ListingWithCount } from '../api/Models/Listing';
import XPIcon from '../assets/png/GAC_XP_ICON.png';

interface ListingTileProps {
    listing: ListingWithCount | Listing;
    className?: string;
    onClick?: (listing: Listing) => void;
}

export const ListingTile = (props: ListingTileProps): JSX.Element => {
    const { listing, className, onClick } = props;
    const { image, title, price, supply } = listing;
    const [css] = useStyletron();
    const theme = useThemeContext();

    const remaining = Math.max(
        (supply ?? Infinity) -
            ((listing as ListingWithCount).totalPurchased ?? 0),
        0
    );

    return (
        <button
            type="button"
            onClick={(): void => onClick?.(listing)}
            className={ClassNameBuilder(
                className,
                css({
                    background: 'unset',
                    width: '264px',
                    border: 'unset',
                    cursor: 'pointer',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    fontFamily: theme.font,
                    alignItems: 'center',
                    fontSize: '25px',
                    boxSizing: 'border-box',
                    transition: 'background-color 500ms',
                })
            )}
        >
            <img
                className={css({
                    height: 'auto',
                    width: '100%',
                    borderRadius: '16px',
                    ...(onClick && {
                        [HOVERABLE]: {
                            ':hover': {
                                boxShadow: theme.shadowPallette.rainbow,
                            },
                        },
                    }),
                })}
                src={image}
                alt={title}
            />
            <div
                className={css({
                    display: 'flex',
                    width: '100%',
                    margin: '16px 4px 0px 4px',
                    alignItems: 'flex-start',
                })}
            >
                <div
                    className={css({
                        width: '100%',
                        textAlign: 'left',
                        flex: '1',
                        marginRight: '16px',
                    })}
                >
                    <div
                        className={css({
                            fontSize: '16px',
                            fontWeight: 900,
                            color: theme.foregroundPallette.white.toRgbaString(),
                            marginBottom: '4px',
                        })}
                    >
                        {title}
                    </div>
                    <div
                        className={css({
                            fontWeight: 600,
                            fontSize: '12px',
                            color: theme.foregroundPallette.white.toRgbaString(
                                0.5
                            ),
                        })}
                    >
                        {remaining !== Infinity && supply !== undefined
                            ? `${remaining}/${supply} Remaining`
                            : '∞ Remaining'}
                    </div>
                </div>
                <TooltipHost
                    hostClassName={css({
                        display: 'flex !important',
                        alignItems: 'flex-start',
                    })}
                    content={`${price.toLocaleString()} XP`}
                >
                    <>
                        <span
                            className={css({
                                fontWeight: 900,
                                fontSize: '16px',
                                color: theme.foregroundPallette.accent.toRgbaString(),
                                marginRight: '8px',
                            })}
                        >
                            {price.toLocaleString()}
                        </span>
                        <img
                            src={XPIcon}
                            alt="XP"
                            className={css({
                                height: '16px',
                                width: 'auto',
                                marginRight: '10px',
                            })}
                        />
                    </>
                </TooltipHost>
            </div>
        </button>
    );
};

export default ListingTile;
