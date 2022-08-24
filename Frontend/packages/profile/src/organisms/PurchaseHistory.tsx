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
import TransactionList from '../molecules/TransactionList';

const DAYS = 86400000;

const transactions = Array(50)
    .fill(0)
    .map((_, i) => ({
        image: 'https://lh3.googleusercontent.com/gtRedQThacyBS3cJikU2QXkyhJL6vmmz8GlLQAEB5f8GsiXlqjRxWgRKAlbxyu1cBbwUoidpo3vxp64VH8tkUPW00eepbiV126wmLA=w600',
        title: `Fruity Loopz WL ${i}`,
        description: '1 x whitelist to',
        address: '0xd1...ACE7',
        cost: Math.floor(10 + 1400 * Math.random()),
        createdAt: Date.now() - DAYS * Math.floor(10 * Math.random()),
    }));

const ITEMS_PER_PAGE = 20;
const ITEMS_PER_PAGE_MOBILE = 10;

export const PurchaseHistory = (): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();
    const ref = useRef<HTMLDivElement | null>(null);

    const [page, setPage] = useState(0);

    const isMobile = useMatchMediaQuery(MOBILE);
    const pageSize = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE;
    const maxPages = Math.floor(transactions.length / pageSize);

    const paginatedTransaction = useMemo(() => {
        const start = page * pageSize;
        const end = start + pageSize;
        return transactions.slice(start, end);
    }, [page, pageSize]);

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
            <TransactionList transactions={paginatedTransaction} />
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
        </section>
    );
};

export default PurchaseHistory;
