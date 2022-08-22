import React from 'react';
import { Header, LinkButton, TABLET, useMatchMediaQuery } from '@gac/shared-v2';
import MemberCard from '../atoms/MemberCard';
import Carousel from '../molecules/Carousel';
import teamMembers from '../assets/team';
import DashboardSection from '../molecules/DashboardSection';

export const TeamMembers = (): JSX.Element => {
    const isTablet = useMatchMediaQuery(TABLET);

    return (
        <DashboardSection
            heading={<Header title="Meet the" subtitle="founding team" />}
            action={<LinkButton text="Our mission" href="#" />}
        >
            <Carousel
                itemPaddingVertical={32}
                itemPaddingHorizontal={isTablet ? 12 : 32}
            >
                {teamMembers.map(({ name, alias, title, image, twitter }) => (
                    <div key={name} itemID={name}>
                        <MemberCard
                            name={name}
                            alias={alias}
                            title={title}
                            image={image}
                            twitter={twitter}
                        />
                    </div>
                ))}
            </Carousel>
        </DashboardSection>
    );
};

export default TeamMembers;
