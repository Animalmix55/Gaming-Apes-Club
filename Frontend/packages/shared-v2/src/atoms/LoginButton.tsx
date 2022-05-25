import React from 'react';
import { useStyletron } from 'styletron-react';
import { useThemeContext } from '../contexts/ThemeContext';
import { ClassNameBuilder } from '../utilties';
import { Icons } from '../utilties/Icons';
import { SidebarButton } from './SidebarButton';

export interface LoginButtonProps {
    active?: boolean;
    onClick?: () => void;
    className?: string;
}

export const LoginButton = (props: LoginButtonProps): JSX.Element => {
    const { active, onClick, className } = props;

    const [css] = useStyletron();
    const theme = useThemeContext();

    const loginClass = React.useMemo(() => {
        return css({
            backgroundColor: active
                ? theme.buttonPallette.primary.toRgbaString()
                : theme.buttonPallette.inactive.toRgbaString(),
        });
    }, [
        active,
        css,
        theme.buttonPallette.inactive,
        theme.buttonPallette.primary,
    ]);

    return (
        <SidebarButton
            text=""
            icon={Icons.ETHWhite}
            collapsed
            className={ClassNameBuilder(className, loginClass)}
            onClick={onClick}
        />
    );
};

export default LoginButton;
