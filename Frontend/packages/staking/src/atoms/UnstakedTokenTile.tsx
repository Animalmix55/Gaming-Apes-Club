import { Spinner, SpinnerSize } from '@fluentui/react';
import {
    ClassNameBuilder,
    useThemeContext,
    Button,
    useGamingApeClubTokenRank,
    ButtonType,
    useWeb3,
    HOVERABLE,
    Icons,
} from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useMetadata } from '../api/hooks/useMetadata';
import { useAppConfiguration } from '../contexts/AppConfigurationContext';
import { useTokenUri } from '../web3/hooks/useTokenUri';
import { AccentTextStyles, Fraction, DataBadge } from './DataBadge';
import { TraitGrid } from './TraitGrid';

export interface UnstakedTokenTileProps {
    contractAddress?: string;
    tokenId: string;
    className?: string;
    rank?: number;
    selected?: boolean;
    onSelect?: () => void;
}

export const UnstakedTokenTile = (
    props: UnstakedTokenTileProps
): JSX.Element => {
    const { contractAddress, tokenId, className, rank, selected, onSelect } =
        props;

    const { EthereumChainId } = useAppConfiguration();
    const { web3 } = useWeb3(EthereumChainId);

    const tokenUri = useTokenUri(web3, tokenId, contractAddress);
    const metadata = useMetadata(tokenUri.data);

    const [css] = useStyletron();
    const theme = useThemeContext();

    const containerClass = ClassNameBuilder(
        className,
        css({
            textAlign: 'center',
            width: '360px',
            padding: '16px',
            borderRadius: '20px',
            backgroundColor: theme.backgroundPallette.dark.toRgbaString(),
            color: theme.foregroundPallette.white.toRgbaString(),
            fontFamily: theme.font,
            [HOVERABLE]: {
                ':hover': {
                    boxShadow: theme.shadowPallette.rainbow,
                },
            },
        })
    );

    if (metadata.isError) {
        return (
            <div className={containerClass}>
                <div>No metadata found</div>
            </div>
        );
    }

    if (metadata.isLoading || !metadata.data) {
        return (
            <div className={containerClass}>
                <Spinner size={SpinnerSize.medium} />
            </div>
        );
    }

    const { data } = metadata;
    const { name, image } = data;

    const fractionClass = css({
        fontFamily: theme.font,
        fontWeight: 700,
        fontSize: '10px',
        color: `${theme.foregroundPallette.white.toRgbaString(0.6)} !important`,
    });

    return (
        <div className={ClassNameBuilder('staked-token-tile', containerClass)}>
            <div
                className={css({
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: '16px',
                })}
            >
                {selected && (
                    <div
                        className={ClassNameBuilder(
                            'selected-overlay',
                            css({
                                visibility: 'visible',
                                position: 'absolute',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                zIndex: 10,
                                borderRadius: '12px',
                                top: '0px',
                                bottom: '0px',
                                right: '0px',
                                left: '0px',
                                boxSizing: 'border-box',
                                padding: '16px',
                                backgroundColor:
                                    theme.backgroundPallette.darker.toRgbaString(),
                                backdropFilter: 'blur(40px)',
                            })
                        )}
                    >
                        <div>
                            <img
                                className={css({
                                    height: '32px',
                                    width: 'auto',
                                })}
                                src={Icons.CheckmarkCircle}
                                alt="Checkmark"
                            />
                        </div>
                        <div
                            className={css({
                                fontFamily: theme.font,
                                fontWeight: 700,
                                fontSize: '14px',
                                textAlign: 'center',
                            })}
                        >
                            Selected
                        </div>
                    </div>
                )}
                <img
                    className={css({
                        width: '100%',
                        height: 'auto',
                        borderRadius: '12px',
                        overflow: 'hidden',
                    })}
                    src={image}
                    alt={name}
                />
            </div>
            {rank !== undefined && (
                <div
                    className={css({
                        fontFamily: theme.font,
                        color: theme.foregroundPallette.white.toRgbaString(),
                        fontWeight: 700,
                        fontSize: '10px',
                        borderRadius: '12px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor:
                            theme.backgroundPallette.light.toRgbaString(),
                        padding: '8px',
                        marginBottom: '24px',
                    })}
                >
                    <DataBadge
                        topText="Overall Rank"
                        lowerElement={
                            <Fraction
                                left={rank}
                                right={6550}
                                className={fractionClass}
                                slashClassName={fractionClass}
                                leftClassName={css(AccentTextStyles(theme))}
                            />
                        }
                    />
                </div>
            )}
            <div className={css({ display: 'flex', alignItems: 'center' })}>
                <div
                    className={css({
                        fontFamily: theme.font,
                        fontWeight: 900,
                        color: theme.foregroundPallette.white.toRgbaString(),
                        fontSize: '24px',
                        textAlign: 'left',
                        marginRight: '26px',
                    })}
                >
                    {name}
                </div>
                <Button
                    className={css({
                        marginLeft: 'auto',
                        whiteSpace: 'nowrap',
                    })}
                    themeType={ButtonType.primary}
                    text={selected ? 'Deselect ape' : 'Select ape'}
                    onClick={onSelect}
                />
            </div>
            <TraitGrid
                className={css({ marginTop: '8px' })}
                maxDisplay={6}
                traits={metadata.data.attributes}
            />
        </div>
    );
};

export const UnstakedApeTile = (
    props: Omit<Omit<UnstakedTokenTileProps, 'rank'>, 'contract'>
): JSX.Element => {
    const { tokenId } = props;

    const { GamingApeClubAddress } = useAppConfiguration();
    const rank = useGamingApeClubTokenRank(tokenId);

    return (
        <UnstakedTokenTile
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            contractAddress={GamingApeClubAddress}
            rank={rank}
        />
    );
};

export default UnstakedTokenTile;
