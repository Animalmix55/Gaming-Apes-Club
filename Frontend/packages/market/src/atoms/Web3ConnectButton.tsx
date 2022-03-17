import { Spinner, SpinnerSize } from '@fluentui/react';
import {
    Chain,
    ClassNameBuilder,
    useProvider,
    useThemeContext,
    Web3ConnectModalManual,
} from '@gac/shared';
import React from 'react';
import { useStyletron } from 'styletron-react';
import EthLogo from '../assets/png/eth-diamond-rainbow.png';

export const Web3ConnectButton = ({
    className,
    connectModalOpen,
    setConnectModalOpen,
}: {
    className?: string;
    connectModalOpen: boolean;
    setConnectModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();
    const { accounts, disconnect } = useProvider();

    React.useEffect(() => {
        if (connectModalOpen && accounts) setConnectModalOpen(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accounts]);

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                })
            )}
        >
            <div
                className={css({
                    fontFamily: theme.fonts.headers,
                    fontWeight: '900',
                    color: theme.fontColors.light.toRgbaString(),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '5px',
                })}
            >
                <img
                    className={css({
                        height: '1.5em',
                        width: 'auto',
                        marginRight: '5px',
                    })}
                    src={EthLogo}
                    alt="Discord"
                />
                <div>Web3</div>
            </div>
            <button
                type="button"
                className={css({
                    backgroundColor: theme.pallette.discordBlue.toRgbaString(),
                    border: '1px solid transparent',
                    borderRadius: '2px',
                    color: theme.fontColors.light.toRgbaString(),
                    fontFamily: theme.fonts.headers,
                    fontWeight: '900',
                    padding: '0px 8px 0px 8px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    minWidth: '120px',
                    minHeight: '28px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ':hover': {
                        border: `1px solid ${theme.fontColors.light.toRgbaString()}`,
                        backgroundColor:
                            theme.pallette.discordBlue.toRgbaString(0.9),
                    },
                })}
                onClick={(): void =>
                    !accounts ? setConnectModalOpen(true) : disconnect?.()
                }
            >
                {!connectModalOpen ? (
                    <span>{accounts ? 'Disconnect' : 'Connect'}</span>
                ) : (
                    <Spinner
                        className={css({ padding: '4px' })}
                        size={SpinnerSize.small}
                    />
                )}
                <Web3ConnectModalManual
                    onClose={(): void => setConnectModalOpen(false)}
                    isOpen={!!connectModalOpen}
                    expectedChainId={Chain.Mainnet}
                />
            </button>
        </div>
    );
};

export default Web3ConnectButton;
