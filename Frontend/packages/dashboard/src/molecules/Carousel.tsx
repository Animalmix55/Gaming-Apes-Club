/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import {
    ClassNameBuilder,
    Icons,
    MOBILE,
    TABLET,
    useMatchMediaQuery,
} from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { DASHBOARD_PADDING, DASHBOARD_PADDING_TABLET } from '../common/styles';

export declare type ItemType = React.ReactElement<{
    /**
      Required. id for every item, should be unique
     */
    itemId: string;
}>;
interface Props {
    itemClassName?: string;
    separatorClassName?: string;
    scrollContainerClassName?: string;
    wrapperClassName?: string;
    children: ItemType | ItemType[];
    itemPaddingVertical?: number;
    itemPaddingHorizontal?: number;
    extendToEdges?: boolean;
}

const CustomArrow = ({ onClick, left = false }: any): JSX.Element => {
    const [css] = useStyletron();
    return (
        <button
            type="button"
            className={css({
                position: 'absolute',
                [left ? 'left' : 'right']: '15px',
                top: 'calc(50% - 15px)',

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

                zIndex: '1',
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

const LeftArrow = (): JSX.Element | null => {
    const { isFirstItemVisible, scrollPrev } =
        React.useContext(VisibilityContext);
    const isMobile = useMatchMediaQuery(MOBILE);

    if (isMobile || isFirstItemVisible) return null;

    return <CustomArrow onClick={(): unknown => scrollPrev()} left />;
};

const RightArrow = (): JSX.Element | null => {
    const { isLastItemVisible, scrollNext } =
        React.useContext(VisibilityContext);
    const isMobile = useMatchMediaQuery(MOBILE);

    if (isMobile || isLastItemVisible) return null;

    return <CustomArrow onClick={(): unknown => scrollNext()} />;
};

const extendedStyleWrapper = {
    marginInline: `-${DASHBOARD_PADDING}`,
    [TABLET]: {
        marginInline: `-${DASHBOARD_PADDING_TABLET}`,
    },
};

const extendedStyleScrollContainer = (horizontalPadding: number): any => ({
    paddingInline: `calc(${DASHBOARD_PADDING} - ${horizontalPadding}px)`,
    [TABLET]: {
        paddingInline: `calc(${DASHBOARD_PADDING_TABLET} - ${horizontalPadding}px)`,
    },
});

const Carousel = ({
    children,
    itemClassName,
    separatorClassName,
    scrollContainerClassName,
    wrapperClassName,
    itemPaddingVertical = 0,
    itemPaddingHorizontal = 0,
    extendToEdges = true,
}: Props): JSX.Element => {
    const [css] = useStyletron();

    return (
        <ScrollMenu
            itemClassName={ClassNameBuilder(
                itemClassName,
                css({
                    padding: `${itemPaddingVertical}px ${itemPaddingHorizontal}px`,
                })
            )}
            separatorClassName={separatorClassName}
            scrollContainerClassName={ClassNameBuilder(
                'hide-scrollbar',
                scrollContainerClassName,
                css({
                    ...(extendToEdges
                        ? extendedStyleScrollContainer(itemPaddingHorizontal)
                        : {}),
                })
            )}
            wrapperClassName={ClassNameBuilder(
                wrapperClassName,
                css({
                    position: 'relative',
                    ...(extendToEdges ? extendedStyleWrapper : {}),
                })
            )}
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
        >
            {children}
        </ScrollMenu>
    );
};

export default Carousel;
