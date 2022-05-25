import React from 'react';
import { useStyletron } from 'styletron-react';
import GACLogo from '../assets/png/logo/GAC.png';
import Button from '../atoms/Button';
import { LoginButton } from '../atoms/LoginButton';
import { SidebarButton } from '../atoms/SidebarButton';
import { useThemeContext } from '../contexts/ThemeContext';
import { ClassNameBuilder } from '../utilties';
import Icons from '../utilties/Icons';

export interface SidebarItem<T = never> {
    id: string;
    displayText: string;
    icon: string;
    data?: T;
}

export interface SidebarProps<T = never> {
    items: SidebarItem<T>[];
    onSelectButton?: (item: SidebarItem<T>) => void;
    selectedId?: string;
    expanded?: boolean;
    className?: string;
    onLogin?: () => void;
    loggedIn?: boolean;
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

export const Sidebar = (props: SidebarProps): JSX.Element => {
    const {
        items,
        onSelectButton,
        selectedId,
        className,
        expanded,
        onLogin,
        loggedIn,
        onDisordClick,
        onOpenSeaClick,
        onTwitterClick,
    } = props;

    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
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
                        onClick={(): void => onSelectButton?.(b)}
                        icon={b.icon}
                        text={b.displayText}
                        collapsed={!expanded}
                        selected={selectedId === b.id}
                    />
                </div>
            ))}
            <LoginButton
                className={css({ marginTop: 'auto' })}
                active={!loggedIn}
                onClick={onLogin}
            />
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
    );
};

export default Sidebar;
