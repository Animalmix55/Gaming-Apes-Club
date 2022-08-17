/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useStyletron } from 'styletron-react';

import Carousel from '../molecules/Carousel';
import '../styles/global.css';

export default {
    title: 'Dashboard/Molecules/Carousel',
    component: Carousel,
};

const Template = (args: React.ComponentProps<typeof Carousel>): JSX.Element => {
    const [css] = useStyletron();
    return (
        <div
            style={{
                padding: '3rem',
                backgroundColor: 'black',
                color: 'white',
                overflow: 'hidden',
            }}
        >
            <Carousel {...args}>
                <div
                    className={css({
                        backgroundColor: 'green',
                        padding: '8px',
                    })}
                >
                    <h3>1</h3>
                </div>
                <div
                    className={css({
                        backgroundColor: 'green',
                        padding: '8px',
                    })}
                >
                    <h3>2</h3>
                </div>
                <div
                    className={css({
                        backgroundColor: 'green',
                        padding: '8px',
                    })}
                >
                    <h3>3</h3>
                </div>
                <div
                    className={css({
                        backgroundColor: 'green',
                        padding: '8px',
                    })}
                >
                    <h3>4</h3>
                </div>
                <div
                    className={css({
                        backgroundColor: 'green',
                        padding: '8px',
                    })}
                >
                    <h3>5</h3>
                </div>
                <div
                    className={css({
                        backgroundColor: 'green',
                        padding: '8px',
                    })}
                >
                    <h3>6</h3>
                </div>
            </Carousel>
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {};
