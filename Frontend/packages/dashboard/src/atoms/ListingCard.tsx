import { Icons } from '@gac/shared-v2';
import React, { useState } from 'react';
import { useStyletron } from 'styletron-react';
import { boxShadowStyle, boxShadowTransition } from '../common/styles';

interface Props {
    image: string;
    name: string;
    price: string;
    rank: string;
    url: string;
}

const ListingCard: React.FC<Props> = ({
    image,
    name,
    price,
    rank,
    url,
}): JSX.Element => {
    const [css] = useStyletron();
    const [hover, setHover] = useState(false);

    return (
        <a
            href={url}
            className={css({
                display: 'inline-flex',
                flexDirection: 'column',
                gap: '16px',
                color: 'white',

                width: '264px',
            })}
            onMouseEnter={(): void => setHover(true)}
            onMouseLeave={(): void => setHover(false)}
        >
            <div
                className={css({
                    position: 'relative',

                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: boxShadowTransition,

                    ...(hover ? { ...boxShadowStyle } : {}),
                })}
            >
                <img
                    src={image}
                    alt={name}
                    className={css({
                        width: '264px',
                        height: '264px',
                    })}
                />
                <p
                    className={css({
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        padding: '4px 8px',

                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        backdropFilter: 'blur(40px)',
                        borderRadius: '8px',

                        fontWeight: '700',
                        fontSize: '12px',
                        lineHeight: '16px',
                        letterSpacing: '0.05em',

                        color: 'white',
                    })}
                >
                    Rank {rank}
                </p>
            </div>
            <div
                className={css({
                    display: 'flex',
                    gap: '16px',
                })}
            >
                <p
                    className={css({
                        flex: '1',
                        fontWeight: '900',
                        fontSize: '16px',
                        lineHeight: '22px',
                    })}
                >
                    {name}
                </p>
                <p
                    className={css({
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '22px',
                        letterSpacing: '0.05em',

                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '4px 8px',

                        display: 'inline-flex',
                        gap: '2px',
                        justifyContent: 'center',
                        alignItems: 'center',

                        height: 'min-content',
                    })}
                >
                    <img
                        src={Icons.ETHWhite}
                        alt="Ethereum"
                        className={css({
                            height: '16px',
                            width: 'auto',
                        })}
                    />
                    <span>{price}</span>
                </p>
            </div>
        </a>
    );
};

export default ListingCard;
