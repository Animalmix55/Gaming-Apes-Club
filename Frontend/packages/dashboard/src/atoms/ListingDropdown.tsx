import {
    ComboBox,
    IComboBoxOption,
    SelectableOptionMenuItemType,
    Spinner,
} from '@fluentui/react';
import React from 'react';
import { useListings } from '../api/hooks/useListings';

export const ListingDropdown = ({
    selectedKey,
    onSelect,
    className,
    showDisabled,
    showInactive,
}: {
    selectedKey?: string;
    onSelect?: (key?: string) => void;
    className?: string;
    showDisabled?: boolean;
    showInactive?: boolean;
}): JSX.Element => {
    const {
        data: listings,
        isLoading,
        error,
    } = useListings(undefined, undefined, showDisabled, showInactive);

    const options = React.useMemo((): IComboBoxOption[] => {
        if (!listings?.records) return [];

        const sortedResults = listings.records.sort((a, b) => {
            if (!!a.disabled === !!b.disabled) return 0;
            if (a.disabled) return 1;
            return -1;
        });

        return listings.records.flatMap((r, i): IComboBoxOption[] => {
            const values: IComboBoxOption[] = [];
            if (r.disabled && !sortedResults[i - 1]?.disabled) {
                values.push({
                    itemType: SelectableOptionMenuItemType.Divider,
                    text: 'Disabled',
                    key: 'disabled-header-divider',
                });
                values.push({
                    itemType: SelectableOptionMenuItemType.Header,
                    text: 'Disabled',
                    key: 'disabled-header',
                });
            }

            values.push({
                data: r,
                text: r.title,
                key: r.id,
                id: r.id,
            });

            return values;
        });
    }, [listings]);

    return (
        <ComboBox
            className={className}
            selectedKey={selectedKey}
            onChange={(_, v): void => onSelect?.(v?.id)}
            options={options}
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
            placeholder="Select a Listing"
        />
    );
};

export default ListingDropdown;
