import { BigNumber } from '@ethersproject/bignumber';
import { Spinner, SpinnerSize } from '@fluentui/react';
import {
    ClassNameBuilder,
    MOBILE,
    Modal,
    useThemeContext,
    useWeb3,
} from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { Fraction, TokenDisplay } from '../atoms/DataBadge';
import { useAppConfiguration } from '../contexts/AppConfigurationContext';
import { useRewardByAmount } from '../hooks/useRewardByAmount';
import { useTokensStaked } from '../web3/hooks/useTokensStaked';
import { BlockchainReward } from '../web3/Requests';

const ROWSPERCOLUMN = 9;

export interface TiersModalProps {
    isOpen?: boolean;
    onClose?: () => void;
}

interface Tier {
    amount: number;
    index: number;
    tokenYield: BigNumber;
}

const TierTile = ({
    tier,
    selected,
    className,
}: {
    tier: Tier;
    selected?: boolean;
    className?: string;
}): JSX.Element => {
    const { amount, index, tokenYield } = tier;
    const [css] = useStyletron();
    const theme = useThemeContext();

    const fractionClass = css({
        fontFamily: theme.font,
        fontWeight: 700,
        fontSize: '10px',
        display: 'flex',
        alignItems: 'center',
        color: `${theme.foregroundPallette.white.toRgbaString(0.6)} !important`,
    });

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    display: 'flex',
                    fontFamily: theme.font,
                    color: theme.foregroundPallette.white.toRgbaString(),
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    padding: '12px',
                    backgroundColor: selected
                        ? theme.backgroundPallette.darker.toRgbaString()
                        : undefined,
                    borderRadius: '12px',
                    [MOBILE]: {
                        width: '100%',
                    },
                })
            )}
        >
            <div className={css({ marginRight: 'auto' })}>
                <div className={css({ fontWeight: 900, fontSize: '14px' })}>
                    Tier {index}
                </div>
                <div
                    className={css({
                        fontWeight: 600,
                        fontSize: '12px',
                        opacity: 0.5,
                        whiteSpace: 'nowrap',
                    })}
                >
                    {amount}x GAC NFT
                </div>
            </div>
            <div className={css({ marginLeft: '20px' })}>
                <Fraction
                    left={<TokenDisplay amount={tokenYield} />}
                    right="day"
                    className={fractionClass}
                    slashClassName={fractionClass}
                />
            </div>
        </div>
    );
};

export const TiersModal = (props: TiersModalProps): JSX.Element => {
    const { isOpen, onClose } = props;
    const [css] = useStyletron();
    const theme = useThemeContext();
    const { EthereumChainId } = useAppConfiguration();
    const { accounts } = useWeb3(EthereumChainId);

    const userStake = useTokensStaked(accounts?.[0]);
    const { currentTier, tiers } = useRewardByAmount(userStake.data?.length);

    const columns = React.useMemo(() => {
        const result: BlockchainReward[][] = [];

        if (!tiers.data) return result;
        tiers.data.forEach((tier, i) => {
            const column = Math.floor(i / ROWSPERCOLUMN);

            if (!result[column]) result[column] = [];
            result[column].push(tier);
        });

        return result;
    }, [tiers.data]);

    const yieldPerTier = React.useMemo(() => {
        const { data } = tiers;
        if (!data) return undefined;

        return data.map((tier) => {
            return data.reduce((reward, innerTier): BigNumber => {
                if (innerTier.amount <= tier.amount) {
                    return reward.add(innerTier.reward);
                }
                return reward;
            }, BigNumber.from(0));
        });
    }, [tiers]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            modalClass={css({
                backgroundColor: `${theme.backgroundPallette.dark.toRgbaString()} !important`,
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
            })}
        >
            <div
                className={css({
                    fontWeight: 900,
                    fontSize: '18px',
                    marginBottom: '22px',
                })}
            >
                Staking Tiers
            </div>
            {tiers.isLoading && <Spinner size={SpinnerSize.medium} />}
            {tiers.isError && <div>An error occurred</div>}
            {columns && (
                <div
                    className={css({
                        backgroundColor:
                            theme.backgroundPallette.light.toRgbaString(),
                        borderRadius: '12px',
                        overflow: 'auto',
                        padding: '12px',
                        justifyContent: 'space-between',
                        display: 'flex',
                        flexWrap: 'wrap',
                        boxSizing: 'border-box',
                        flex: 1,
                        [MOBILE]: {
                            width: 'unset',
                            display: 'block',
                        },
                    })}
                >
                    {columns.map((column, colIndex) => (
                        <div
                            // eslint-disable-next-line react/no-array-index-key
                            key={colIndex}
                            className={css({
                                marginRight:
                                    colIndex !== columns.length - 1
                                        ? '25px'
                                        : undefined,
                            })}
                        >
                            {column.map((tier, index) => (
                                <TierTile
                                    key={tier.amount}
                                    tier={{
                                        tokenYield:
                                            yieldPerTier?.[
                                                colIndex * ROWSPERCOLUMN + index
                                            ] ?? BigNumber.from(0),
                                        amount: tier.amount,
                                        index:
                                            colIndex * ROWSPERCOLUMN +
                                            index +
                                            1,
                                    }}
                                    selected={tier === currentTier}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </Modal>
    );
};

export default TiersModal;
