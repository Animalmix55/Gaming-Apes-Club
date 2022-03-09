import { ComboBox, IComboBoxOption, Spinner } from '@fluentui/react';
import React from 'react';
import { useListings } from '../api/hooks/useListings';

export const ListingDropdown = ({
    selectedKey,
    onSelect,
    className,
}: {
    selectedKey?: string;
    onSelect?: (key?: string) => void;
    className?: string;
}): JSX.Element => {
    const {
        data: listings,
        isLoading,
        error,
    } = useListings(undefined, 10000, true);

    const options = React.useMemo((): IComboBoxOption[] => {
        if (!listings?.records) return [];

        return listings.records.map(
            (r): IComboBoxOption => ({
                data: r,
                text: r.title,
                key: r.id,
                id: r.id,
            })
        );
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
