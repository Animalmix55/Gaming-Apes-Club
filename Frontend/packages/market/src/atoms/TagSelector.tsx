/* eslint-disable quotes */
/* eslint-disable no-alert */
import React from 'react';
import {
    ComboBox,
    IComboBoxOption,
    IComboBoxProps,
    Spinner,
    SpinnerSize,
} from '@fluentui/react';
import { useStyletron } from 'styletron-react';
import { Button, ButtonType, useThemeContext } from '@gac/shared-v2';
import { v4 } from 'uuid';
import { useTags } from '../api/hooks/useTags';
import { ListingTag } from '../api/Models/ListingTag';

export interface TagSelectorProps {
    selection: ListingTag[];
    onChange: (selection: ListingTag[]) => void;
    className?: IComboBoxProps['className'];
    disabled?: IComboBoxProps['disabled'];
}

export const TagSelector = (props: TagSelectorProps): JSX.Element => {
    const { selection, onChange, className, disabled } = props;
    const tokenRequest = useTags();

    const theme = useThemeContext();
    const [css] = useStyletron();

    const [allTags, setAllTags] = React.useState<ListingTag[]>([]);
    React.useEffect(() => {
        if (tokenRequest.data?.results) {
            setAllTags(tokenRequest.data.results);
        }
    }, [tokenRequest.data?.results]);

    const options = React.useMemo<IComboBoxOption[]>(() => {
        return allTags.map(
            (r): IComboBoxOption => ({
                data: r,
                key: r.id as string,
                text: r.displayName,
                styles: {
                    root: {
                        color: `${theme.foregroundPallette.accent.toRgbaString()} !important`,
                    },
                    rootHovered: {
                        backgroundColor: `${theme.backgroundPallette.dark.toRgbaString(
                            0.4
                        )} !important`,
                    },
                    rootFocused: {
                        backgroundColor: `${theme.backgroundPallette.dark.toRgbaString(
                            0.7
                        )} !important`,
                    },
                    rootChecked: {
                        backgroundColor: `${theme.backgroundPallette.dark.toRgbaString(
                            0.7
                        )} !important`,
                        color: `${theme.foregroundPallette.white.toRgbaString()} !important`,
                    },
                },
            })
        );
    }, [
        allTags,
        theme.backgroundPallette.dark,
        theme.foregroundPallette.accent,
        theme.foregroundPallette.white,
    ]);

    const onChangeInner = React.useCallback(
        (_: never, option?: IComboBoxOption) => {
            if (!option) return;

            const { selected, key: tagId } = option;
            const newSelection = selection.filter((r) => r.id !== tagId);

            if (selected) newSelection.push(option.data as ListingTag);
            onChange(newSelection);
        },
        [onChange, selection]
    );

    const upperContentRenderer = React.useCallback((): JSX.Element => {
        if (tokenRequest.isLoading)
            return (
                <div
                    className={css({
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    })}
                >
                    <div className={css({ marginRight: '4px' })}>Loading</div>
                    <Spinner size={SpinnerSize.small} />
                </div>
            );

        return (
            <Button
                themeType={ButtonType.primary}
                className={css({ width: '100%', justifyContent: 'center' })}
                onClick={(): void => {
                    const tag = prompt("What's the tag?");
                    if (!tag) return;
                    setAllTags((t) => [...t, { displayName: tag, id: v4() }]);
                }}
                text="New"
            />
        );
    }, [css, tokenRequest.isLoading]);

    const selectedKey = React.useMemo(
        () => selection.map((m) => m.id as string),
        [selection]
    );

    return (
        <ComboBox
            styles={{
                callout: {
                    background: theme.backgroundPallette.light.toRgbaString(),
                    '.ms-Callout-main': {
                        background: 'unset',
                    },
                },
                input: {
                    color: `${theme.foregroundPallette.black.toRgbaString()} !important`,
                },
            }}
            options={options}
            selectedKey={selectedKey}
            onChange={onChangeInner}
            className={className}
            multiSelect
            onRenderUpperContent={upperContentRenderer}
            label="Tags"
            disabled={disabled}
        />
    );
};
