import {
    ColDef,
    GridApi,
    ICellRendererParams,
    IDatasource,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { IconButton } from '@fluentui/react';
import { useTransactionsGetter } from '../api/hooks/useTransactionsGetter';

/**
 * listingId: string;
    user: string;
    address?: string;
    date: Date;
    quantity: number;
 */

const TextCellRenderer = (props: {
    params: ICellRendererParams;
}): JSX.Element => {
    const { params } = props;
    const { value } = params;
    const [css] = useStyletron();

    return (
        <div
            className={css({
                display: 'inline',
                alignItems: 'center',
                userSelect: 'text',
                height: '100%',
                textOverflow: 'ellipsis',
                width: '100%',
                overflow: 'hidden',
            })}
        >
            {value}
        </div>
    );
};

const colDefs: ColDef[] = [
    {
        field: 'id',
        editable: false,
        resizable: true,
        type: 'text',
        cellRenderer: (params: ICellRendererParams) => (
            <TextCellRenderer params={params} />
        ),
    },
    {
        field: 'user',
        resizable: true,
        type: 'text',
        editable: false,
        cellRenderer: (params: ICellRendererParams) => (
            <TextCellRenderer params={params} />
        ),
    },
    {
        field: 'date',
        editable: false,
        resizable: true,
        type: 'date',
        cellRenderer: (params: ICellRendererParams) => (
            <TextCellRenderer params={params} />
        ),
    },
    {
        field: 'quantity',
        initialWidth: 120,
        resizable: true,
        type: 'number',
        editable: false,
        cellRenderer: (params: ICellRendererParams) => (
            <TextCellRenderer params={params} />
        ),
    },
    {
        field: 'address',
        type: 'text',
        resizable: true,
        editable: false,
        initialWidth: 400,
        cellRenderer: (params: ICellRendererParams) => (
            <TextCellRenderer params={params} />
        ),
    },
];

export const TransactionGrid = ({
    listingId,
}: {
    listingId?: string;
}): JSX.Element => {
    const [api, setApi] = React.useState<GridApi>();
    const transactionsGetter = useTransactionsGetter();
    const [css] = useStyletron();

    const infiniteDatasource = React.useMemo((): IDatasource => {
        return {
            getRows: (params): void => {
                const { startRow, endRow, successCallback, failCallback } =
                    params;

                const offset = startRow;
                const pageSize = (endRow ?? 100) - (startRow ?? 0);

                transactionsGetter(undefined, listingId, offset, pageSize)
                    .then((r) => {
                        successCallback(r.results || [], r.numRecords);
                    })
                    .catch(failCallback);
            },
        };
    }, [listingId, transactionsGetter]);

    if (!listingId) return <div>No Listing Specified</div>;

    return (
        <div className={css({ height: '100%', position: 'relative' })}>
            <IconButton
                className={css({
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    zIndex: 100,
                    backgroundColor: 'white',
                })}
                iconProps={{ iconName: 'Download' }}
                onClick={(): void => api?.exportDataAsCsv()}
            />
            <AgGridReact
                className="ag-theme-alpine"
                columnDefs={colDefs}
                datasource={infiniteDatasource}
                rowModelType="infinite"
                onGridReady={(params): void => setApi(params.api)}
            />
        </div>
    );
};

export default TransactionGrid;
