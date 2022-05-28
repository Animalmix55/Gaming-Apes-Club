import { TooltipHost } from '@fluentui/react';
import {
    ClassNameBuilder,
    ERC721Attribute,
    Icons,
    useThemeContext,
} from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { DataBadge, AccentTextStyles } from './DataBadge';

interface TraitCellProps {
    trait: ERC721Attribute;
    className?: string;
}
const TraitCell = (props: TraitCellProps): JSX.Element => {
    const { trait, className } = props;
    const { trait_type, value } = trait;

    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    width: '93px',
                    padding: '16px 8px',
                    backgroundColor:
                        theme.backgroundPallette.light.toRgbaString(),
                    borderRadius: '12px',
                })
            )}
        >
            <DataBadge
                topText={trait_type}
                lowerElement={
                    <div
                        className={css({
                            ...AccentTextStyles(theme),
                            whiteSpace: 'nowrap',
                        })}
                    >
                        {value}
                    </div>
                }
            />
        </div>
    );
};

export interface TraitGridProps {
    className?: string;
    traits: ERC721Attribute[];
    maxDisplay?: number;
}

export const TraitGrid = (props: TraitGridProps): JSX.Element => {
    const { className, traits, maxDisplay } = props;
    const [css] = useStyletron();
    const theme = useThemeContext();

    const slicedTraits = React.useMemo(
        () => (maxDisplay ? traits.slice(0, maxDisplay) : traits),
        [traits, maxDisplay]
    );

    const ref = React.useRef<HTMLDivElement>(null);

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    maxWidth: '100%',
                    overflow: 'hidden',
                })
            )}
        >
            <div
                ref={ref}
                className={css({
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 'calc(100% + 16px)',
                    transform: 'translateX(-8px)',
                })}
            >
                {slicedTraits.map((trait) => (
                    <TraitCell
                        key={trait.trait_type}
                        trait={trait}
                        className={css({ margin: '8px' })}
                    />
                ))}
            </div>
            {maxDisplay && maxDisplay < traits.length && (
                <div
                    className={css({
                        marginTop: '16px',
                        font: theme.font,
                        color: theme.foregroundPallette.white.toRgbaString(),
                        fontWeight: 700,
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    })}
                >
                    <div>+{traits.length - maxDisplay} more traits</div>
                    <TooltipHost
                        content={<TraitGrid traits={traits} />}
                        calloutProps={{
                            styles: {
                                calloutMain: {
                                    borderRadius: '12px !important',
                                    backgroundColor: `${theme.backgroundPallette.dark.toRgbaString()} !important`,
                                },
                                beakCurtain: {
                                    backgroundColor: `${theme.backgroundPallette.dark.toRgbaString()} !important`,
                                    borderRadius: '12px !important',
                                },
                                beak: {
                                    backgroundColor: `${theme.backgroundPallette.dark.toRgbaString()} !important`,
                                },
                            },
                        }}
                        tooltipProps={{
                            className: css({
                                minWidth: ref.current?.clientWidth
                                    ? `${ref.current.clientWidth + 10}px`
                                    : undefined,
                                borderRadius: '12px !important',
                                backgroundColor: `${theme.backgroundPallette.dark.toRgbaString()} !important`,
                            }),
                        }}
                    >
                        <img
                            src={Icons.Info}
                            alt="Info"
                            className={css({
                                marginLeft: '12px',
                                height: '22px',
                                width: 'auto',
                            })}
                        />
                    </TooltipHost>
                </div>
            )}
        </div>
    );
};
