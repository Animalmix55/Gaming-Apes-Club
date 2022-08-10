import { Spinner, SpinnerSize } from '@fluentui/react';
import { ClassNameBuilder, RequestResult } from '@gac/shared';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { GetListingResponse } from '../api/Requests';
import { ListingTile } from '../atoms/ListingTile';

interface Props {
    request: RequestResult<GetListingResponse>;
    onSelect?: (listingIndex: number) => void;
    className?: string;
    itemClass?: string;
}

export const ListingGrid = (props: Props): JSX.Element => {
    const { onSelect, className, request, itemClass } = props;
    const { data: listings, isError, isLoading } = request;

    const [css] = useStyletron();

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                })
            )}
        >
            {isError && <div>Error Loading</div>}
            {isLoading && <Spinner size={SpinnerSize.large} />}
            {listings?.records &&
                listings.records.map((r, i) => (
                    <ListingTile
                        key={r.id}
                        listing={r}
                        onClick={(): void => onSelect?.(i)}
                        className={ClassNameBuilder(
                            itemClass,
                            css({
                                margin: '12px',
                                boxSizing: 'border-box',
                            })
                        )}
                    />
                ))}
        </div>
    );
};

export default ListingGrid;
