import { getId } from '@fluentui/react';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useThemeContext } from '../contexts/ThemeContext';
import { ClassNameBuilder } from '../utilties';

export interface TextInputProps {
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
    label?: string;
    type?: React.HTMLInputTypeAttribute;
}

export const TextInput = (props: TextInputProps): JSX.Element => {
    const { value, onChange, disabled, className, type, label } = props;
    const id = React.useRef(getId('text_input'));

    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    fontFamily: theme.font,
                    padding: '10px 16px',
                    boxSizing: 'border-box',
                    borderRadius: '15px',
                    backgroundColor:
                        theme.backgroundPallette.dark.toRgbaString(),
                })
            )}
        >
            {label && (
                <label
                    className={css({
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: theme.foregroundPallette.white.toRgbaString(0.5),
                    })}
                    htmlFor={id.current}
                >
                    {label}
                </label>
            )}
            <input
                id={id.current}
                type={type}
                value={value}
                className={css({
                    display: 'block',
                    backgroundColor: 'transparent',
                    fontWeight: 500,
                    fontSize: '15px',
                    outline: 'unset',
                    border: 'unset',
                    width: '100%',
                    color: theme.foregroundPallette.white.toRgbaString(),
                })}
                onChange={(e): void => onChange?.(e.target.value)}
                disabled={disabled}
            />
        </div>
    );
};

export default TextInput;
