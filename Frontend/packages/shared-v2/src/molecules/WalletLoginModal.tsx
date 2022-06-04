import React from 'react';
import { useStyletron } from 'styletron-react';
import {
    MetaMaskButton,
    WalletConnectButton,
    WalletLinkButton,
} from '../atoms/ConnectButton';
import { Modal } from '../atoms/Modal';
import CoinInHand from '../assets/png/misc/Giving Back 1.png';
import { useThemeContext } from '../contexts/ThemeContext';
import { MOBILE } from '../utilties';
import { Chain } from '../models/Chain';

interface WalletLoginModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    chainId?: Chain;
    invalidChain?: boolean;
}

export const WalletLoginModal = (props: WalletLoginModalProps): JSX.Element => {
    const { isOpen, onClose, chainId, invalidChain } = props;

    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            modalClass={css({ width: '90%', maxWidth: '400px' })}
        >
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    justifyContent: 'center',
                })}
            >
                <img
                    src={CoinInHand}
                    className={css({
                        [MOBILE]: {
                            display: 'none',
                        },
                        left: '0px',
                        height: '80px',
                        width: 'auto',
                        position: 'absolute',
                    })}
                    alt="Connect"
                />
                <div
                    className={css({
                        textTransform: 'uppercase',
                        fontFamily: theme.font,
                        fontWeight: 900,
                        fontStyle: 'italic',
                        fontSize: '28px',
                    })}
                >
                    <div
                        className={css({
                            color: theme.foregroundPallette.primary.toRgbaString(),
                        })}
                    >
                        Connect
                    </div>
                    <div>A Wallet</div>
                </div>
            </div>
            <div
                className={css({
                    borderTop: '1px solid #FFFFFF',
                    opacity: 0.1,
                    margin: '16px 0px',
                })}
            />
            <div>
                <MetaMaskButton
                    className={css({
                        width: '100%',
                        justifyContent: 'flex-start !important',
                        marginBottom: '6px',
                    })}
                    requiredChainId={chainId}
                    invalidChain={invalidChain}
                />
                <WalletLinkButton
                    className={css({
                        width: '100%',
                        justifyContent: 'flex-start !important',
                        marginBottom: '6px',
                    })}
                    invalidChain={invalidChain}
                    requiredChainId={chainId}
                />
                <WalletConnectButton
                    className={css({
                        width: '100%',
                        justifyContent: 'flex-start !important',
                    })}
                    requiredChainId={chainId}
                    invalidChain={invalidChain}
                />
            </div>
        </Modal>
    );
};

export default WalletLoginModal;
