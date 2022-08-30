import React from 'react';
import { useStyletron } from 'styletron-react';
import { dropShadowStyle, dropShadowTransition } from '../common/styles';

interface Props {
    image: string;
    name: string;
    url: string;
}

const PartnerCard: React.FC<Props> = ({
    image,
    name,

    url,
}): JSX.Element => {
    const [css] = useStyletron();

    return (
        <a
            className={css({
                overflow: 'hidden',
                color: 'white',

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',

                transition: dropShadowTransition,

                ':hover': {
                    ...dropShadowStyle,
                },

                ':focus': {
                    ...dropShadowStyle,
                },
            })}
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <img
                className={css({
                    width: '208px',
                    height: '208px',
                    aspectRatio: '1 / 1',
                    objectFit: 'cover',
                    borderRadius: '50%',
                })}
                src={image}
                alt={name}
            />
            <p
                className={css({
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '20px',
                    textTransform: 'uppercase',
                })}
            >
                {name}
            </p>
        </a>
    );
};

export default PartnerCard;
