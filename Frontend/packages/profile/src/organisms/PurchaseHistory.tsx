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
import TransactionList from '../molecules/TransactionList';

const ITEMS_PER_PAGE = 20;
const ITEMS_PER_PAGE_MOBILE = 10;

interface Props {
    discordId: string | undefined;
}

export const PurchaseHistory = ({ discordId }: Props): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();
    const ref = useRef<HTMLDivElement | null>(null);

    const [page, setPage] = useState(0);
    const {
        data: transactions,
        isLoading,
        isError,
    } = useTransactions(discordId, 0, 500);

    const isMobile = useMatchMediaQuery(MOBILE);
    const pageSize = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE;
    const maxPages = Math.floor(
        (transactions?.results ?? []).length / pageSize
    );

    const paginatedTransaction = useMemo(() => {
        const start = page * pageSize;
        const end = start + pageSize;

        const slice = (transactions?.results ?? []).slice(start, end);

        return slice.map((tx) => {
            const { image, title, price } = tx.listing ?? {
                image: '',
                title: '',
                price: 0,
            };
            const address = tx.address
                ? `${tx.address.slice(0, 4)}...${tx.address.slice(
                      tx.address.length - 4
                  )}`
                : '';

            const cost = tx.totalCost ?? tx.quantity * (price ?? 0);

            let type = '';
            if (title.includes('WL')) {
                type = 'whitelist';
            } else if (title.includes('Raffle')) {
                type = 'raffle';
            }

            let description = `${tx.quantity} x ${type}`.trim();
            if (address) {
                description += ' to';
            }

            return {
                image,
                title,
                description,
                address,
                cost,
                createdAt: Date.parse(tx.date),
            };
        });
    }, [page, pageSize, transactions?.results]);

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

export default PurchaseHistory;
