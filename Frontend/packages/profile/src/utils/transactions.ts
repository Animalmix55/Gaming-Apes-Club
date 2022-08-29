import { Transaction } from '../api/Models/Transaction';
import { TransactionListItem } from '../molecules/TransactionList';

export const ToTransactionListItem = (tx: Transaction): TransactionListItem => {
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
};

export default {};
