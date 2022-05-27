/* eslint-disable no-void */
import React from 'react';

export interface StakingContextType {
    tokenIdsToStake: string[];
    tokenIdsToUnstake: string[];
    setTokenIdsToStake: React.Dispatch<React.SetStateAction<string[]>>;
    setTokenIdsToUnstake: React.Dispatch<React.SetStateAction<string[]>>;
}

export const StakingContext = React.createContext<StakingContextType>({
    tokenIdsToStake: [],
    tokenIdsToUnstake: [],
    setTokenIdsToStake: () => void 0,
    setTokenIdsToUnstake: () => void 0,
});

export const StakingContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [tokenIdsToStake, setTokenIdsToStake] = React.useState<string[]>([]);
    const [tokenIdsToUnstake, setTokenIdsToUnstake] = React.useState<string[]>(
        []
    );

    return (
        <StakingContext.Provider
            value={{
                tokenIdsToStake,
                setTokenIdsToStake,
                tokenIdsToUnstake,
                setTokenIdsToUnstake,
            }}
        >
            {children}
        </StakingContext.Provider>
    );
};

export const useStakingContext = (): StakingContextType =>
    React.useContext(StakingContext);
