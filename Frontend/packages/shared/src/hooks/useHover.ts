import React from 'react';

export const useHover = <TElement extends HTMLElement>(): [
    React.RefObject<TElement>,
    boolean
] => {
    const [value, setValue] = React.useState(false);
    const ref = React.useRef<TElement>(null);
    const handleMouseOver = (): void => setValue(true);
    const handleMouseOut = (): void => setValue(false);
    React.useEffect(
        () => {
            const node = ref.current;
            if (node) {
                node.addEventListener('mouseover', handleMouseOver);
                node.addEventListener('mouseout', handleMouseOut);
                return (): void => {
                    node.removeEventListener('mouseover', handleMouseOver);
                    node.removeEventListener('mouseout', handleMouseOut);
                };
            }

            return undefined;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ref.current] // Recall only if ref changes
    );
    return [ref, value];
};

export default useHover;
