import { TextField } from '@fluentui/react';
import { GlowButton } from '@gac/shared';
import {
    Modal,
    useERC20Balance,
    useThemeContext,
    useWeb3,
} from '@gac/shared-v2';
import { BigNumber } from 'ethers';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useGACXPMigrator } from '../api/hooks/useGACXPMigrator';
import { LocalBalanceWidget } from '../atoms/BalanceWidgetLocal';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';

export interface MigrateGACXPModalProps {
    isOpen?: boolean;
    onClose: () => void;
}

export const MigrateGACXPModal = (
    props: MigrateGACXPModalProps
): JSX.Element => {
    const { isOpen, onClose } = props;

    const [css] = useStyletron();
    const theme = useThemeContext();
    const { provider, accounts } = useWeb3();
    const { gacXPAddress } = useGamingApeContext();
    const account = accounts?.[0];

    const balance = useERC20Balance(account, provider, gacXPAddress);
    const integerBalance = React.useMemo(
        () => balance.data?.div(String(10 ** 18)).toNumber(),
        [balance]
    );

    const [amount, setAmount] = React.useState(0);
    React.useEffect(() => {
        if (integerBalance !== undefined) setAmount(integerBalance);
    }, [integerBalance]);

    const mutator = useGACXPMigrator();

    return (
        <Modal
            isOpen={isOpen}
            onClose={mutator.isLoading ? undefined : onClose}
            modalClass={css({
                fontFamily: theme.font,
                color: theme.foregroundPallette.white.toRgbaString(),
                maxWidth: '400px',
            })}
        >
            <div className={css({ fontWeight: 900, fontSize: '30px' })}>
                Migrate Your GACXP
            </div>
            <div
                className={css({
                    fontWeight: 600,
                    fontSize: '14px',
                    margin: '10px 0px 20px 0px',
                })}
            >
                Staking allows users to accrue GACXP on Polygon. To use on-chain
                GACXP in the Shack it must be converted off-chain here.
            </div>
            <div
                className={css({
                    fontWeight: 900,
                    fontSize: '20px',
                    marginBottom: '10px',
                    color: theme.foregroundPallette.accent.toRgbaString(),
                })}
            >
                Current On-Chain Balance
            </div>
            <div>
                <LocalBalanceWidget
                    balance={balance.data ?? 0}
                    isLoading={balance.isLoading}
                />
                <TextField
                    className={css({ marginTop: '10px' })}
                    label="Conversion Amount"
                    type="number"
                    styles={{
                        root: {
                            '.ms-Label': {
                                color: theme.foregroundPallette.white.toRgbaString(),
                                fontFamily: theme.font,
                            },
                        },
                    }}
                    max={integerBalance ?? 0}
                    min={0}
                    step={1}
                    value={String(amount)}
                    placeholder="Amount to convert"
                    disabled={!integerBalance || mutator.isLoading}
                    onChange={(_, newValue): void => {
                        setAmount(Math.round(Number(newValue ?? 0)));
                    }}
                />
                <GlowButton
                    disabled={
                        !integerBalance || mutator.isLoading || amount === 0
                    }
                    className={css({
                        marginTop: '10px',
                        height: '60px',
                        width: '100%',
                        justifyContent: 'center',
                    })}
                    onClick={(): void =>
                        mutator.mutate([
                            BigNumber.from(amount).mul(String(10 ** 18)),
                        ])
                    }
                >
                    {mutator.isLoading
                        ? 'Converting...'
                        : `Convert ${amount} GACXP`}
                </GlowButton>
            </div>
        </Modal>
    );
};

export default MigrateGACXPModal;
