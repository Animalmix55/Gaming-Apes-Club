import React from 'react';
import { useStyletron } from 'styletron-react';
import Heading from '../atoms/Heading';
import Carousel from '../molecules/Carousel';
import partners from '../assets/partners';
import PartnerCard from '../atoms/PartnerCard';
import DashboardSection from '../molecules/DashboardSection';

export const Partners = (): JSX.Element => {
    const [css] = useStyletron();

    return (
        <DashboardSection
            heading={
                <Heading highlightedTitle="Our Awesome" title="Partners" />
            }
        >
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
        </DashboardSection>
    );
};

export default Partners;
