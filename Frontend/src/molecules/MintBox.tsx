import { Spinner } from '@fluentui/react';
import React from 'react';
import { useStyletron } from 'styletron-react';
import GlowButton from '../atoms/GlowButton';
import { useProvider } from '../contexts/ProviderContext';
import { useThemeContext } from '../contexts/ThemeContext';
import useCurrentTime from '../hooks/useCurrentTime';
import useMintTimes from '../hooks/useMintTimes';
import useWhitelisted from '../hooks/useWhitelisted';
import FormatTimeOffset from '../utilties/TimeFormatter';

export const MintBox = (): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    const { accounts } = useProvider();

    const currentTime = useCurrentTime();
    const { public: publicMint, private: privateMint } = useMintTimes(60);
    const { start: publicStart } = publicMint;
    const { start: privateStart, end: privateEnd } = privateMint;

    const { isWhitelisted } = useWhitelisted(accounts?.[0]);

    return (
        <div
            className={css({
                background: theme.backgroundGradients.purpleBlue,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                padding: '20px',
            })}
        >
            <GlowButton
                disabled={
                    !isWhitelisted ||
                    !privateStart ||
                    privateStart > currentTime ||
                    !privateEnd ||
                    privateEnd <= currentTime
                }
                className={css({ margin: '2px' })}
            >
                <div>
                    <div className={css({ fontSize: '150%' })}>
                        Whitelist Mint
                    </div>
                    {privateStart === undefined && <Spinner />}
                    {privateStart !== undefined && privateStart > currentTime && (
                        <div
                            className={css({
                                fontFamily: theme.fonts.body,
                                fontSize: '10px',
                            })}
                        >
                            {isWhitelisted
                                ? FormatTimeOffset(privateStart - currentTime)
                                : 'Not Eligible'}
                        </div>
                    )}
                    {privateEnd !== undefined && privateEnd < currentTime && (
                        <div
                            className={css({
                                fontFamily: theme.fonts.body,
                                fontSize: '10px',
                            })}
                        >
                            Ended
                        </div>
                    )}
                </div>
            </GlowButton>
            <GlowButton
                className={css({ margin: '2px' })}
                disabled={!publicStart || publicStart >= currentTime}
            >
                <div>
                    <div className={css({ fontSize: '150%' })}>Public Mint</div>
                    {publicStart === undefined && <Spinner />}
                    {publicStart !== undefined && publicStart > currentTime && (
                        <div
                            className={css({
                                fontFamily: theme.fonts.body,
                                fontSize: '10px',
                            })}
                        >
                            {FormatTimeOffset(publicStart - currentTime)}
                        </div>
                    )}
                </div>
            </GlowButton>
        </div>
    );
};

export default MintBox;
