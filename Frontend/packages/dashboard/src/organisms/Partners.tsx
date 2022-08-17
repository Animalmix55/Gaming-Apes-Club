import React from 'react';
import { useStyletron } from 'styletron-react';
import Heading from '../atoms/Heading';
import Carousel from '../molecules/Carousel';

import AsteriaLabs from '../assets/partners/asteria-labs.png';
import Llamaverse from '../assets/partners/llamaverse.png';
import PowerGpu from '../assets/partners/power-gpu.png';
import RooTroop from '../assets/partners/roo-troop.png';
import {
    boxShadowStyle,
    dropShadowStyle,
    dropShadowTransition,
} from '../common/styles';

const partners = [
    {
        name: 'Llamaverse',
        image: Llamaverse,
        url: '#',
    },
    {
        name: 'Asteria Labs',
        image: AsteriaLabs,
        url: '#',
    },
    {
        name: 'Roo Troop',
        image: RooTroop,
        url: '#',
    },
    {
        name: 'Power GPU',
        image: PowerGpu,
        url: '#',
    },
];

export const Partners = (): JSX.Element => {
    const [css] = useStyletron();

    return (
        <section
            className={css({
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                })}
            >
                <Heading
                    className={css({ flex: '1' })}
                    highlightedTitle="Our Awesome"
                    title="Partners"
                />
            </div>
            <Carousel>
                {partners.map(({ name, image, url }) => (
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
                ))}
            </Carousel>
        </section>
    );
};

export default Partners;
