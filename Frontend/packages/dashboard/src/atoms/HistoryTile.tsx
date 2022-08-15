import {
    TokenDisplay,
    ClassNameBuilder,
    useThemeContext,
} from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { GuildMember } from '../api/Models/GuildMember';
import { Transaction } from '../api/Models/Transaction';
import { ImageWithBadge } from './ImageWithBadge';

export interface HistoryTileProps {
    transaction: Transaction;
    user?: GuildMember;
    className?: string;
}

export const HistoryTile = (props: HistoryTileProps): JSX.Element => {
    const { transaction, className, user } = props;
    const { date, listing, totalCost, quantity, address } = transaction;
    const { title, image, price } = listing || {};
    const { displayAvatarURL } = user || {};

    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div
            className={ClassNameBuilder(
                css({
                    display: 'flex',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    padding: '8px',
                    fontSize: '12px',
                    fontFamily: theme.font,
                    color: theme.foregroundPallette.white.toRgbaString(),
                    borderRadius: '20px',
                    ':hover': {
                        backgroundColor:
                            theme.backgroundPallette.light.toRgbaString(),
                    },
                }),
                className
            )}
        >
            {image && (
                <ImageWithBadge
                    className={css({ marginRight: '24px' })}
                    image={image}
                    badgeImage={displayAvatarURL}
                />
            )}
            <div className={css({ flex: '1' })}>
                <div
                    className={css({
                        color: theme.foregroundPallette.white.toRgbaString(0.5),
                        fontWeight: 500,
                    })}
                >
                    {new Date(date).toLocaleDateString()} at{' '}
                    {new Date(date).toLocaleTimeString()}
                </div>
                <div
                    className={css({
                        fontSize: '14px',
                        margin: '4px 0px',
                        fontWeight: 800,
                    })}
                >
                    {quantity}x - {title}
                </div>
                {user && (
                    <div
                        className={css({
                            color: theme.foregroundPallette.white.toRgbaString(
                                0.5
                            ),
                            fontWeight: 500,
                        })}
                    >
                        By{' '}
                        <span
                            className={css({
                                fontWeight: 700,
                                color: theme.foregroundPallette.accent.toRgbaString(),
                            })}
                        >
                            {user.displayName}
                        </span>
                        {!!address && (
                            <>
                                {' '}
                                to{' '}
                                <span
                                    className={css({
                                        color: theme.foregroundPallette.white.toRgbaString(),
                                    })}
                                >
                                    {address.slice(0, 4)}...
                                    {address.slice(address.length - 4)}
                                </span>
                            </>
                        )}
                    </div>
                )}
            </div>
            <div className={css({ marginLeft: '24px', marginRight: '8px' })}>
                <TokenDisplay
                    negative
                    amount={totalCost ?? (price ?? 0) * quantity}
                />
            </div>
        </div>
    );
};

export default HistoryTile;
