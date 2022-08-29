import { Spinner, SpinnerSize } from '@fluentui/react';
import {
    Button,
    ButtonType,
    Header,
    MOBILE,
    useMatchMediaQuery,
    useThemeContext,
} from '@gac/shared-v2';
import React, { useMemo, useRef, useState } from 'react';
import { useStyletron } from 'styletron-react';
import { useTransactions } from '../api/hooks/useTransactions';
import TransactionList, { TransactionListItem } from './TransactionList';

const ITEMS_PER_PAGE = 20;
const ITEMS_PER_PAGE_MOBILE = 10;

interface Props {
    isLoading?: boolean;
    isError?: boolean;
    transactions?: TransactionListItem[];
}

export const PurchaseHistorySection = ({
    isLoading,
    isError,
    transactions,
}: Props): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();
    const ref = useRef<HTMLDivElement | null>(null);

    const [page, setPage] = useState(0);

    const isMobile = useMatchMediaQuery(MOBILE);
    const pageSize = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE;
    const maxPages = Math.floor((transactions ?? []).length / pageSize);

    const paginatedTransaction = useMemo(() => {
        const start = page * pageSize;
        const end = start + pageSize;
        return (transactions ?? []).slice(start, end);
    }, [page, pageSize, transactions]);

    const scrollToListTop = (): void => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section
            className={css({
                padding: '24px',
                borderRadius: '20px',
                backgroundColor: theme.backgroundPallette.dark.toRgbaString(),

                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
            })}
            ref={ref}
        >
            <Header title="My purchase" subtitle="history" />
            {isLoading && (
                <div
                    className={css({
                        height: '200px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    })}
                >
                    <Spinner size={SpinnerSize.large} />
                </div>
            )}

            {!isLoading && isError && (
                <p
                    className={css({
                        height: '200px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    })}
                >
                    Failed to fetch transactions
                </p>
            )}

            {transactions && (
                <>
                    <TransactionList transactions={paginatedTransaction} />
                    {maxPages > 1 && (
                        <div
                            className={css({
                                display: 'flex',
                                gap: '16px',
                                justifyContent: 'center',
                                alignItems: 'center',
                            })}
                        >
                            <Button
                                text="Previous"
                                themeType={ButtonType.primary}
                                disabled={page === 0}
                                onClick={(): void => {
                                    scrollToListTop();
                                    setPage(page - 1);
                                }}
                                className={css({
                                    width: '7em',
                                })}
                            />
                            <Button
                                text="Next"
                                themeType={ButtonType.primary}
                                disabled={page === maxPages - 1}
                                onClick={(): void => {
                                    scrollToListTop();
                                    setPage(page + 1);
                                }}
                                className={css({
                                    width: '7em',
                                    textAlign: 'center',
                                })}
                            />
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default PurchaseHistorySection;
