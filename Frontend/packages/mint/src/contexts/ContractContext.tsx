import React from 'react';
import { GamingApeClub } from '../models/GamingApeClub';
import { useGamingApeContext } from './GamingApeClubContext';
import { useProvider } from './ProviderContext';
import tokenAbi from '../assets/web3/TokenABI.json';

export interface ContractContextType {
    tokenContract?: GamingApeClub;
}

const ContractContext = React.createContext<ContractContextType>({});

export const useContractContext = (): ContractContextType =>
    React.useContext(ContractContext);

export const ContractContextProvider = ({
    children,
}: {
    children: React.ReactChild;
}): JSX.Element => {
    const { web3 } = useProvider();
    const { tokenAddress } = useGamingApeContext();

    const tokenContract = React.useMemo(() => {
        if (!tokenAddress) return undefined;
        if (!web3) return undefined;

        const token = new web3.eth.Contract(
            tokenAbi as never,
            tokenAddress
        ) as unknown as GamingApeClub;
        return token;
    }, [tokenAddress, web3]);

    return (
        <ContractContext.Provider
            value={{
                tokenContract,
            }}
        >
            {children}
        </ContractContext.Provider>
    );
};
