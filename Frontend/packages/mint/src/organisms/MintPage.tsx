import { ClassNameBuilder, useProvider, useThemeContext } from '@gac/shared';
import React from 'react';
import { useStyletron } from 'styletron-react';
import ReactPlayer from 'react-player';
import { DisconnectButton } from '../atoms/DisconnectButton';
import { Header } from '../molecules/Header';
import { MintBox } from '../molecules/MintBox';
import { Web3ConnectModal } from '../molecules/Web3ConnectModal';
import BackgroundVideo from '../assets/webm/ComputerLights.webm';
import CoverVideo from '../atoms/CoverVideo';

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
                    backgroundColor:
                        theme.backgroundColor.dark.toRgbaString(0.8),
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                    position: 'relative',
                })
            )}
        >
            <CoverVideo
                url={BackgroundVideo}
                aspectRatio={1.777777}
                className={css({ zIndex: -1 })}
                autoplay
                loop
            />
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
