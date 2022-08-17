import React from 'react';
import { useStyletron } from 'styletron-react';
import specials from '../assets/specials';
import Heading from '../atoms/Heading';
import Carousel from '../molecules/Carousel';
import ShackSpecialCard from '../atoms/ShackSpecialCard';

export const ShackSpecials = (): JSX.Element => {
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
                    highlightedTitle="The Shack's"
                    title="Special of the month"
                />
            </div>
            <Carousel>
                {specials.map(({ name, image, tag, cost, url }) => (
                    <ShackSpecialCard
                        key={name}
                        name={name}
                        image={image}
                        tag={tag}
                        cost={cost}
                        url={url}
                    />
                ))}
            </Carousel>
        </section>
    );
};

export default ShackSpecials;
