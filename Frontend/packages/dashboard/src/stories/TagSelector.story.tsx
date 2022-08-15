import React from 'react';
import { ListingTag } from '../api/Models/ListingTag';
import { TagSelector } from '../atoms/TagSelector';

export default {
    title: 'Market/Atoms/TagSelector',
    component: TagSelector,
};

export const StandAlone = (): JSX.Element => {
    const [selection, setSelection] = React.useState<ListingTag[]>([]);

    return <TagSelector selection={selection} onChange={setSelection} />;
};
