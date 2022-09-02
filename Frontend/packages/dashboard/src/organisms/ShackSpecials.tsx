import React from 'react';
import { Header, LinkButton } from '@gac/shared-v2';
import specials from '../assets/specials';
import Carousel from '../molecules/Carousel';
import ShackSpecialCard from '../atoms/ShackSpecialCard';
import DashboardSection from '../molecules/DashboardSection';

export const ShackSpecials = (): JSX.Element => {
    return (
        <DashboardSection
            heading={
                <Header title="The Shack's" subtitle="Special of the month" />
            }
            action={
                <LinkButton
                    text="Shop the Shack"
                    href="https://shack.gamingapeclub.com/"
                />
            }
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
