import { Spinner } from '@fluentui/react';
import {
    ClassNameBuilder,
    useThemeContext,
    CheckableButton,
    ButtonType,
} from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useTags } from '../api/hooks/useTags';
import { ListingTag } from '../api/Models/ListingTag';

export interface TagFilterProps {
    selectedTags: string[];
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
    className?: string;
}

interface TagFilterItemProps {
    item: ListingTag;
    selected?: boolean;
    className?: string;
    onClick?: () => void;
}

const TagFilterItem = (props: TagFilterItemProps): JSX.Element => {
    const { item, selected, className, onClick } = props;
    const { displayName, listingCount } = item;

    const [css] = useStyletron();

    return (
        <CheckableButton
            text={`${displayName} (${listingCount})`}
            checked={selected}
            className={ClassNameBuilder(
                className,
                css({ textOverflow: 'ellipsis', whiteSpace: 'nowrap' })
            )}
            themeType={ButtonType.primary}
            onClick={onClick}
        />
    );
};

export const TagFilter = (props: TagFilterProps): JSX.Element => {
    const { selectedTags, setSelectedTags, className } = props;

    const tagsRequest = useTags(true);

    const [css] = useStyletron();
    const theme = useThemeContext();

    const onSelect = React.useCallback(
        (item: ListingTag) => (): void => {
            setSelectedTags((l): string[] => {
                if (item.id === undefined) return l;

                if (l.includes(item.id)) return l.filter((i) => i !== item.id);
                return [...l, item.id];
            });
        },
        [setSelectedTags]
    );

    if (tagsRequest.data && !tagsRequest.data.results?.length) return <></>;

    return (
        <div
            className={ClassNameBuilder(
                css({ fontFamily: theme.font }),
                className
            )}
        >
            <div
                className={css({
                    color: theme.foregroundPallette.white.toRgbaString(),
                    fontSize: '20px',
                    textTransform: 'uppercase',
                    fontWeight: 900,
                    marginBottom: '16px',
                    fontStyle: 'italic',
                })}
            >
                Categories
            </div>
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'row',
                    maxHeight: 'unset',
                    overflowY: 'hidden',
                    overflowX: 'auto',
                })}
            >
                {tagsRequest.isLoading && <Spinner />}
                {tagsRequest.isError && <div>Error</div>}
                {tagsRequest.data?.results &&
                    tagsRequest.data.results.map((t, i) => (
                        <TagFilterItem
                            key={t.id}
                            item={t}
                            className={css({
                                marginLeft: i === 0 ? '0px' : '16px',
                            })}
                            selected={
                                t.id !== undefined &&
                                selectedTags.includes(t.id)
                            }
                            onClick={onSelect(t)}
                        />
                    ))}
            </div>
        </div>
    );
};

export default TagFilter;
