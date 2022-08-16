/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import { Icons } from '@gac/shared-v2';
import React from 'react';
import MultiCarousel from 'react-multi-carousel';
import { useStyletron } from 'styletron-react';

interface Props {
    className?: string;
}

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
};

const CustomArrow = ({ onClick, left = false }: any): JSX.Element => {
    const [css] = useStyletron();
    return (
        <button
            type="button"
            className={css({
                position: 'absolute',
                [left ? 'left' : 'right']: '0',

                width: '30px',
                aspectRatio: '1 / 1',

                transition: '0.3s background-color linear',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '999px',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(6.2px)',

                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                cursor: 'pointer',
                border: 'none',

                ':hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                },
            })}
            onClick={onClick}
        >
            <img
                src={left ? Icons.ChevronLeft : Icons.ChevronRight}
                alt="Move right"
                className={css({
                    height: '10px',
                    width: 'auto',
                })}
            />
        </button>
    );
};

const Carousel: React.FC<Props> = ({ children, className }): JSX.Element => {
    return (
        <div>
            <MultiCarousel
                containerClass={className}
                arrows
                responsive={responsive}
                removeArrowOnDeviceType={['tablet', 'mobile']}
                customLeftArrow={<CustomArrow left />}
                customRightArrow={<CustomArrow />}
            >
                {children}
            </MultiCarousel>
        </div>
    );
};

export default Carousel;
