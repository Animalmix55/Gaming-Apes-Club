import { Modal, Spinner, TextField } from '@fluentui/react';
import {
    GlowButton,
    isURL,
    MOBILE,
    UrlRegex,
    useProvider,
    useThemeContext,
} from '@gac/shared';
import React from 'react';
import { useStyletron } from 'styletron-react';
import Web3 from 'web3';
import { useRoleNames } from '../api/hooks/useRoleNames';
import { useTransactionSubmitter } from '../api/hooks/useTransactionSubmitter';
import { ListingWithCount } from '../api/Models/Listing';
import { ListingTile } from '../atoms/ListingTile';
import { useAuthorizationContext } from '../contexts/AuthorizationContext';
import { ExtractErrorMessageFromError } from '../utils/ErrorMessage';

interface Props {
    listing: ListingWithCount;
    onClose: () => void;
}

const descriptionToHtml = (description: string, className?: string): string => {
    return description.replace(new RegExp(UrlRegex, 'g'), (word) => {
        if (isURL(word))
            return `<a href="${word}" target="_blank" ${
                className ? `class="${className}" ` : ' '
            }rel="noreferrer">${word}</a>`;
        return word;
    });
};

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
    } = useTransactionSubmitter(onRequestSignature);

    const errorMessage = React.useMemo(
        () => ExtractErrorMessageFromError(error),
        [error]
    );

    const { claims } = useAuthorizationContext();
    const userRoles = claims?.member?.roles;

    const {
        id: listingId,
        description,
        totalPurchased,
        supply,
        requiresLinkedAddress,
        requiresHoldership,
        roles,
        tags,
        endDate,
    } = listing;

    const hasRole = React.useMemo(() => {
        if (roles.length === 0) return true;

        if (!userRoles) return false;
        return userRoles.some((r) => roles.includes(r));
    }, [roles, userRoles]);

    const { data: roleNames, isLoading: roleNamesLoading } =
        useRoleNames(roles);

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
                                fontWeight: '900',
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
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                                __html: descriptionToHtml(
                                    description,
                                    css({
                                        color: theme.fontColors.accent.toRgbaString(),
                                    })
                                ),
                            }}
                        />
                    </div>

                    {!!endDate && (
                        <div
                            className={css({
                                padding: '5px',
                            })}
                        >
                            <div
                                className={css({
                                    fontFamily: theme.fonts.headers,
                                    fontWeight: '900',
                                })}
                            >
                                End Date
                            </div>
                            <div
                                className={css({
                                    fontFamily: theme.fonts.body,
                                })}
                            >
                                {new Date(endDate).toLocaleDateString()}{' '}
                                {new Date(endDate).toLocaleTimeString()}
                            </div>
                        </div>
                    )}

                    {!!tags?.length && (
                        <div
                            className={css({
                                padding: '5px',
                            })}
                        >
                            <div
                                className={css({
                                    fontFamily: theme.fonts.headers,
                                    fontWeight: '900',
                                })}
                            >
                                Tags
                            </div>
                            <div
                                className={css({
                                    fontFamily: theme.fonts.body,
                                })}
                            >
                                {tags.map((t) => t.displayName).join(', ')}
                            </div>
                        </div>
                    )}

                    {!!roles.length && (
                        <div
                            className={css({
                                padding: '5px',
                            })}
                        >
                            <div
                                className={css({
                                    fontFamily: theme.fonts.headers,
                                    fontWeight: '900',
                                })}
                            >
                                Applicable Roles
                            </div>
                            <div
                                className={css({
                                    fontFamily: theme.fonts.body,
                                })}
                            >
                                {roleNamesLoading && <Spinner />}
                                {!roleNamesLoading &&
                                    !!roleNames &&
                                    roleNames.join(', ')}
                            </div>
                        </div>
                    )}

                    {supply !== undefined && (
                        <div
                            className={css({
                                padding: '5px',
                            })}
                        >
                            <div
                                className={css({
                                    fontFamily: theme.fonts.headers,
                                    fontWeight: '900',
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

                    {!!requiresHoldership && (
                        <div
                            className={css({
                                padding: '5px',
                            })}
                        >
                            <div
                                className={css({
                                    fontFamily: theme.fonts.headers,
                                    fontWeight: '900',
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

                    {!!requiresLinkedAddress && (
                        <div
                            className={css({
                                padding: '5px',
                            })}
                        >
                            <div
                                className={css({
                                    fontFamily: theme.fonts.headers,
                                    fontWeight: '900',
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
                                            fontWeight: '900',
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
                            disabled={remaining === 0 || !hasRole}
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
                            {!hasRole && 'Missing required role'}
                            {remaining === 0 && 'Sold out'}
                            {errorMessage && errorMessage}
                            {!errorMessage &&
                                hasRole &&
                                !isLoading &&
                                !isSuccess &&
                                remaining !== 0 &&
                                'Purchase'}
                        </GlowButton>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ListingModal;
