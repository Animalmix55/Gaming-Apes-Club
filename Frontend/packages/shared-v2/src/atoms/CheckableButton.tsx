import React from 'react';
import { useStyletron } from 'styletron-react';
import { Button, ButtonType } from './Button';
import CheckboxEmpty from '../assets/png/symbol/Checkbox empty.png';
import CheckboxFilled from '../assets/png/symbol/Checkbox filled.png';
import { ClassNameBuilder } from '../utilties';

export interface CheckableButtonProps {
    text: string;
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    themeType?: ButtonType;
    onClick?: () => void;
}

export const CheckableButton = (props: CheckableButtonProps): JSX.Element => {
    const { text, checked, onClick, className, disabled, themeType } = props;

    const [css] = useStyletron();

    return (
        <Button
            type="button"
            text={text}
            iconClass={css({ marginRight: '12px !important' })}
            themeType={themeType}
            icon={checked ? CheckboxFilled : CheckboxEmpty}
            className={ClassNameBuilder(
                css({ padding: '10px 16px 10px 10px !important' }),
                className
            )}
            disabled={disabled}
            onClick={onClick}
        />
    );
};

export default CheckableButton;
