import React from 'react';
import { useTransactionsGetter } from '../api/hooks/useTransactionsGetter';
import { GuildMember } from '../api/Models/GuildMember';
import { Transaction } from '../api/Models/Transaction';
import { HistoryTile } from '../atoms/HistoryTile';
import { ImageWithBadge } from '../atoms/ImageWithBadge';

export default {
    title: 'Market/Atoms/HistoryTile',
    component: ImageWithBadge,
};

export const StandAlone = ({ index }: { index: number }): JSX.Element => {
    const fetcher = useTransactionsGetter();
    const [tx, setTx] = React.useState<Transaction>();
    const [user, setUser] = React.useState<GuildMember>();

    React.useEffect(() => {
        fetcher(undefined, undefined, index, 1).then((r) => {
            const tx = r.results?.at(0);
            if (!tx) return;
            const { user } = tx;
            setTx(tx);
            setUser(r.users?.[user]);
        });
    }, [fetcher, index]);

    if (!tx) return <></>;

    return <HistoryTile transaction={tx} user={user} />;
};

StandAlone.args = {
    index: 0,
};
