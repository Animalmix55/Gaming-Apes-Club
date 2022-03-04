/* eslint-disable react/jsx-props-no-spreading */
import { Icon, Spinner, SpinnerSize } from '@fluentui/react';
import React from 'react';
import { toast } from 'react-toastify';
import { useStyletron } from 'styletron-react';
import { PromiEvent, TransactionReceipt } from 'web3-core';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';
import { BaseContract, NonPayableTx, PayableTx } from '../models/types';
import { GlowButtonProps, GlowButton } from './GlowButton';

export interface TransactionButtonProps<
    T extends BaseContract,
    M extends keyof T['methods']
> extends GlowButtonProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bypassError?: (err: any) => boolean;
    contract: T;
    method: M;
    params:
        | Parameters<T['methods'][M]>
        | ((
              props: Omit<TransactionButtonProps<T, M>, 'params'>
          ) => Promise<Parameters<T['methods'][M]>>);
    onTransact?: (val: PromiEvent<TransactionReceipt>) => void;
    tx?: NonPayableTx | PayableTx;
}

export const TransactionButton = <
    T extends BaseContract,
    M extends keyof T['methods']
>(
    props: TransactionButtonProps<T, M>
): JSX.Element => {
    const {
        contract,
        method,
        params,
        onTransact,
        disabled,
        tx,
        children: childrenProp,
        onClick: onClickProp,
        bypassError,
    } = props;
    const { etherscanUrl } = useGamingApeContext();
    const [pending, setPending] = React.useState(false);
    const [hash, setHash] = React.useState('');
    const [css] = useStyletron();

    const onClick: React.MouseEventHandler<HTMLButtonElement> =
        React.useCallback(
            async (e) => {
                if (pending && hash) {
                    window.open(`${etherscanUrl}/tx/${hash}`, '_blank');
                    return;
                }
                setPending(true);

                onClickProp?.(e);

                let functionParams: Parameters<T['methods'][M]>;

                try {
                    functionParams =
                        typeof params === 'function'
                            ? await params(props)
                            : params;
                } catch (err) {
                    setPending(false);
                    toast(err, { type: 'error' });
                    return;
                }

                try {
                    await contract.methods[method](
                        ...functionParams
                    ).estimateGas(tx);
                } catch (error) {
                    if (!bypassError?.(error)) {
                        setPending(false);
                        if (typeof error === 'string')
                            toast(error, { type: 'error' });
                        else if (typeof error === 'object') {
                            if (error.data?.message)
                                toast(error.data.message, { type: 'error' });
                            else if (error.message) {
                                try {
                                    // error can be a json object, expecially if from Ganache.
                                    const body = `{${(error.message as string)
                                        .split('{')
                                        .slice(1)
                                        .join('{')}`;
                                    const obj = JSON.parse(body);
                                    if (obj.message)
                                        toast(obj.message, { type: 'error' });
                                    else if (obj.originalError?.message)
                                        toast(obj.originalError.message, {
                                            type: 'error',
                                        });
                                    else
                                        toast('Unexpected error', {
                                            type: 'error',
                                        });
                                } catch (e) {
                                    toast(error.message, { type: 'error' });
                                }
                            } else toast('Unexpected error', { type: 'error' });
                        } else toast('Unexpected error', { type: 'error' });

                        return;
                    }
                }

                const trans = contract.methods[method](...functionParams).send(
                    tx
                ) as PromiEvent<TransactionReceipt>;

                onTransact?.(trans);
                trans
                    .finally(() => {
                        setPending(false);
                        setHash('');
                    })
                    .then((tx) =>
                        toast(
                            <div
                                className={css({
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                })}
                            >
                                <span>Transaction Succeeded</span>
                                <Icon
                                    className={css({ marginLeft: '5px' })}
                                    iconName="OpenInNewWindow"
                                />
                            </div>,
                            {
                                type: 'success',
                                onClick: () =>
                                    window.open(
                                        `${etherscanUrl}/tx/${tx.transactionHash}`,
                                        '_blank'
                                    ),
                            }
                        )
                    );
                trans.on('transactionHash', setHash);
            },
            [
                bypassError,
                contract.methods,
                css,
                etherscanUrl,
                hash,
                method,
                onClickProp,
                onTransact,
                params,
                pending,
                props,
                tx,
            ]
        );

    const children = React.useMemo(() => {
        if (pending)
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {!hash && childrenProp}
                    {hash && 'View on Etherscan'}
                    <Spinner
                        style={{ marginLeft: '10px' }}
                        size={SpinnerSize.medium}
                    />
                </div>
            );

        return childrenProp;
    }, [childrenProp, hash, pending]);

    const filteredProps = { ...props } as Record<string, unknown>;
    delete filteredProps.contract;
    delete filteredProps.method;
    delete filteredProps.params;
    delete filteredProps.onTransact;
    delete filteredProps.tx;
    delete filteredProps.bypassError;

    return (
        <GlowButton
            {...filteredProps}
            disabled={(disabled && !(pending && hash)) || (pending && !hash)}
            onClick={onClick}
        >
            {children}
        </GlowButton>
    );
};

export default TransactionButton;
