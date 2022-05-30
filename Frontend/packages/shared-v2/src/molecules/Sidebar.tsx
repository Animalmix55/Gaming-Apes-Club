/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useStyletron } from 'styletron-react';
import GACLogo from '../assets/png/logo/GAC.png';
import { ButtonType, Button } from '../atoms/Button';
import { LoginButton } from '../atoms/LoginButton';
import { SidebarButton } from '../atoms/SidebarButton';
import { useWeb3 } from '../contexts/Web3Context';
import { useThemeContext } from '../contexts/ThemeContext';
import { ClassNameBuilder, MOBILE } from '../utilties';
import { Icons } from '../utilties/Icons';
import { WalletLoginModal } from './WalletLoginModal';

export interface SidebarItem<T = never> {
    id: string;
    displayText: string;
    icon: string;
    disabled?: boolean;
    data?: T;
}

export interface SidebarProps<T = never> {
    items: SidebarItem<T>[];
    onSelectButton?: (item: SidebarItem<T>) => void;
    selectedId?: string;
    className?: string;
    onTwitterClick?: () => void;
    onDisordClick?: () => void;
    onOpenSeaClick?: () => void;
}

const SocialIconButton = ({
    icon,
    onClick,
    className,
}: {
    icon: string;
    onClick: () => void;
    className?: string;
}): JSX.Element => {
    const [css] = useStyletron();

    return (
        <Button
            className={ClassNameBuilder(
                className,
                css({ padding: 'unset !important' })
            )}
            onClick={onClick}
            icon={icon}
        />
    );
};

const MobileSidebar = (props: SidebarProps): JSX.Element => {
    const { items, onSelectButton, selectedId } = props;

    const { accounts } = useWeb3();
    const [css] = useStyletron();
    const theme = useThemeContext();

    const address = accounts?.[0];
    const [loginModalOpen, setLoginModalOpen] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxSizing: 'border-box',
                position: 'fixed',
                top: 0,
                zIndex: 100,
                width: '100%',
                maxHeight: '100%',
                padding: '8px 24px',
                backgroundColor: theme.backgroundPallette.darker.toRgbaString(),
                backdropFilter: 'blur(40px)',
            })}
        >
            <div className={css({ display: 'flex', alignItems: 'center' })}>
                <Button
                    icon={expanded ? Icons.Close : Icons.Burger}
                    onClick={(): void => setExpanded((e) => !e)}
                    iconClass={css({
                        height: '40px !important',
                        width: 'auto',
                    })}
                    className={css({
                        padding: 'unset !important',
                    })}
                />
                <img
                    src={GACLogo}
                    alt="Gaming Ape Club"
                    className={css({
                        height: '42px',
                        width: 'auto',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                    })}
                />
                <LoginButton
                    active={!address}
                    onClick={(): void => setLoginModalOpen(true)}
                />
                <WalletLoginModal
                    onClose={(): void => setLoginModalOpen(false)}
                    isOpen={loginModalOpen}
                />
            </div>
            {expanded && (
                <div className={css({ overflow: 'auto', width: '100%' })}>
                    {items.map((b) => (
                        <div key={b.id}>
                            <SidebarButton
                                disabled={b.disabled}
                                onClick={(): void => onSelectButton?.(b)}
                                icon={b.icon}
                                text={b.displayText}
                                className={css({ margin: '20px 0px' })}
                                selected={selectedId === b.id}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const Sidebar = (props: SidebarProps): JSX.Element => {
    const {
        items,
        onSelectButton,
        selectedId,
        className,
        onDisordClick,
        onOpenSeaClick,
        onTwitterClick,
    } = props;

    const [css] = useStyletron();
    const theme = useThemeContext();
    const { accounts } = useWeb3();
    const address = accounts?.[0];

    const [loginModalOpen, setLoginModalOpen] = React.useState(false);

    return (
        <>
            <div
                className={css({
                    display: 'none',
                    [MOBILE]: { display: 'block' },
                })}
            >
                <MobileSidebar {...props} />
            </div>
            <div
                className={ClassNameBuilder(
                    className,
                    css({
                        backgroundColor:
                            theme.backgroundPallette.darker.toRgbaString(),
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '48px 24px 24px 24px',
                        width: '128px',
                        boxSizing: 'border-box',
                        [MOBILE]: {
                            display: 'none',
                        },
                    })
                )}
            >
                <div className={css({ marginBottom: '46px' })}>
                    <img
                        className={css({ height: 'auto', width: '83px' })}
                        src={GACLogo}
                        alt="Gaming Ape Club"
                    />
                </div>
                {items.map((b) => (
                    <div key={b.id}>
                        <SidebarButton
                            disabled={b.disabled}
                            onClick={(): void => onSelectButton?.(b)}
                            icon={b.icon}
                            themeType={ButtonType.primary}
                            text={b.displayText}
                            collapsed
                            className={css({ margin: '4px' })}
                            selected={selectedId === b.id}
                        />
                    </div>
                ))}
                <div
                    className={css({
                        marginTop: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    })}
                >
                    <div
                        className={css({
                            fontFamily: theme.font,
                            fontWeight: 600,
                            fontSize: '14px',
                            marginBottom: '16px',
                            color: theme.foregroundPallette.white.toRgbaString(),
                        })}
                    >
                        {!!address &&
                            `${address.slice(0, 5)}...${address.slice(
                                address.length - 4
                            )}`}
                    </div>
                    <LoginButton
                        active={!address}
                        onClick={(): void => setLoginModalOpen(true)}
                    />
                    <WalletLoginModal
                        onClose={(): void => setLoginModalOpen(false)}
                        isOpen={loginModalOpen}
                    />
                </div>
                <div className={css({ display: 'flex', marginTop: '24px' })}>
                    {onTwitterClick && (
                        <SocialIconButton
                            className={css({ marginRight: '8px' })}
                            icon={Icons.TwitterRound}
                            onClick={onTwitterClick}
                        />
                    )}
                    {onDisordClick && (
                        <SocialIconButton
                            className={css({
                                marginRight: onOpenSeaClick ? '8px' : undefined,
                            })}
                            icon={Icons.DiscordRound}
                            onClick={onDisordClick}
                        />
                    )}
                    {onOpenSeaClick && (
                        <SocialIconButton
                            icon={Icons.OpenSeaRound}
                            onClick={onOpenSeaClick}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
