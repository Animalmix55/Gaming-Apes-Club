import { Header, useThemeContext } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';

export const Leaderboard = (): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <section
            className={css({
                padding: '24px',
                borderRadius: '20px',
                backgroundColor: theme.backgroundPallette.dark.toRgbaString(),

                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
            })}
        >
            <Header title="Gac xp" subtitle="leaderboard" />
        </section>
    );
};

export default Leaderboard;
