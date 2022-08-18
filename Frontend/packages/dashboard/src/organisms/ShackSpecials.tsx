import React from 'react';
import { useStyletron } from 'styletron-react';
import { LinkButton } from '@gac/shared-v2';
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
                <LinkButton text="Shop the Shack" href="#" />
            </div>
            <Carousel itemPaddingVertical={32} itemPaddingHorizontal={8}>
                {specials.map(({ name, image, tag, cost, url }) => (
                    <div key={name} itemID={name}>
                        <ShackSpecialCard
                            name={name}
                            image={image}
                            tag={tag}
                            cost={cost}
                            url={url}
                        />
                    </div>
                ))}
            </Carousel>
        </section>
    );
};

export default ShackSpecials;
