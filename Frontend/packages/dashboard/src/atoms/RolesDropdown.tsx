import { ComboBox, IComboBox, IComboBoxOption, Spinner } from '@fluentui/react';
import { Button, ButtonType, useThemeContext } from '@gac/shared-v2';
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
                        color: `${theme.foregroundPallette.accent.toRgbaString()} !important`,
                    },
                    rootHovered: {
                        backgroundColor: `${theme.backgroundPallette.dark.toRgbaString(
                            0.4
                        )} !important`,
                    },
                    rootFocused: {
                        backgroundColor: `${theme.backgroundPallette.dark.toRgbaString(
                            0.7
                        )} !important`,
                    },
                    rootChecked: {
                        backgroundColor: `${theme.backgroundPallette.dark.toRgbaString(
                            0.7
                        )} !important`,
                        color: `${theme.foregroundPallette.white.toRgbaString()} !important`,
                    },
                },
            })
        );
    }, [
        roles,
        theme.backgroundPallette.dark,
        theme.foregroundPallette.accent,
        theme.foregroundPallette.white,
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
                    background: theme.backgroundPallette.light.toRgbaString(),
                    '.ms-Callout-main': {
                        background: 'unset',
                    },
                },
                input: {
                    color: `${theme.foregroundPallette.black.toRgbaString()} !important`,
                },
            }}
            onRenderLowerContent={(): React.ReactElement => {
                if (!onClear) return <></>;
                return (
                    <Button
                        themeType={ButtonType.primary}
                        onClick={onClear}
                        className={css({
                            width: '100%',
                            justifyContent: 'center',
                        })}
                        type="button"
                        text="Clear"
                    />
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
