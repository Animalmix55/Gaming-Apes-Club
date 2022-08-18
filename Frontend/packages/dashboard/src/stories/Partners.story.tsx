/* eslint-disable react/jsx-props-no-spreading */
import { TABLET } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { DASHBOARD_PADDING, DASHBOARD_PADDING_TABLET } from '../common/styles';
import Partners from '../organisms/Partners';
import '../styles/global.css';

export default {
    title: 'Dashboard/Organisms/Partners',
    component: Partners,
};

const Template = (args: React.ComponentProps<typeof Partners>): JSX.Element => {
    const [css] = useStyletron();
    return (
        <div
            style={{
                backgroundColor: 'black',
                overflow: 'hidden',
            }}
            className={css({
                padding: DASHBOARD_PADDING,
                [TABLET]: {
                    padding: DASHBOARD_PADDING_TABLET,
                },
            })}
        >
            <Partners />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {};
