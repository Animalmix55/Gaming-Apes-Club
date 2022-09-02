/* eslint-disable react/jsx-props-no-spreading */
import { MOBILE, useMatchMediaQuery } from '@gac/shared-v2';
import React, { useMemo, useState } from 'react';
import { useStyletron } from 'styletron-react';
import { useSwipeable } from 'react-swipeable';
import data from '../assets/banner';
import HeaderControls from '../atoms/HeaderControls';

export const NewsHeader = (): JSX.Element => {
    const [css] = useStyletron();
    const [index, setIndex] = useState(0);

    const next = (): void => {
        setIndex((prev) => Math.min(data.length - 1, prev + 1));
    };

    const previous = (): void => {
        setIndex((prev) => Math.max(0, prev - 1));
    };

    const handlers = useSwipeable({
        onSwipedRight: previous,
        onSwipedLeft: next,
        trackMouse: true,
    });

    const currentItem = useMemo(() => {
        return data[index];
    }, [index]);

    const isMobile = useMatchMediaQuery(MOBILE);

    return (
        <section
            className={css({
                color: 'white',
                height: '574px',
                width: '100%',

                overflow: 'hidden',
                padding: '40px',
                borderRadius: '40px',

                position: 'relative',
                isolation: 'isolate',

                display: 'flex',
                alignItems: 'flex-end',
            })}
            {...handlers}
        >
            <img
                src={currentItem.image}
                alt=""
                className={css({
                    position: 'absolute',
                    inset: '0',
                    width: '100%',
                    height: '100%',
                    zIndex: '-2',

                    objectFit: 'cover',
                })}
            />

            <div
                className={css({
                    position: 'absolute',
                    inset: '0',
                    background:
                        'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 84.24%)',
                    zIndex: '-1',
                })}
            />

            <div
                className={css({
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gap: '32px',

                    [MOBILE]: {
                        gridTemplateColumns: '1fr',
                        gap: '16px',
                    },
                })}
            >
                <div
                    className={css({
                        backgroundColor: 'rgba(115, 91, 242, 0.4)',
                        backdropFilter: 'blur(40px)',
                        /* Note: backdrop-filter has minimal browser support */

                        borderRadius: '20px',
                        padding: '24px',
                    })}
                >
                    <h1
                        className={css({
                            fontWeight: '900',
                            fontSize: '28px',
                            lineHeight: '28px',
                            textTransform: 'uppercase',
                        })}
                    >
                        {currentItem.title}
                    </h1>
                    <p
                        className={css({
                            fontWeight: '500',
                            fontSize: '15px',
                            lineHeight: '22px',
                            marginTop: '16px',

                            wordWrap: 'break-word',
                            overflow: 'hidden',

                            display: '-webkit-box',
                            '-webkit-line-clamp': '3',
                            '-webkit-box-orient': 'vertical',
                        })}
                    >
                        {currentItem.description}
                    </p>
                </div>
                <div className={css({ marginTop: 'auto' })}>
                    <HeaderControls
                        total={data.length}
                        currentIndex={index}
                        showArrows={!isMobile}
                        onNext={next}
                        onPrev={previous}
                    />
                </div>
            </div>
        </section>
    );
};

export default NewsHeader;
