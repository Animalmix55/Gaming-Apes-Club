import {
    Button,
    ButtonType,
    ClassNameBuilder,
    useThemeContext,
    useWeb3,
} from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useAppConfiguration } from '../contexts/AppConfigurationContext';
import { useStakingContext } from '../contexts/StakingContext';
import { StakingModal } from '../molecules/StakingModal';
import { UnstakingModal } from '../molecules/UnstakingModal';
import { useStaker } from '../web3/hooks/useStaker';
import { useTokensHeld } from '../web3/hooks/useTokensHeld';
import { useTokensStaked } from '../web3/hooks/useTokensStaked';
import { useUnstaker } from '../web3/hooks/useUnstaker';

export interface BasketProps {
    className?: string;
}

export const NumberDisplay = ({
    number,
    className,
}: {
    number: number;
    className?: string;
}): JSX.Element => {
    const theme = useThemeContext();
    const [css] = useStyletron();

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    color: theme.foregroundPallette.white.toRgbaString(),
                    backgroundColor:
                        theme.foregroundPallette.primary.toRgbaString(),
                    fontWeight: 900,
                    fontStyle: 'italic',
                    fontSize: '20px',
                    height: '48px',
                    width: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                })
            )}
        >
            {number}
        </div>
    );
};

export const Basket = (props: BasketProps): JSX.Element | null => {
    const { className } = props;

    const { GamingApeClubAddress, EthereumChainId } = useAppConfiguration();
    const {
        setTokenIdsToUnstake,
        setTokenIdsToStake,
        tokenIdsToStake,
        tokenIdsToUnstake,
    } = useStakingContext();
    const { accounts, web3 } = useWeb3(EthereumChainId);
    const account = accounts?.[0];

    const { data: stakedApes } = useTokensStaked(account);
    const { data: unstakedApes } = useTokensHeld(
        web3,
        account,
        GamingApeClubAddress
    );

    React.useEffect(() => {
        setTokenIdsToStake((t) =>
            t.filter((item) => unstakedApes?.includes(item))
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unstakedApes]);

    React.useEffect(() => {
        setTokenIdsToUnstake((t) =>
            t.filter((item) => stakedApes?.includes(item))
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stakedApes]);

    const staker = useStaker();
    const { txHash: stakingHash } = staker;

    const unstaker = useUnstaker();
    const { txHash: unstakingHash } = unstaker;

    const [showTxModal, setShowTxModal] = React.useState(false);
    const txHash = React.useMemo((): string | undefined => {
        if (tokenIdsToStake.length) return staker.txHash;
        if (tokenIdsToUnstake.length) return unstaker.txHash;

        return undefined;
    }, [
        staker.txHash,
        tokenIdsToStake.length,
        tokenIdsToUnstake.length,
        unstaker.txHash,
    ]);

    React.useEffect(() => {
        if (stakingHash || unstakingHash) {
            setShowTxModal(true);
        }
    }, [stakingHash, unstakingHash]);

    const [css] = useStyletron();
    const theme = useThemeContext();
    const bodyClass = ClassNameBuilder(
        className,
        css({
            borderRadius: '12px',
            backgroundColor: theme.backgroundPallette.light.toRgbaString(),
            color: theme.foregroundPallette.white.toRgbaString(),
            fontFamily: theme.font,
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
        })
    );

    let allSelected =
        unstakedApes && unstakedApes.length === tokenIdsToStake.length;

    if (tokenIdsToStake.length > 0) {
        return (
            <div className={bodyClass}>
                {showTxModal && txHash && (
                    <StakingModal
                        isOpen
                        transactionHash={txHash}
                        onClose={(): void => {
                            setTokenIdsToStake([]);
                            setShowTxModal(false);
                        }}
                    />
                )}
                <NumberDisplay number={tokenIdsToStake.length} />
                <div className={css({ margin: '0px 8px 0px 16px' })}>
                    <div
                        className={css({
                            fontFamily: theme.font,
                            fontWeight: 900,
                            color: theme.foregroundPallette.white.toRgbaString(),
                            fontStyle: 'italic',
                            fontSize: '20px',
                            textTransform: 'uppercase',
                        })}
                    >
                        Apes Selected to be Staked
                    </div>
                    <div
                        className={css({
                            fontFamily: theme.font,
                            fontWeight: 600,
                            color: theme.foregroundPallette.white.toRgbaString(),
                            opacity: 0.5,
                            fontSize: '12px',
                        })}
                    >
                        Select more Apes to stake all at once!
                    </div>
                </div>
                <Button
                    text={allSelected ? 'Deselect all' : 'Select all'}
                    themeType={ButtonType.secondary}
                    className={css({ marginLeft: 'auto', marginRight: '10px' })}
                    disabled={!unstakedApes}
                    onClick={
                        unstakedApes && !allSelected
                            ? (): void => setTokenIdsToStake(unstakedApes)
                            : (): void => setTokenIdsToStake([])
                    }
                />
                <Button
                    text="Stake Apes"
                    themeType={ButtonType.error}
                    onClick={(): void => staker.mutate([tokenIdsToStake])}
                />
            </div>
        );
    }

    allSelected = stakedApes && stakedApes.length === tokenIdsToUnstake.length;

    if (tokenIdsToUnstake.length > 0) {
        return (
            <div className={bodyClass}>
                {showTxModal && txHash && (
                    <UnstakingModal
                        transactionHash={txHash}
                        isOpen
                        onClose={(): void => {
                            setTokenIdsToUnstake([]);
                            setShowTxModal(false);
                        }}
                    />
                )}
                <NumberDisplay number={tokenIdsToUnstake.length} />
                <div className={css({ margin: '0px 8px 0px 16px' })}>
                    <div
                        className={css({
                            fontFamily: theme.font,
                            fontWeight: 900,
                            color: theme.foregroundPallette.white.toRgbaString(),
                            fontStyle: 'italic',
                            fontSize: '20px',
                            textTransform: 'uppercase',
                        })}
                    >
                        Apes Selected to be Unstaked
                    </div>
                    <div
                        className={css({
                            fontFamily: theme.font,
                            fontWeight: 600,
                            color: theme.foregroundPallette.white.toRgbaString(),
                            opacity: 0.5,
                            fontSize: '12px',
                        })}
                    >
                        Select more Apes to unstake all at once!
                    </div>
                </div>
                <Button
                    text={allSelected ? 'Deselect all' : 'Select all'}
                    themeType={ButtonType.secondary}
                    className={css({ marginLeft: 'auto', marginRight: '10px' })}
                    disabled={!stakedApes}
                    onClick={
                        stakedApes && !allSelected
                            ? (): void => setTokenIdsToUnstake(stakedApes)
                            : (): void => setTokenIdsToUnstake([])
                    }
                />
                <Button
                    text="Unstake Apes"
                    themeType={ButtonType.error}
                    onClick={(): void => unstaker.mutate([tokenIdsToUnstake])}
                />
            </div>
        );
    }

    return null;
};

export default Basket;