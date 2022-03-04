import React from 'react';
import { useStyletron } from 'styletron-react';
import { DisconnectButton } from '../atoms/DisconnectButton';
import { useProvider } from '../contexts/ProviderContext';
import { useThemeContext } from '../contexts/ThemeContext';
import { Header } from '../molecules/Header';
import { MintBox } from '../molecules/MintBox';
import { Web3ConnectModal } from '../molecules/Web3ConnectModal';
import { ClassNameBuilder } from '../../../shared/src/utilties/ClassNameBuilder';

export const MintPage = ({
    className,
}: {
    className?: string;
}): JSX.Element => {
    const { accounts } = useProvider();

    const theme = useThemeContext();
    const [css] = useStyletron();

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    backgroundColor: theme.backgroundColor.dark.toRgbaString(),
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                    position: 'relative',
                })
            )}
        >
            <DisconnectButton
                className={css({
                    position: 'absolute',
                    left: '10px',
                    bottom: '10px',
                })}
            />
            <Web3ConnectModal />
            <Header />
            <div
                className={css({
                    flex: '1',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                })}
            >
                {accounts && <MintBox />}
            </div>
        </div>
    );
};

export default MintPage;
