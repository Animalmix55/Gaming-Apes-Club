import { Modal } from '@fluentui/react';
import { Button, ButtonType, useThemeContext } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { ListingDropdown } from '../atoms/ListingDropdown';
import { ServersideListingForm } from '../atoms/ListingForm';
import { TransactionGrid } from '../atoms/TransactionGrid';

const CreateListingModal = ({
    onSave,
    onClose,
}: {
    onSave: (newId: string) => void;
    onClose: () => void;
}): JSX.Element => {
    return (
        <Modal
            isOpen
            onDismiss={onClose}
            styles={{ scrollableContent: { maxHeight: 'unset' } }}
        >
            <ServersideListingForm setListingId={onSave} />
        </Modal>
    );
};

export const ListingDetails = (): JSX.Element => {
    const [selectedListing, setSelectedListing] = React.useState<string>();
    const [css] = useStyletron();
    const theme = useThemeContext();
    const [newListingModelOpen, setNewListingModalOpen] = React.useState(false);

    return (
        <div className={css({ display: 'flex', flexDirection: 'column' })}>
            <div
                className={css({
                    margin: '10px',
                    display: 'flex',
                    alignItems: 'center',
                })}
            >
                {newListingModelOpen && (
                    <CreateListingModal
                        onClose={(): void => setNewListingModalOpen(false)}
                        onSave={(v): void => {
                            setSelectedListing(v);
                            setNewListingModalOpen(false);
                        }}
                    />
                )}
                <ListingDropdown
                    className={css({ flex: '1' })}
                    selectedKey={selectedListing}
                    onSelect={setSelectedListing}
                    showDisabled
                    showInactive
                />
                <Button
                    className={css({
                        fontFamily: theme.font,
                        marginLeft: '16px',
                    })}
                    onClick={(): void => setNewListingModalOpen(true)}
                    text="New"
                    themeType={ButtonType.primary}
                />
            </div>
            {selectedListing && (
                <div
                    className={css({
                        display: 'flex',
                        flex: '1',
                        flexWrap: 'wrap',
                    })}
                >
                    <div
                        className={css({
                            minWidth: '300px',
                            minHeight: '500px',
                            margin: '10px',
                            flex: '1',
                        })}
                    >
                        <TransactionGrid listingId={selectedListing} />
                    </div>
                    <div className={css({ margin: '10px', flex: '1' })}>
                        <ServersideListingForm
                            listingId={selectedListing}
                            setListingId={setSelectedListing}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListingDetails;
