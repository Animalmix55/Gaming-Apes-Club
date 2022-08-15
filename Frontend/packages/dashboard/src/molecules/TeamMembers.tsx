import React from 'react';
import { useStyletron } from 'styletron-react';

export const TeamMembers = (): JSX.Element => {
    const [css] = useStyletron();

    return (
        <section className={css({ color: 'white', background: 'purple' })}>
            Team Members
        </section>
    );
};

export default TeamMembers;
