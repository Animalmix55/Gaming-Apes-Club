import {
    Checkbox,
    ITextFieldStyles,
    Spinner,
    SpinnerSize,
    TextField,
    ThemeProvider,
} from '@fluentui/react';
import { ClassNameBuilder, GlowButton, useThemeContext } from '@gac/shared';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useListing } from '../api/hooks/useListing';
import { useListingCreator } from '../api/hooks/useListingCreator';
import { useListingUpdater } from '../api/hooks/useListingUpdater';
import { NewListing } from '../api/Models/Listing';
import { ExtractErrorMessageFromError } from '../utils/ErrorMessage';
import { ListingTile } from './ListingTile';
import { RolesDropdown } from './RolesDropdown';

/**
 * title: string;
    description: string;
    image: string;
    price: number;
    supply?: number;
    maxPerUser?: number;
    requiresHoldership?: boolean;
    requiresLinkedAddress?: boolean;
    disabled?: boolean;
 */

interface Props {
    listing: NewListing;
    onChange: (listing: NewListing) => void;
    className?: string;
    onSave?: (listing: NewListing) => void;
    isLoading?: boolean;
    isSuccess?: boolean;
    error?: string;
    disabled?: boolean;
}

export const convertToListing = (
    partialListing: Partial<NewListing>
): NewListing => {
    return {
        title: partialListing.title || '',
        description: partialListing.description || '',
        image: partialListing.image || '',
        price: partialListing.price || 0,
        supply: partialListing.supply,
        maxPerUser: partialListing.maxPerUser,
        requiresHoldership: !!partialListing.requiresHoldership,
        requiresLinkedAddress: !!partialListing.requiresLinkedAddress,
        disabled: !!partialListing.disabled,
        roles: partialListing.roles || [],
    };
};

export const ListingForm = (props: Props): JSX.Element => {
    const {
        listing,
        onChange,
        className,
        isLoading,
        isSuccess,
        onSave,
        error,
        disabled: formDisabled,
    } = props;

    const {
        title,
        description,
        image,
        price,
        supply,
        maxPerUser,
        requiresHoldership,
        requiresLinkedAddress,
        disabled,
    } = listing;

    const [css] = useStyletron();
    const theme = useThemeContext();
    const fieldClass = css({ margin: '5px' });
    const styles: Partial<ITextFieldStyles> = {
        description: { color: theme.fontColors.light.toRgbaString() },
        field: { color: theme.fontColors.dark.toRgbaString() },
    };

    return (
        <ThemeProvider
            applyTo="none"
            theme={{
                palette: {
                    themePrimary: theme.fontColors.accent.toRgbaString(),
                    neutralPrimary: theme.fontColors.light.toRgbaString(),
                    neutralDark: theme.fontColors.light.toRgbaString(),
                    black: theme.fontColors.dark.toRgbaString(),
                    white: theme.fontColors.light.toRgbaString(),
                },
            }}
        >
            <div
                className={ClassNameBuilder(
                    className,
                    css({
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                        background: theme.backgroundGradients.purpleBlue,
                        padding: '10px',
                    })
                )}
            >
                <div
                    className={css({
                        display: 'flex',
                        flex: '1',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'auto',
                        flexWrap: 'wrap',
                    })}
                >
                    <div
                        className={css({
                            display: 'flex',
                            justifyContent: 'center',
                        })}
                    >
                        <ListingTile
                            listing={{
                                ...convertToListing(listing),
                                id: '',
                                createdBy: '',
                                createdOn: new Date(),
                            }}
                            className={css({
                                background: `${theme.backgroundGradients.purpleBlue} !important`,
                                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                margin: '5px',
                            })}
                        />
                    </div>
                    <div className={css({ minWidth: '350px', padding: '5px' })}>
                        <TextField
                            disabled={formDisabled}
                            className={fieldClass}
                            styles={styles}
                            label="Title"
                            value={title}
                            onChange={(_, v): void =>
                                onChange(
                                    convertToListing({ ...listing, title: v })
                                )
                            }
                        />
                        <TextField
                            disabled={formDisabled}
                            className={fieldClass}
                            label="Description"
                            value={description}
                            styles={styles}
                            multiline
                            resizable={false}
                            onChange={(_, v): void =>
                                onChange(
                                    convertToListing({
                                        ...listing,
                                        description: v,
                                    })
                                )
                            }
                        />
                        <TextField
                            disabled={formDisabled}
                            className={fieldClass}
                            label="Image Url"
                            styles={styles}
                            value={image}
                            onChange={(_, v): void =>
                                onChange(
                                    convertToListing({ ...listing, image: v })
                                )
                            }
                        />
                        <TextField
                            disabled={formDisabled}
                            className={fieldClass}
                            label="Price"
                            type="number"
                            styles={styles}
                            min={0}
                            value={String(price || 0)}
                            onChange={(_, v): void =>
                                onChange({ ...listing, price: Number(v || 0) })
                            }
                        />
                        <TextField
                            disabled={formDisabled}
                            className={fieldClass}
                            label="Maximum Supply (zero for no max)"
                            type="number"
                            min={0}
                            styles={styles}
                            value={String(supply || 0)}
                            onChange={(_, v): void =>
                                onChange({
                                    ...listing,
                                    supply: v ? Number(v) : undefined,
                                })
                            }
                        />
                        <TextField
                            disabled={formDisabled}
                            className={fieldClass}
                            label="Max Per User (zero for no max)"
                            type="number"
                            min={0}
                            styles={styles}
                            value={String(maxPerUser || 0)}
                            onChange={(_, v): void =>
                                onChange({
                                    ...listing,
                                    maxPerUser: v ? Number(v) : undefined,
                                })
                            }
                        />
                        <RolesDropdown
                            label="Applicable Roles (none for all)"
                            onSelect={(v): void =>
                                onChange({ ...listing, roles: v })
                            }
                            selectedKeys={listing.roles}
                            disabled={formDisabled}
                            className={fieldClass}
                        />
                        <Checkbox
                            disabled={formDisabled}
                            className={fieldClass}
                            label="Requires NFT Ownership"
                            styles={styles}
                            checked={!!requiresHoldership}
                            onChange={(_, v): void =>
                                onChange({ ...listing, requiresHoldership: v })
                            }
                        />
                        <Checkbox
                            disabled={formDisabled}
                            className={fieldClass}
                            label="Requires Address Entry"
                            styles={styles}
                            checked={!!requiresLinkedAddress}
                            onChange={(_, v): void =>
                                onChange({
                                    ...listing,
                                    requiresLinkedAddress: v,
                                })
                            }
                        />
                        <Checkbox
                            disabled={formDisabled}
                            className={fieldClass}
                            label="Disable"
                            styles={styles}
                            checked={!!disabled}
                            onChange={(_, v): void =>
                                onChange({ ...listing, disabled: v })
                            }
                        />
                    </div>
                </div>
                {onSave && (
                    <div
                        className={css({
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '10px',
                        })}
                    >
                        <GlowButton
                            disabled={formDisabled}
                            onClick={(): void => onSave?.(listing)}
                            className={css({
                                fontSize: '40px',
                                padding: '5px',
                                fontFamily: `${theme.fonts.buttons} !important`,
                            })}
                            innerclass={css({
                                minHeight: '60px',
                                minWidth: '150px',
                            })}
                        >
                            {!!error && (
                                <span className={css({ fontSize: '15px' })}>
                                    {error}
                                </span>
                            )}
                            {isLoading && <Spinner size={SpinnerSize.medium} />}
                            {isSuccess && 'Success'}
                            {!error && !isLoading && !isSuccess && 'Save'}
                        </GlowButton>
                    </div>
                )}
            </div>
        </ThemeProvider>
    );
};

