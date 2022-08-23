import React from 'react';
import { useStyletron } from 'styletron-react';
import { Button, ButtonType, Header, Icons, MOBILE } from '@gac/shared-v2';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';
import XPIconLarge from '../assets/png/xp-icon-large.png';

export const ConnectDiscord = (): JSX.Element => {
    const [css] = useStyletron();
    const { discordUrl, openseaUrl, twitterUrl } = useGamingApeContext();

    return (
        <div
            className={css({
                maxWidth: '555px',
                textAlign: 'center',

                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                justifyContent: 'center',
                alignItems: 'center',
            })}
        >
            <div>
                <img
                    src={XPIconLarge}
                    alt="GAC XP"
                    className={css({
                        height: '246px',
                        width: '246px',
                        objectFit: 'contain',
                    })}
                />
            </div>

            <Header
                title="Connect your discord"
                subtitle="And Track your engagement"
                className={css({})}
            />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a
                efficitur neque, vitae molestie nisi. Suspendis consectetur
                adipiscing elit. Nam a efficit adipiscing elit adipiscing elit.
            </p>
            <Button
                icon={Icons.ETHWhite}
                themeType={ButtonType.primary}
                className={css({
                    [MOBILE]: {
                        flex: '1',
                        textAlign: 'center',
                        marginLeft: 'unset',
                        marginTop: '24px',
                        display: 'flex',
                        justifyContent: 'center',
                    },
                })}
                text="Connect Wallet"
                // onClick={(): void => setWalletModalOpen(true)}
            />
        </div>
    );
};

export default ConnectDiscord;
