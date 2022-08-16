import React from 'react';
import { useStyletron } from 'styletron-react';
import MemberCard from '../atoms/MemberCard';

const MEMBERS = [
    {
        name: 'David',
        alias: 'Politikos',
        title: 'Chief Executive Officer',
        image: '',
        twitter: 'Politikos',
    },
    {
        name: 'Luke',
        alias: 'Truzo',
        title: 'Chief Operating Officer',
        image: '',
        twitter: 'oaTruzo',
    },
    {
        name: 'Alex',
        alias: 'Rubix',
        title: 'Chief Information Officer',
        image: '',
        twitter: 'alex',
    },
    {
        name: 'Nick',
        alias: 'Minski',
        title: 'Chief Marketing Officer',
        image: '',
        twitter: 'nick',
    },
];

export const TeamMembers = (): JSX.Element => {
    const [css] = useStyletron();

    return (
        <section
            className={css({
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                })}
            >
                <h2 className={css({ flex: '1' })}>Meet the Founding Team</h2>
                <a href="#">Our mission</a>
            </div>
            <div className={css({ display: 'flex', gap: '0.5rem' })}>
                {MEMBERS.map(({ name, alias, title, image, twitter }) => (
                    <MemberCard
                        key={name}
                        name={name}
                        alias={alias}
                        title={title}
                        image={image}
                        twitter={twitter}
                    />
                ))}
            </div>
        </section>
    );
};

export default TeamMembers;
