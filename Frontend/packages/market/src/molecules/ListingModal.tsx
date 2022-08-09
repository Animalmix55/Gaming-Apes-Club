/* eslint-disable react/no-danger */
import {
    MessageBar,
    MessageBarType,
    Spinner,
    TextField,
} from '@fluentui/react';
import { ClassNameBuilder } from '@gac/shared';
import {
    Badge,
    Button,
    ButtonType,
    isURL,
    Modal,
    TextInput,
    TokenDisplay,
    UrlRegex,
    useThemeContext,
    useWeb3,
} from '@gac/shared-v2';
import { ethers } from 'ethers';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useRoleNames } from '../api/hooks/useRoleNames';
import { useTransactionSubmitter } from '../api/hooks/useTransactionSubmitter';
import { Listing, ListingWithCount } from '../api/Models/Listing';
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

const ListingTags = ({
    listing,
    className,
}: {
    listing: Listing;
    className?: string;
}): JSX.Element => {
    const { roles, requiresHoldership, tags } = listing;

    const theme = useThemeContext();
    const [css] = useStyletron();

    const { data: roleNames } = useRoleNames(roles);

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    display: 'flex',
                    overflowX: 'auto',
                    flexWrap: 'nowrap',
                })
            )}
        >
            {tags?.map((t, i) => (
                <Badge
                    color={theme.additionalPallette.red.toRgbaString()}
                    text={t.displayName}
                    textColor={theme.foregroundPallette.white.toRgbaString()}
                    key={t.id}
                    className={css({
                        marginLeft: i === 0 ? undefined : '16px',
                    })}
                />
            ))}
            {roleNames?.map((r, i) => (
                <Badge
                    color={theme.buttonPallette.inactive.toRgbaString()}
                    text={r}
                    textColor={theme.foregroundPallette.white.toRgbaString()}
                    key={r}
                    className={css({
                        marginLeft:
                            i === 0 && !tags?.length ? undefined : '16px',
                    })}
                />
            ))}
            {!!requiresHoldership && (
                <Badge
                    color={theme.buttonPallette.primary.toRgbaString()}
                    text="Holders Only"
                    textColor={theme.foregroundPallette.white.toRgbaString()}
                    key="HOLDERSHIP_REQ"
                    className={css({
                        marginLeft:
                            roleNames?.length || tags?.length
                                ? '16px'
                                : undefined,
                    })}
                />
            )}
        </div>
    );
};

export const ListingModal = (props: Props): JSX.Element => {
    const { listing, onClose } = props;
    const [css] = useStyletron();
    const theme = useThemeContext();
    const { signer, accounts } = useWeb3();
    const [address, setAddress] = React.useState(accounts?.[0]);

    React.useEffect(() => {
        setAddress(accounts?.[0]);
    }, [accounts]);

    const onRequestSignature = (message: string): Promise<string> => {
        if (!signer) throw new Error('Not logged into web3');

        return signer.signMessage(message);
    };

    const addressValid = React.useMemo(
        () => ethers.utils.isAddress(address || ''),
        [address]
    );

    const {
        mutate: sendTransaction,
        isLoading,
        isSuccess,
        error,
    } = useTransactionSubmitter(onRequestSignature);

    const { claims } = useAuthorizationContext();
    const userRoles = claims?.member?.roles;

    const {
        id: listingId,
        description,
        totalPurchased,
        supply,
        requiresLinkedAddress,
        roles,
        endDate,
        price,
        image,
        title,
    } = listing;

    const hasRole = React.useMemo(() => {
        if (roles.length === 0) return true;

        if (!userRoles) return false;
        return userRoles.some((r) => roles.includes(r));
    }, [roles, userRoles]);

    const remaining = Math.max(0, (supply ?? Infinity) - totalPurchased);

    const errorMessage = React.useMemo(() => {
        if (!addressValid) return 'Invalid address';
        if (!hasRole) return 'Missing required role';
        if (remaining === 0) return 'Sold out';
        return ExtractErrorMessageFromError(error);
    }, [addressValid, error, hasRole, remaining]);

    return (
        <Modal
            suppressCloseButton
            isOpen
            onClose={onClose}
            modalClass={css({
                width: '830px',
                maxWidth: '90%',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    overflow: 'hidden',
                    alignItems: 'stretch',
                    minWidth: 'fit-content',
                    fontFamily: theme.font,
                })}
            >
                <img
                    src={image}
                    alt={title}
                    className={css({
                        width: 'auto',
                        height: '264px',
                        borderRadius: '8px',
                    })}
                />

                <div
                    className={css({
                        flex: '1',
                        marginLeft: '22px',
                        display: 'flex',
                        flexDirection: 'column',
                    })}
                >
                    <div
                        className={css({
                            display: 'flex',
                            marginBottom: '20px',
                        })}
                    >
                        <ListingTags
                            listing={listing}
                            className={css({ flex: '1', marginRight: '16px' })}
                        />
                        <TokenDisplay amount={price} />
                    </div>
                    <div
                        className={css({
                            fontWeight: 900,
                            fontSize: '28px',
                            color: theme.foregroundPallette.white.toRgbaString(),
                            fontStyle: 'italic',
                        })}
                    >
                        {title}
                    </div>
                    <div
                        className={css({
                            fontWeight: 600,
                            fontSize: '12px',
                            color: theme.foregroundPallette.white.toRgbaString(
                                0.5
                            ),
                        })}
                    >
                        {remaining !== Infinity && supply !== undefined
                            ? `${remaining}/${supply} Remaining`
                            : '∞ Remaining'}
                    </div>
                    <div
                        className={css({
                            color: theme.foregroundPallette.white.toRgbaString(),
                            fontSize: '12px',
                            fontWeight: 500,
                            marginTop: '16px',
                        })}
                        dangerouslySetInnerHTML={{
                            __html: descriptionToHtml(
                                description,
                                css({
                                    color: theme.foregroundPallette.accent.toRgbaString(),
                                })
                            ),
                        }}
                    />
                    <div
                        className={css({
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 'auto',
                        })}
                    >
                        {requiresLinkedAddress && (
                            <TextInput
                                label="Wallet Address"
                                value={address}
                                onChange={setAddress}
                                className={css({
                                    flex: '1',
                                    marginRight: '24px',
                                })}
                            />
                        )}
                        <Button
                            themeType={ButtonType.primary}
                            text="Purchase"
                            onClick={(): void =>
                                sendTransaction([
                                    listingId,
                                    1,
                                    requiresLinkedAddress ? address : undefined,
                                ])
                            }
                            disabled={
                                remaining === 0 ||
                                !hasRole ||
                                (!!requiresLinkedAddress && !addressValid)
                            }
                            className={css({
                                marginLeft: 'auto',
                            })}
                        />
                    </div>
                </div>
            </div>
            {errorMessage && (
                <MessageBar
                    className={css({ borderRadius: '8px', marginTop: '16px' })}
                    messageBarType={MessageBarType.error}
                >
                    {errorMessage}
                </MessageBar>
            )}
        </Modal>
    );
};

export default ListingModal;
