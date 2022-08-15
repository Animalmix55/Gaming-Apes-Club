import React from 'react';
import { TagFilter } from '../molecules/TagFilter';

export default {
    title: 'Market/Molecules/TagFilter',
    component: TagFilter,
};

export const StandAlone = (): JSX.Element => {
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

    return (
        <TagFilter
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
        />
    );
};
