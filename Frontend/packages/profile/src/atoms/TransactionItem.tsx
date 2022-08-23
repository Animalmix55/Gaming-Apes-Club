import { TokenDisplay } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';

interface Props {
    image: string;
    title: string;
    description: string;
    address: string;
    cost: number;
}

const TransactionItem: React.FC<Props> = ({
    image,
    title,
    description,
    address,
    cost,
}): JSX.Element => {
    const [css] = useStyletron();
    return (
        <div
            className={css({
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
            })}
        >
            <img
                src={image}
                alt=""
                className={css({
                    width: '48px',
                    height: '48px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                })}
            />
            <div
                className={css({
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                })}
            >
                <p
                    className={css({
                        fontWeight: 900,
                        fontSize: '14px',
                        lineHeight: '20px',
                        letterSpacing: '0.03em',
                    })}
                >
                    {title}
                </p>
                <p
                    className={css({
                        fontWeight: 600,
                        fontSize: '12px',
                        lineHeight: '18px',
                        letterSpacing: '0.02em',
                    })}
                >
                    <span className={css({ opacity: 0.5 })}>{description}</span>{' '}
                    <span>{address}</span>
                </p>
            </div>
            <TokenDisplay
                className={css({
                    fontWeight: 900,
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '0.1em',
                })}
                amount={cost}
                negative
            />
        </div>
    );
};

export default TransactionItem;
