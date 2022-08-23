import React, { useMemo } from 'react';
import { ClassNameBuilder } from '@gac/shared-v2';
import { useStyletron } from 'styletron-react';

type Item<T> = T & { createdAt: number };

const relativeDays = (timestamp: number): string => {
    const rtf = new Intl.RelativeTimeFormat('en', {
        numeric: 'auto',
    });
    const oneDayInMs = 1000 * 60 * 60 * 24;
    const daysDifference = Math.round(
        (timestamp - new Date().getTime()) / oneDayInMs
    );

    return rtf.format(daysDifference, 'day');
};

interface Props<T> {
    items: Item<T>[];
    render: (item: Item<T>) => React.ReactElement;
    className?: string;
}

const GroupedList = <T,>({
    items,
    render,
    className,
}: Props<T>): JSX.Element => {
    const [css] = useStyletron();

    const groups = useMemo(() => {
        const dateGroups = items.reduce((groups, item) => {
            const date = new Date(item.createdAt).setHours(0, 0, 0, 0);

            const dateItems = groups[date] ?? [];
            return { ...groups, [date]: [...dateItems, item] };
        }, {} as { [key: string]: Array<Item<T>> });

        return Object.keys(dateGroups)
            .map((date) => ({
                date: Number(date),
                items: dateGroups[date],
            }))
            .sort((a, b) => b.date - a.date);
    }, [items]);

    return (
        <div
            className={ClassNameBuilder(
                css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }),
                className
            )}
        >
            {groups.map(({ date, items }) => (
                <div key={date}>
                    <p
                        className={css({
                            fontWeight: 600,
                            fontSize: '12px',
                            lineHeight: '12px',
                            letterSpacing: '0.02em',
                        })}
                    >
                        {relativeDays(date)}
                    </p>
                    <div
                        className={css({
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                            marginTop: '16px',
                        })}
                    >
                        {items.map(render)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GroupedList;
