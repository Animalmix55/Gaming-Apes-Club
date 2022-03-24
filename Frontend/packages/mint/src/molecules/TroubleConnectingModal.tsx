import { Icon, Modal, Spinner, TextField } from '@fluentui/react';
import { GlowButton, useThemeContext } from '@gac/shared';
import React, { useState } from 'react';
import { useStyletron } from 'styletron-react';
import Web3 from 'web3';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';
import { useWhitelisted } from '../hooks/useWhitelisted';

interface Props {
    isOpen?: boolean;
    onClose?: () => void;
}

export const TroubleConnectingModal = ({
    isOpen,
    onClose,
}: Props): JSX.Element => {
    const theme = useThemeContext();
    const { tokenAddress, etherscanUrl } = useGamingApeContext();
    const [css] = useStyletron();

    const [address, setAddress] = useState('');
    const {
        isLoading,
        isError,
        data: whitelistResponse,
    } = useWhitelisted(address);

    return (
        <Modal
            onDismiss={onClose}
            closeButtonAriaLabel="Close"
            isOpen={isOpen}
            styles={{
                main: {
                    background: theme.backgroundGradients.purpleBlue,
                    display: 'flex',
                    color: theme.fontColors.light.toRgbaString(),
                },
                scrollableContent: { padding: '15px' },
            }}
        >
            <div
                className={css({
                    maxWidth: '600px',
                })}
            >
                <div className={css({ display: 'flex' })}>
                    <GlowButton
                        className={css({ marginLeft: 'auto' })}
                        onClick={onClose}
                    >
                        Close
                    </GlowButton>
                </div>
                <div>
                    <div
                        className={css({
                            fontWeight: 'bold',
                            color: theme.fontColors.accent.toRgbaString(),
                            fontSize: '18px',
                        })}
                    >
                        Whitelist Mint On Contract
                    </div>
                    <div>
                        <ol>
                            <li>
                                <div>
                                    Get the merkle proof that you are
                                    whitelisted.
                                </div>
                                <div>
                                    {isLoading && <Spinner />}
                                    <TextField
                                        onChange={(_, v): void =>
                                            setAddress(v || '')
                                        }
                                        errorMessage={(():
                                            | string
                                            | undefined => {
                                            if (!Web3.utils.isAddress(address))
                                                return 'Invalid address';

                                            if (isError)
                                                return 'Failed to load';
                                            if (
                                                !whitelistResponse?.isWhitelisted
                                            )
                                                return 'Not whitelisted';

                                            return undefined;
                                        })()}
                                        placeholder="Enter wallet address used to mint"
                                    />
                                    {whitelistResponse &&
                                        whitelistResponse.proof && (
                                            <div
                                                className={css({
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    margin: '10px',
                                                    justifyContent: 'center',
                                                })}
                                            >
                                                <div
                                                    className={css({
                                                        fontWeight: 'bold',
                                                        marginRight: '10px',
                                                        color: theme.fontColors.accent.toRgbaString(),
                                                    })}
                                                >
                                                    Proof:
                                                </div>
                                                <div
                                                    className={css({
                                                        maxWidth: '200px',
                                                        overflow: 'auto',
                                                        color: theme.fontColors.dark.toRgbaString(),
                                                        padding: '4px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        background:
                                                            theme.backgroundColor.light.toRgbaString(),
                                                    })}
                                                >
                                                    {whitelistResponse.proof.join(
                                                        ','
                                                    )}
                                                </div>
                                                <GlowButton
                                                    className={css({
                                                        marginLeft: '5px',
                                                        alignSelf: 'stretch',
                                                    })}
                                                    onClick={(): Promise<void> =>
                                                        navigator.clipboard.writeText(
                                                            whitelistResponse.proof?.join(
                                                                ','
                                                            ) || ''
                                                        )
                                                    }
                                                >
                                                    <Icon iconName="ClipboardList" />
                                                </GlowButton>
                                            </div>
                                        )}
                                </div>
                            </li>
                            <li>
                                Go to{' '}
                                <a
                                    className={css({
                                        color: theme.fontColors.accent.toRgbaString(),
                                    })}
                                    href={`${etherscanUrl}/address/${tokenAddress}#writeContract`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Our Contract on Etherscan
                                </a>
                            </li>
                            <li>Navigate to Contract -&gt; Write Contract</li>
                            <li>
                                Click &quot;Connect to Web3&quot;. If you are
                                using Coinbase Wallet,{' '}
                                <b>still select MetaMask</b>
                            </li>
                            <li>Expand &quot;5. Premint&quot;</li>
                            <li>
                                Populate the fields. Make payableAmount the
                                value to send in ETH (mint price * quantity),
                                amount is the number to mint, and proof is the
                                value copied above.
                            </li>
                            <li>
                                Click &quot;Write&quot; and verify using your
                                client
                            </li>
                        </ol>
                    </div>
                </div>
                <div>
                    <div
                        className={css({
                            fontWeight: 'bold',
                            color: theme.fontColors.accent.toRgbaString(),
                            fontSize: '18px',
                        })}
                    >
                        Public Mint On Contract
                    </div>
                    <div>
                        <ol>
                            <li>
                                Go to{' '}
                                <a
                                    className={css({
                                        color: theme.fontColors.accent.toRgbaString(),
                                    })}
                                    href={`${etherscanUrl}/address/${tokenAddress}#writeContract`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Our Contract on Etherscan
                                </a>
                            </li>
                            <li>Navigate to Contract -&gt; Write Contract</li>
                            <li>
                                Click &quot;Connect to Web3&quot;. If you are
                                using Coinbase Wallet,{' '}
                                <b>still select MetaMask</b>
                            </li>
                            <li>Expand &quot;3. Mint&quot;</li>
                            <li>
                                Populate the fields. Make payableAmount the
                                value to send in ETH (mint price * quantity),
                                amount is the number to mint.
                            </li>
                            <li>
                                Click &quot;Write&quot; and verify using your
                                client
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default TroubleConnectingModal;
