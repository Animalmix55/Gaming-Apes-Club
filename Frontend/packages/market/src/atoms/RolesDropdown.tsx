import { ComboBox, IComboBox, IComboBoxOption, Spinner } from '@fluentui/react';
import { GlowButton, useThemeContext } from '@gac/shared';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useRoles } from '../api/hooks/useRoles';

export const RolesDropdown = ({
    selectedKeys,
    onSelect,
    className,
    disabled,
    label,
    multiSelect,
    onClear,
}: {
    selectedKeys?: string[];
    disabled?: boolean;
    onSelect?: (keys: string[]) => void;
    className?: string;
    label?: string;
    multiSelect?: boolean;
    onClear?: () => void;
}): JSX.Element => {
    const { data: roles, isLoading, error } = useRoles();

    const theme = useThemeContext();
    const [css] = useStyletron();

    const options = React.useMemo((): IComboBoxOption[] => {
        if (!roles) return [];

        return Object.keys(roles).map(
            (r): IComboBoxOption => ({
                text: roles[r],
                key: r,
                id: r,
                styles: {
                    root: {
                        color: `${theme.fontColors.accent.toRgbaString()} !important`,
                    },
                    rootHovered: {
                        backgroundColor: `${theme.backgroundColor.dark.toRgbaString(
                            0.4
                        )} !important`,
                    },
                    rootFocused: {
                        backgroundColor: `${theme.backgroundColor.dark.toRgbaString(
                            0.7
                        )} !important`,
                    },
                    rootChecked: {
                        backgroundColor: `${theme.backgroundColor.dark.toRgbaString(
                            0.7
                        )} !important`,
                        color: `${theme.fontColors.light.toRgbaString()} !important`,
                    },
                },
            })
        );
    }, [
        roles,
        theme.backgroundColor.dark,
        theme.fontColors.accent,
        theme.fontColors.light,
    ]);

    const onSelectionChange = React.useCallback(
        (
            _: React.FormEvent<IComboBox>,
            option?: IComboBoxOption | undefined
        ) => {
            if (!option || !onSelect) return;
            const filteredKeys = selectedKeys?.filter((k) => !!roles?.[k]);

            if (!multiSelect) {
                onSelect(option ? [String(option.key)] : []);
            } else if (!option.selected) {
                onSelect((filteredKeys || []).filter((v) => v !== option.key));
            } else {
                onSelect([...(filteredKeys || []), String(option.key)]);
            }
        },
        [multiSelect, onSelect, roles, selectedKeys]
    );

    return (
        <ComboBox
            className={className}
            selectedKey={selectedKeys}
            onChange={onSelectionChange}
            multiSelect={multiSelect}
            label={label}
            disabled={disabled}
            options={options}
            styles={{
                callout: {
                    background: theme.backgroundGradients.purpleBlue,
                    '.ms-Callout-main': {
                        background: 'unset',
                    },
                },
                input: {
                    color: `${theme.fontColors.dark.toRgbaString()} !important`,
                },
            }}
            onRenderLowerContent={(): React.ReactElement => {
                if (!onClear) return <></>;
                return (
                    <GlowButton
                        onClick={onClear}
                        className={css({ height: '80px', width: '100%' })}
                        type="button"
                    >
                        Clear
                    </GlowButton>
                );
            }}
            onRenderUpperContent={(): React.ReactElement => {
                if (isLoading) return <Spinner />;
                if (error) return <div>Error</div>;
                return <></>;
            }}
            errorMessage={
                error
                    ? String((error as { message: string }).message)
                    : undefined
            }
            placeholder="Select roles"
        />
    );
};

export default RolesDropdown;
