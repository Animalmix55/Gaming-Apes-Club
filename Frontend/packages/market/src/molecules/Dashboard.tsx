import {
    Button,
    useWeb3,
    WalletLoginModal,
    DataBadge,
    TokenDisplay,
    DividedDashboard,
    ButtonType,
    useMatchMediaQuery,
    MOBILE,
} from '@gac/shared-v2';
import PolygonLogo from '@gac/shared-v2/lib/assets/svg/PolygonTransparent.svg';
import HistoryIcon from '@gac/shared-v2/lib/assets/svg/Buyhistory.svg';
import ETHLogo from '@gac/shared-v2/lib/assets/png/symbol/ETH White.png';
import DiscordLogo from '@gac/shared-v2/lib/assets/png/action/Discord.png';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useBalance } from '../api/hooks/useBalance';
import { useAuthorizationContext } from '../contexts/AuthorizationContext';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';
import { MigrateGACXPModal } from './MigrateGACXPModal';
import { useLogin } from '../api/hooks/useLogin';
import { HistoryModal } from './HistoryModal';

export interface DashboardProps {
    className?: string;
    additionalItems?: React.ReactNode[];
}

export const Dashboard = (props: DashboardProps): JSX.Element => {
    const { className, additionalItems } = props;
    const { chainId } = useGamingApeContext();
    const { claims } = useAuthorizationContext();
    const discordId = claims?.id;

    const isMobile = useMatchMediaQuery(MOBILE);
    const [loginModalOpen, setLoginModalOpen] = React.useState(false);
    const [migrateModalOpen, setMigrateModalOpen] = React.useState(false);
    const [historyModalOpen, setHistoryModalOpen] = React.useState(false);

    const xpBalance = useBalance(discordId);
    const { accounts } = useWeb3(chainId);
    const { login, isLoggingIn } = useLogin();

    const account = accounts?.[0];
    const [css] = useStyletron();

    return (
        <DividedDashboard className={className}>
            <>
                <WalletLoginModal
                    chainId={chainId}
                    isOpen={loginModalOpen}
                    onClose={(): void => setLoginModalOpen(false)}
                />
                <MigrateGACXPModal
                    isOpen={migrateModalOpen}
                    onClose={(): void => setMigrateModalOpen(false)}
                />
                <HistoryModal
                    isOpen={historyModalOpen}
                    onClose={(): void => setHistoryModalOpen(false)}
                />
                {discordId && (
                    <DataBadge
                        topText="XP Balance"
                        isLoading={xpBalance.isLoading}
                        lowerElement={
                            <TokenDisplay amount={xpBalance.data ?? 0} />
                        }
                        className={css({
                            padding: '0 16px',
                        })}
                    />
                )}
                {!discordId && (
                    <Button
                        themeType={ButtonType.primary}
                        text={isMobile ? undefined : 'Discord'}
                        icon={DiscordLogo}
                        className={css({
                            marginRight: account ? '16px' : undefined,
                        })}
                        onClick={login}
                        disabled={isLoggingIn}
                    />
                )}
                {!account && !isMobile && (
                    <Button
                        themeType={ButtonType.primary}
                        text="Web3"
                        className={css({
                            marginLeft: discordId ? undefined : '16px',
                            marginRight: '16px',
                        })}
                        icon={ETHLogo}
                        onClick={(): void => setLoginModalOpen(true)}
                        disabled={isLoggingIn}
                    />
                )}
                <div
                    className={css({
                        [MOBILE]: { marginRight: 'auto', display: 'block' },
                        display: 'none',
                    })}
                />
            </>
            <>
                {account && (
                    <Button
                        themeType={ButtonType.secondary}
                        text={isMobile ? undefined : 'Migrate XP'}
                        className={css({ marginLeft: '16px' })}
                        onClick={(): void => setMigrateModalOpen(true)}
                        icon={PolygonLogo}
                    />
                )}
                <Button
                    text={isMobile ? undefined : 'History'}
                    className={css({
                        marginLeft: '16px',
                    })}
                    icon={HistoryIcon}
                    themeType={ButtonType.secondary}
                    onClick={(): void => setHistoryModalOpen(true)}
                />
                {additionalItems ?? []}
            </>
        </DividedDashboard>
    );
};

export default Dashboard;
