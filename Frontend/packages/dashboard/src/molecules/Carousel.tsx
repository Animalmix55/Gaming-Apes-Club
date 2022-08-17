/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import { Icons } from '@gac/shared-v2';
import React, { useMemo } from 'react';
import MultiCarousel from 'react-multi-carousel';
import { useStyletron } from 'styletron-react';

interface Props {
    className?: string;
    items?: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
    };
}

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

const Carousel: React.FC<Props> = ({
    children,
    className,
    items,
}): JSX.Element => {
    const [css] = useStyletron();
    const responsive = useMemo(
        () => ({
            xxl: {
                breakpoint: { max: 4000, min: 1536 },
                items: items?.xxl ?? 5,
                slidesToSlide: items?.xxl ?? 5, // optional, default to 1.
            },
            xl: {
                breakpoint: { max: 1536, min: 1280 },
                items: items?.xl ?? 4,
                slidesToSlide: items?.xl ?? 4, // optional, default to 1.
            },
            lg: {
                breakpoint: { max: 1280, min: 1024 },
                items: items?.lg ?? 3,
                slidesToSlide: items?.lg ?? 3, // optional, default to 1.
            },
            md: {
                breakpoint: { max: 1024, min: 768 },
                items: items?.md ?? 2,
                slidesToSlide: items?.md ?? 2, // optional, default to 1.
            },
            sm: {
                breakpoint: { max: 768, min: 640 },
                items: items?.sm ?? 1,
                slidesToSlide: items?.sm ?? 1, // optional, default to 1.
            },
            xs: {
                breakpoint: { max: 480, min: 0 },
                items: items?.xs ?? 1,
                slidesToSlide: items?.xs ?? 1, // optional, default to 1.
            },
        }),
        [items]
    );

    return (
        <div>
            <MultiCarousel
                containerClass={className}
                arrows
                responsive={responsive}
                removeArrowOnDeviceType={['xs', 'sm', 'md']}
                customLeftArrow={<CustomArrow left />}
                customRightArrow={<CustomArrow />}
            >
                {children}
            </MultiCarousel>
        </div>
    );
};

export default Carousel;
