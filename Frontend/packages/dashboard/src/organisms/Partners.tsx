import React from 'react';
import { useStyletron } from 'styletron-react';
import Heading from '../atoms/Heading';
import Carousel from '../molecules/Carousel';
import partners from '../assets/partners';

import { dropShadowStyle, dropShadowTransition } from '../common/styles';
import PartnerCard from '../atoms/PartnerCard';

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
                    <PartnerCard
                        key={url}
                        name={name}
                        image={image}
                        url={url}
                    />
                ))}
            </Carousel>
        </section>
    );
};

export default Partners;
