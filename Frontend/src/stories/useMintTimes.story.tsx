import React from 'react';
import useMintTimes from '../hooks/useMintTimes';

export default {
    title: 'Hooks/UseMintTimes',
};

export const StandAlone = (): JSX.Element => {
    const mintTimes = useMintTimes(0);
    const { public: publicMint, private: privateMint } = mintTimes;

    return (
        <>
            <div>Public Start: {publicMint.start}</div>
            <div>Whitelist Start: {privateMint.start}</div>
            <div>Whitelist End: {privateMint.end}</div>
        </>
    );
};
