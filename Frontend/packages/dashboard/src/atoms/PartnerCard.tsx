import React, { useState } from 'react';
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
                borderRadius: '50%',

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
        >
            <img
                className={css({
                    width: '208px',
                    height: '208px',
                    objectFit: 'cover',
                })}
                src={image}
                alt={name}
            />
        </a>
    );
};

export default PartnerCard;
