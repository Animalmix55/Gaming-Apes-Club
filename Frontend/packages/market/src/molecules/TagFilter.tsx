import { Checkbox, Icon, Spinner } from '@fluentui/react';
import { ClassNameBuilder, useThemeContext } from '@gac/shared';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useTags } from '../api/hooks/useTags';
import { ListingTag } from '../api/Models/ListingTag';

export interface TagFilterProps {
    selectedTags: string[];
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
    className?: string;
    horizontal?: boolean;
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
    const theme = useThemeContext();

    return (
        <button
            type="button"
            className={ClassNameBuilder(
                className,
                css({
                    cursor: 'pointer',
                    padding: '10px',
                    color: theme.pallette.discordBlue.toRgbaString(),
                    backgroundColor: theme.backgroundColor.light.toRgbaString(),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    border: 'unset',
                    fontSize: '20px',
                    borderRadius: '6px',
                })
            )}
            onClick={onClick}
        >
            <Checkbox
                checked={selected}
                onChange={onClick}
                className={css({ marginRight: '10px' })}
                styles={{
                    checkbox: {
                        borderRadius: '3px',
                        height: '12px',
                        width: '12px',
                        borderColor: 'unset',
                        backgroundColor:
                            theme.pallette.discordBlue.toRgbaString(),
                    },
                }}
            />
            <div
                className={css({
                    fontWeight: 700,
                    fontFamily: theme.fonts.headers,
                    whiteSpace: 'nowrap',
                })}
            >
                {displayName}
            </div>
            {listingCount !== undefined && (
                <div
                    className={css({
                        marginLeft: '8px',
                        fontFamily: theme.fonts.body,
                    })}
                >
                    ({listingCount})
                </div>
            )}
        </button>
    );
};

export const TagFilter = (props: TagFilterProps): JSX.Element => {
    const { selectedTags, setSelectedTags, className, horizontal } = props;

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
        <div className={ClassNameBuilder(className)}>
            {!horizontal && (
                <div
                    className={css({
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        fontFamily: theme.fonts.headers,
                        color: theme.fontColors.light.toRgbaString(),
                        fontSize: '25px',
                    })}
                >
                    <Icon
                        iconName="Equalizer"
                        className={css({ margin: '8px' })}
                    />
                    <div className={css({ fontWeight: 700 })}>Categories</div>
                </div>
            )}
            <div
                className={css({
                    maxHeight: '50vh',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    ...(horizontal && {
                        flexDirection: 'row',
                        maxHeight: 'unset',
                        overflowY: 'hidden',
                        overflowX: 'auto',
                    }),
                })}
            >
                {tagsRequest.isLoading && <Spinner />}
                {tagsRequest.isError && <div>Error</div>}
                {tagsRequest.data?.results &&
                    tagsRequest.data.results.map((t) => (
                        <TagFilterItem
                            key={t.id}
                            item={t}
                            className={css({ margin: '5px' })}
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
