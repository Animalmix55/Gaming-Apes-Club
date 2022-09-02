/* eslint-disable react/jsx-props-no-spreading */
import { TABLET } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { DASHBOARD_PADDING, DASHBOARD_PADDING_TABLET } from '../common/styles';
import TeamMembers from '../organisms/TeamMembers';
import '../styles/global.css';

export default {
    title: 'Dashboard/Organisms/TeamMembers',
    component: TeamMembers,
};

const Template = (
    args: React.ComponentProps<typeof TeamMembers>
): JSX.Element => {
    const [css] = useStyletron();
    return (
        <div
            style={{ backgroundColor: 'black' }}
            className={css({
                padding: DASHBOARD_PADDING,
                [TABLET]: {
                    padding: DASHBOARD_PADDING_TABLET,
                },
            })}
        >
            <TeamMembers />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {};
