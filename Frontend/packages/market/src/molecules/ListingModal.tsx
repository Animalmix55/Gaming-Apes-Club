import { Modal, Spinner, TextField } from '@fluentui/react';
import { GlowButton, MOBILE, useProvider, useThemeContext } from '@gac/shared';
import axios from 'axios';
import React from 'react';
import { useStyletron } from 'styletron-react';
import Web3 from 'web3';
import { useTransactionSubmitter } from '../api/hooks/useTransactionSubmitter';
import { ListingWithCount } from '../api/Models/Listing';
import { ListingTile } from '../atoms/ListingTile';

interface Props {
    listing: ListingWithCount;
    onClose: () => void;
}

export const ListingModal = (props: Props): JSX.Element => {
    const { listing, onClose } = props;
    const [css] = useStyletron();
    const theme = useThemeContext();
    const { web3, accounts } = useProvider();
    const [address, setAddress] = React.useState(accounts?.[0]);

    React.useEffect(() => {
        setAddress(accounts?.[0]);
    }, [accounts]);

    const onRequestSignature = (message: string): Promise<string> => {
        if (!web3 || !accounts) throw new Error('Not logged into web3');

        return web3.eth.personal.sign(message, accounts[0], '');
    };

    const addressValid = React.useMemo(
        () => Web3.utils.isAddress(address || ''),
        [address]
    );

    const {
        mutate: sendTransaction,
        isLoading,
        isSuccess,
        error,
        reset,
    } = useTransactionSubmitter(onRequestSignature);

    const errorMessage = React.useMemo(() => {
        if (!error) return undefined;
        if (axios.isAxiosError(error)) {
            if (error.response?.data.error) return error.response?.data.error;
            return error.message;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (error as any).message;
    }, [error]);

    React.useEffect(() => {
        reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listing]);

    const {
        id: listingId,
        description,
        totalPurchased,
        supply,
        requiresLinkedAddress,
        requiresHoldership,
    } = listing;
    const remaining = Math.max(0, (supply ?? Infinity) - totalPurchased);

    return (
        <Modal
            isOpen
            onDismiss={onClose}
            styles={{
                scrollableContent: {
                    maxHeight: 'unset',
                },
                main: {
                    background: theme.backgroundGradients.purpleBlue,
                },
            }}
        >
            <div
                className={css({
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '20px',
                    overflow: 'hidden',
                    minWidth: 'fit-content',
                    [MOBILE]: {
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    },
                })}
            >
                <ListingTile listing={listing as ListingWithCount} />

                <div
                    className={css({
                        maxWidth: '300px',
                        color: theme.fontColors.light.toRgbaString(),
                        display: 'flex',
                        flexDirection: 'column',
                        [MOBILE]: {
                            maxWidth: 'unset',
                        },
                    })}
                >
                    <div
                        className={css({
                            padding: '5px',
                        })}
                    >
                        <div
                            className={css({
                                fontFamily: theme.fonts.headers,
                            })}
                        >
                            Description
                        </div>
                        <div
                            className={css({
                                fontFamily: theme.fonts.body,
                                overflow: 'auto',
                                minHeight: '0px',
                            })}
                        >
                            {description}
                        </div>
                    </div>

                    {supply !== undefined && (
                        <div
                            className={css({
                                padding: '5px',
                            })}
                        >
                            <div
                                className={css({
                                    fontFamily: theme.fonts.headers,
                                })}
                            >
                                Remaining
                            </div>
                            <div
                                className={css({
                                    fontFamily: theme.fonts.body,
                                })}
                            >
                                {remaining}
                            </div>
                        </div>
                    )}

                    {requiresHoldership && (
                        <div
                            className={css({
                                padding: '5px',
                            })}
                        >
                            <div
                                className={css({
                                    fontFamily: theme.fonts.headers,
                                })}
                            >
                                Requires NFT Ownership
                            </div>
                            <div
                                className={css({
                                    fontFamily: theme.fonts.body,
                                })}
                            >
                                Yes
                            </div>
                        </div>
                    )}

                    {requiresLinkedAddress && (
                        <div
                            className={css({
                                padding: '5px',
                            })}
                        >
                            <div
                                className={css({
                                    fontFamily: theme.fonts.headers,
                                })}
                            >
                                Address
                            </div>
                            <div
                                className={css({
                                    fontFamily: theme.fonts.body,
                                })}
                            >
                                <TextField
                                    placeholder="0x..."
                                    value={address}
                                    required
                                    styles={{
                                        errorMessage: {
                                            fontFamily: theme.fonts.headers,
                                        },
                                    }}
                                    errorMessage={
                                        !addressValid
                                            ? 'Invalid Address'
                                            : undefined
                                    }
                                    onChange={(_, v): void => setAddress(v)}
                                />
                            </div>
                        </div>
                    )}
                    <div className={css({ margin: '5px 5px auto 5px' })}>
                        <GlowButton
                            disabled={remaining === 0}
                            onClick={(): void =>
                                sendTransaction([
                                    listingId,
                                    1,
                                    requiresLinkedAddress ? address : undefined,
                                ])
                            }
                            innerclass={css({
                                minHeight: '60px',
                                font: theme.fonts.buttons,
                            })}
                            className={css({
                                width: '100%',
                            })}
                        >
                            {isLoading && <Spinner />}
                            {isSuccess && 'Success'}
                            {errorMessage && errorMessage}
                            {!errorMessage &&
                                !isLoading &&
                                !isSuccess &&
                                'Purchase'}
                        </GlowButton>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ListingModal;
