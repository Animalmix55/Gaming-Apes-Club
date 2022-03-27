import { ComboBox, IComboBox, IComboBoxOption, Spinner } from '@fluentui/react';
import { useThemeContext } from '@gac/shared';
import React from 'react';
import { useRoles } from '../api/hooks/useRoles';

export const RolesDropdown = ({
    selectedKeys,
    onSelect,
    className,
    disabled,
    label,
}: {
    selectedKeys?: string[];
    disabled?: boolean;
    onSelect?: (keys: string[]) => void;
    className?: string;
    label?: string;
}): JSX.Element => {
    const { data: roles, isLoading, error } = useRoles();

    const theme = useThemeContext();

    const options = React.useMemo((): IComboBoxOption[] => {
        if (!roles) return [];

        return Object.keys(roles).map(
            (r): IComboBoxOption => ({
                text: roles[r],
                key: r,
                id: r,
            })
        );
    }, [roles]);

    const onSelectionChange = React.useCallback(
        (
            _: React.FormEvent<IComboBox>,
            option?: IComboBoxOption | undefined
        ) => {
            if (!option || !onSelect) return;
            const filteredKeys = selectedKeys?.filter((k) => !!roles?.[k]);

            if (!option.selected) {
                onSelect((filteredKeys || []).filter((v) => v !== option.key));
            } else {
                onSelect([...(filteredKeys || []), String(option.key)]);
            }
        },
        [onSelect, roles, selectedKeys]
    );

    return (
        <ComboBox
            className={className}
            selectedKey={selectedKeys}
            onChange={onSelectionChange}
            multiSelect
            label={label}
            disabled={disabled}
            options={options}
            styles={{
                optionsContainer: {
                    background: theme.backgroundGradients.purpleBlue,
                },
                input: {
                    color: `${theme.fontColors.dark.toRgbaString()} !important`,
                },
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
