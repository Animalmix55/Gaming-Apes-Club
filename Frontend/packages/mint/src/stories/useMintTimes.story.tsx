import { Spinner } from '@fluentui/react';
import React from 'react';
import { useMintTimes } from '../hooks/useMintTimes';

export default {
    title: 'Mint/Hooks/UseMintTimes',
};

export const StandAlone = (): JSX.Element => {
    const { data: mintTimes } = useMintTimes();

    if (!mintTimes) return <Spinner />;

    const { public: publicMint, private: privateMint } = mintTimes;

    return (
        <>
            <div>Public Start: {publicMint.start}</div>
            <div>Whitelist Start: {privateMint.start}</div>
            <div>Whitelist End: {privateMint.end}</div>
        </>
    );
};
