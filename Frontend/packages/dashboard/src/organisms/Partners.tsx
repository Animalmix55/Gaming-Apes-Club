import React from 'react';
import { useStyletron } from 'styletron-react';
import Heading from '../atoms/Heading';
import Carousel from '../molecules/Carousel';
import partners from '../assets/partners';
import PartnerCard from '../atoms/PartnerCard';

export const Partners = (): JSX.Element => {
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
                    highlightedTitle="Our Awesome"
                    title="Partners"
                />
            </div>
            <Carousel itemPaddingHorizontal={32} itemPaddingVertical={32}>
                {partners.map(({ name, image, url }) => (
                    <div
                        key={name}
                        itemID={name}
                        className={css({
                            minWidth: '208px',
                        })}
                    >
                        <PartnerCard name={name} image={image} url={url} />
                    </div>
                ))}
            </Carousel>
        </section>
    );
};

export default Partners;
