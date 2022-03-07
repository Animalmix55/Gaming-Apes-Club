import { ContractContextProvider } from '@gac/mint/src/contexts/ContractContext';

export default (story) => <ContractContextProvider>{story()}</ContractContextProvider> 