interface ServersideProps {
    className?: string;
    listingId?: string;
    setListingId: (id?: string) => void;
}

export const ServersideListingForm = (props: ServersideProps): JSX.Element => {
    const { listingId, className, setListingId } = props;

    const { data: listing } = useListing(listingId);
    const [updatedListing, setUpdatedListing] = React.useState(
        convertToListing(listing || {})
    );

    const listingUpdater = useListingUpdater();
    const listingCreator = useListingCreator();

    React.useEffect(() => {
        if (listing) setUpdatedListing(convertToListing(listing));
        else setUpdatedListing(convertToListing({}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listing]);

    const useEffectId = listingId || 'none';
    React.useEffect(() => {
        listingCreator.reset();
        listingUpdater.reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useEffectId]);

    const onSave = React.useCallback(() => {
        if (listingId) {
            listingUpdater.mutate([{ ...updatedListing, id: listingId }]);
        } else {
            listingCreator
                .mutateAsync([updatedListing])
                .then((r) => setListingId(r.id));
        }
    }, [
        listingCreator,
        listingId,
        listingUpdater,
        setListingId,
        updatedListing,
    ]);

    const errorMessage = React.useMemo(() => {
        const err1 = ExtractErrorMessageFromError(listingUpdater.error);
        const err2 = ExtractErrorMessageFromError(listingCreator.error);

        return err1 || err2;
    }, [listingCreator.error, listingUpdater.error]);

    return (
        <ListingForm
            disabled={listing?.disabled}
            className={className}
            listing={updatedListing}
            onChange={setUpdatedListing}
            onSave={onSave}
            isLoading={listingUpdater.isLoading || listingCreator.isLoading}
            isSuccess={listingUpdater.isSuccess || listingCreator.isSuccess}
            error={errorMessage}
        />
    );
};

export default ListingForm;
