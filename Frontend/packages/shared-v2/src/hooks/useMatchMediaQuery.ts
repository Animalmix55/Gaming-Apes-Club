import React from 'react';

export const useMatchMediaQuery = (query: string): boolean => {
    const matchList = React.useMemo(
        () => matchMedia(query.replace(/^@media\s*/, '')),
        [query]
    );
    const [matches, setMatches] = React.useState(matchList.matches);

    React.useEffect(() => {
        const _matchList = matchList;
        const handler = (ev: MediaQueryListEvent): void => {
            setMatches(ev.matches);
        };

        _matchList.addEventListener('change', handler);

        return () => {
            _matchList.removeEventListener('change', handler);
        };
    }, [matchList]);

    return matches;
};

export default useMatchMediaQuery;
