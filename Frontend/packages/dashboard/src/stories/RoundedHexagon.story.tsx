/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useStyletron } from 'styletron-react';
import RoundedHexagon from '../atoms/RoundedHexagon';
import '../styles/global.css';

export default {
    title: 'Dashboard/Atoms/RoundedHexagon',
    component: RoundedHexagon,
};

const Template = (
    args: React.ComponentProps<typeof RoundedHexagon>
): JSX.Element => {
    const [css] = useStyletron();
    return (
        <div style={{ padding: '3rem' }}>
            <div className={css({ width: '264px' })}>
                <RoundedHexagon
                    {...args}
                    className={css({
                        background: 'black',
                    })}
                />
            </div>
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    id: 'test',
    radius: 10,
    className: { control: false },
};
