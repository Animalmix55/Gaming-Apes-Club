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
            <Carousel
                {...args}
                separatorClassName={css({
                    minWidth: '12px',
                })}
            >
                <div
                    itemID="1"
                    className={css({
                        backgroundColor: 'green',
                        padding: '8px',
                        width: '66vw',
                    })}
                >
                    <h3>1</h3>
                </div>
                <div
                    itemID="2"
                    className={css({
                        backgroundColor: 'green',
                        padding: '8px',
                        width: '66vw',
                    })}
                >
                    <h3>2</h3>
                </div>
                <div
                    itemID="3"
                    className={css({
                        backgroundColor: 'green',
                        padding: '8px',
                        width: '66vw',
                    })}
                >
                    <h3>3</h3>
                </div>
                <div
                    itemID="4"
                    className={css({
                        backgroundColor: 'green',
                        padding: '8px',
                        width: '66vw',
                    })}
                >
                    <h3>4</h3>
                </div>
                <div
                    itemID="5"
                    className={css({
                        backgroundColor: 'green',
                        padding: '8px',
                        width: '66vw',
                    })}
                >
                    <h3>5</h3>
                </div>
                <div
                    itemID="6"
                    className={css({
                        backgroundColor: 'green',
                        padding: '8px',
                        width: '66vw',
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
