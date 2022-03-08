import { Spinner, SpinnerSize } from '@fluentui/react';
import { ClassNameBuilder } from '@gac/shared';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useListings } from '../api/hooks/useListings';
import { ListingWithCount } from '../api/Models/Listing';
import { ListingTile } from '../atoms/ListingTile';

interface Props {
    onSelect?: (listing: ListingWithCount) => void;
    className?: string;
}

export const ListingGrid = (props: Props): JSX.Element => {
    const { onSelect, className } = props;
    const { data: listings, isError, isLoading } = useListings();

    const [css] = useStyletron();

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'auto',
                    flexWrap: 'wrap',
                })
            )}
        >
            {isError && <div>Error Loading</div>}
            {isLoading && <Spinner size={SpinnerSize.large} />}
            {listings?.records &&
                listings.records.map((r) => (
                    <ListingTile
                        key={r.id}
                        listing={r}
                        onClick={onSelect}
                        className={css({ margin: '10px' })}
                    />
                ))}
        </div>
    );
};

export default ListingGrid;
