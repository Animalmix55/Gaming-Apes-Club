import {
    useThemeContext,
    ClassNameBuilder,
    HexagonContainer,
} from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';

export interface ImageWithBadgeProps {
    image: string;
    alt?: string;
    badgeImage?: string;
    className?: string;
    imageClass?: string;
    badgeClass?: string;
}

export const ImageWithBadge = (props: ImageWithBadgeProps): JSX.Element => {
    const { image, badgeImage, alt, className, imageClass, badgeClass } = props;

    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({ width: '80px', height: '80px', position: 'relative' })
            )}
        >
            <div
                className={css({
                    height: '100%',
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: '12px',
                })}
            >
                <img
                    className={ClassNameBuilder(
                        imageClass,
                        css({
                            height: '100%',
                            width: 'auto',
                        })
                    )}
                    src={image}
                    alt={alt}
                />
            </div>
            {badgeImage && (
                <HexagonContainer
                    width={50}
                    className={ClassNameBuilder(
                        badgeClass,
                        css({
                            position: 'absolute',
                            bottom: '-8px',
                            right: '-36px',
                        })
                    )}
                    innerClassName={css({
                        display: 'flex',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        alignItems: 'center',
                        backgroundColor:
                            theme.backgroundPallette.light.toRgbaString(),
                    })}
                >
                    <div className={css({ transform: 'translateX(2px)' })}>
                        <HexagonContainer
                            innerClassName={css({
                                display: 'flex',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                alignItems: 'center',
                            })}
                        >
                            <img
                                src={badgeImage}
                                className={css({
                                    height: '120%',
                                    width: 'auto',
                                })}
                                alt={alt}
                            />
                        </HexagonContainer>
                    </div>
                </HexagonContainer>
            )}
        </div>
    );
};

export default ImageWithBadge;
