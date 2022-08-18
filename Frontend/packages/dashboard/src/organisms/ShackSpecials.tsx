import React from 'react';
import { LinkButton } from '@gac/shared-v2';
import specials from '../assets/specials';
import Heading from '../atoms/Heading';
import Carousel from '../molecules/Carousel';
import ShackSpecialCard from '../atoms/ShackSpecialCard';
import DashboardSection from '../molecules/DashboardSection';

export const ShackSpecials = (): JSX.Element => {
    return (
        <DashboardSection
            heading={
                <Heading
                    highlightedTitle="The Shack's"
                    title="Special of the month"
                />
            }
            action={<LinkButton text="Shop the Shack" href="#" />}
        >
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
        </DashboardSection>
    );
};

export default ShackSpecials;
