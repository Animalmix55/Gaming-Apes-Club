import {
    ClassNameBuilder,
    CoverVideo,
    DisconnectButton,
    Header,
    useProvider,
    useThemeContext,
} from '@gac/shared';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { MintBox } from '../molecules/MintBox';
import { Web3ConnectModal } from '../molecules/Web3ConnectModal';
import BackgroundVideo from '../assets/webm/ComputerLights.webm';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';

export const MintPage = ({
    className,
}: {
    className?: string;
}): JSX.Element => {
    const { accounts } = useProvider();
    const { homeUrl, openseaUrl, twitterUrl, discordUrl } =
        useGamingApeContext();

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
            <Header
                supressHomeButton
                homeUrl={homeUrl}
                openseaUrl={openseaUrl}
                twitterUrl={twitterUrl}
                discordUrl={discordUrl}
            />
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
