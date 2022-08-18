import React from 'react';
import { LinkButton, TABLET, useMatchMediaQuery } from '@gac/shared-v2';
import Heading from '../atoms/Heading';
import MemberCard from '../atoms/MemberCard';
import Carousel from '../molecules/Carousel';
import teamMembers from '../assets/team';
import DashboardSection from '../molecules/DashboardSection';

export const TeamMembers = (): JSX.Element => {
    const isTablet = useMatchMediaQuery(TABLET);

    return (
        <DashboardSection
            heading={
                <Heading highlightedTitle="Meet the" title="founding team" />
            }
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
