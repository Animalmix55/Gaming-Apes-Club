import { getId, Spinner } from '@fluentui/react';
import { ClassNameBuilder } from '@gac/shared';
import { ButtonType, CheckableButton, Header, Modal } from '@gac/shared-v2';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useStyletron } from 'styletron-react';
import { useTransactionsGetter } from '../api/hooks/useTransactionsGetter';
import { GuildMember } from '../api/Models/GuildMember';
import { Transaction } from '../api/Models/Transaction';
import { HistoryTile } from '../atoms/HistoryTile';
import { useAuthorizationContext } from '../contexts/AuthorizationContext';

export interface HistoryModalProps {
    isOpen?: boolean;
    bodyClass?: string;
    onClose?: () => void;
}

export const HistoryModal = (props: HistoryModalProps): JSX.Element => {
    const { isOpen, bodyClass, onClose } = props;

    const { claims } = useAuthorizationContext();
    const { id: userId } = claims || {};

    const fetcher = useTransactionsGetter(true);
    const [onlyMine, setOnlyMine] = React.useState(false);
    const [numRecords, setNumRecords] = React.useState<number>();
    const [users, setUsers] = React.useState<Record<string, GuildMember>>({});
    const [items, setItems] = React.useState<Transaction[]>([]);
    const numLoaded = React.useRef(0);
    const [css] = useStyletron();

    React.useEffect(() => {
        setNumRecords(undefined);
        setItems([]);
        numLoaded.current = 0;
        setUsers({});
    }, [onlyMine, isOpen]);

    const loadMore = React.useCallback(() => {
        const offset = numLoaded.current;

        const request = (): void => {
            fetcher(
                onlyMine && userId ? userId : undefined,
                undefined,
                offset,
                50
            )
                .then((r) => {
                    const { results, numRecords, users } = r;

                    if (numRecords != null) setNumRecords(numRecords);
                    if (results) {
                        setItems((i) => [...i, ...results]);
                        numLoaded.current += results.length;
                    }
                    if (users) setUsers((u) => ({ ...u, ...users }));
                })
                .catch(() => setTimeout(request, 1000));
        };

        request();
    }, [fetcher, onlyMine, userId]);

    React.useEffect(() => {
        if (numRecords == null && isOpen) loadMore();
    }, [numRecords, loadMore, isOpen]); // initial load

    const hasMore = numRecords == null || numRecords !== items.length;
    const scrollContainerId = React.useRef(getId());

    React.useEffect(() => {
        if (!claims) setOnlyMine(false);
    }, [claims]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div
                className={ClassNameBuilder(
                    bodyClass,
                    css({
                        maxHeight: '70vh',
                        width: '90vw',
                        maxWidth: '830px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    })
                )}
            >
                <Header
                    title="The Shack"
                    subtitle="Purchase History"
                    className={css({ marginBottom: '24px' })}
                />
                {claims && (
                    <div>
                        <CheckableButton
                            text="Only Mine"
                            onClick={(): void => setOnlyMine((m) => !m)}
                            themeType={ButtonType.primary}
                            checked={onlyMine}
                            className={css({ marginBottom: '10px' })}
                        />
                    </div>
                )}
                {numRecords == null && <Spinner />}
                {numRecords != null && (
                    <div
                        id={scrollContainerId.current}
                        className={css({ flex: '1', overflow: 'auto' })}
                    >
                        <InfiniteScroll
                            hasMore={hasMore}
                            className={css({ overflow: 'hidden !important' })}
                            scrollableTarget={scrollContainerId.current}
                            dataLength={items.length}
                            next={loadMore}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>No More Results</b>
                                </p>
                            }
                            loader={<Spinner />}
                        >
                            {items.map((tx) => (
                                <HistoryTile
                                    key={tx.id}
                                    transaction={tx}
                                    user={users[tx.user]}
                                />
                            ))}
                        </InfiniteScroll>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default HistoryModal;
