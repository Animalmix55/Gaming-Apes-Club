import { Spinner, SpinnerSize } from '@fluentui/react';
import {
    ClassNameBuilder,
    useThemeContext,
    Button,
    useGamingApeClubTokenRank,
    ButtonType,
    useGamingApeClubContract,
    useWeb3,
    HOVERABLE,
    Icons,
} from '@gac/shared-v2';
import { IERC721Metadata } from '@gac/shared-v2/lib/models/IERC721Metadata';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useMetadata } from '../api/hooks/useMetadata';
import { useAppConfiguration } from '../contexts/AppConfigurationContext';
import { useTokenUri } from '../web3/hooks/useTokenUri';

export interface StakedTokenTileProps {
    contract: IERC721Metadata;
    tokenId: string;
    className?: string;
    rank?: number;
    selected?: boolean;
    onSelect?: () => void;
    onUnstake?: () => void;
}

export const StakedTokenTile = (props: StakedTokenTileProps): JSX.Element => {
    const {
        contract,
        tokenId,
        className,
        rank,
        selected,
        onSelect,
        onUnstake,
    } = props;

    const tokenUri = useTokenUri(tokenId, contract);
    const metadata = useMetadata(tokenUri.data);

    const [css] = useStyletron();
    const theme = useThemeContext();

    const containerClass = ClassNameBuilder(
        className,
        css({
            textAlign: 'center',
            width: '264px',
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

    return (
        <div className={ClassNameBuilder('staked-token-tile', containerClass)}>
            <div
                className={css({
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: '12px',
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
                <div
                    className={ClassNameBuilder(
                        'image-overlay',
                        css({
                            visibility: 'hidden',
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
                    <Button
                        text="Unstake"
                        onClick={onUnstake}
                        disabled={!onUnstake}
                        className={css({
                            width: '100%',
                            marginBottom: '16px',
                            justifyContent: 'center',
                        })}
                        themeType={ButtonType.primary}
                    />
                    <Button
                        onClick={onSelect}
                        disabled={!onSelect}
                        text={selected ? 'Unselect' : 'Select'}
                        className={css({
                            width: '100%',
                            justifyContent: 'center',
                        })}
                        themeType={ButtonType.primary}
                    />
                </div>
                {rank !== undefined && (
                    <div
                        className={css({
                            position: 'absolute',
                            right: '16px',
                            zIndex: 1,
                            top: '16px',
                            padding: '2px 8px',
                            backgroundColor: 'rgb(79, 79, 79)',
                            fontFamily: theme.font,
                            color: theme.foregroundPallette.white.toRgbaString(),
                            fontWeight: 700,
                            fontSize: '10px',
                            borderRadius: '8px',
                        })}
                    >
                        Rank {rank}
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
            <div
                className={css({
                    color: theme.foregroundPallette.white.toRgbaString(),
                    fontFamily: theme.font,
                    fontWeight: 800,
                    fontSize: '16px',
                    width: '100%',
                    textAlign: 'center',
                })}
            >
                {name}
            </div>
        </div>
    );
};

export const StakedApeTile = (
    props: Omit<Omit<StakedTokenTileProps, 'rank'>, 'contract'>
): JSX.Element => {
    const { tokenId } = props;

    const { GamingApeClubAddress } = useAppConfiguration();
    const { web3 } = useWeb3();
    const contract = useGamingApeClubContract(web3, GamingApeClubAddress);
    const rank = useGamingApeClubTokenRank(tokenId);

    if (!contract) return <></>;

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <StakedTokenTile {...props} contract={contract} rank={rank} />;
};

export default StakedTokenTile;
