import React from 'react';
import { TagFilter } from '../molecules/TagFilter';

export default {
    title: 'Market/Molecules/TagFilter',
    component: TagFilter,
};

export const Vertical = (): JSX.Element => {
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

    return (
        <TagFilter
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
        />
    );
};

export const Horizontal = (): JSX.Element => {
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

    return (
        <TagFilter
            horizontal
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
        />
    );
};
