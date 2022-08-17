import React from 'react';
import { useStyletron } from 'styletron-react';
import Heading from '../atoms/Heading';
import MemberCard from '../atoms/MemberCard';
import Carousel from '../molecules/Carousel';
import teamMembers from '../assets/team';

export const TeamMembers = (): JSX.Element => {
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
                    highlightedTitle="Meet the"
                    title="founding team"
                />

                <a href="#">Our mission</a>
            </div>
            <Carousel>
                {teamMembers.map(({ name, alias, title, image, twitter }) => (
                    <MemberCard
                        key={name}
                        name={name}
                        alias={alias}
                        title={title}
                        image={image}
                        twitter={twitter}
                    />
                ))}
            </Carousel>
        </section>
    );
};

export default TeamMembers;
