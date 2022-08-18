import React from 'react';
import { useStyletron } from 'styletron-react';
import { LinkButton, TABLET, useMatchMediaQuery } from '@gac/shared-v2';
import Heading from '../atoms/Heading';
import MemberCard from '../atoms/MemberCard';
import Carousel from '../molecules/Carousel';
import teamMembers from '../assets/team';

export const TeamMembers = (): JSX.Element => {
    const [css] = useStyletron();
    const isTablet = useMatchMediaQuery(TABLET);

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
                    highlightedTitle="Meet the"
                    title="founding team"
                />

                <LinkButton text="Our mission" href="#" />
            </div>
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
        </section>
    );
};

export default TeamMembers;
