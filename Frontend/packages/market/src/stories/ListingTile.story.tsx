import React from 'react';
import { ListingTile } from '../atoms/ListingTile';

export default {
    title: 'Market/Atoms/ListingTile',
    component: ListingTile,
};

export const StandAlone = (): JSX.Element => {
    return (
        <ListingTile
            listing={{
                onlyVisibleWhenFiltered: false,
                id: 'test',
                createdBy: 'me',
                createdOn: new Date(),
                title: 'Funkies WL',
                description: 'description',
                price: 10,
                image: 'https://i.ibb.co/3NwhsNs/FXo-VKQr-UYAEzo37.png',
                supply: 100,
                maxPerUser: 10,
                requiresHoldership: false,
                requiresLinkedAddress: true,
                roles: [],
                disabled: false,
                discordMessage: null,
                startDate: null,
                endDate: null,
                resultantRole: null,
            }}
            onClick={(): void => undefined}
        />
    );
};
