import { ContractContextProvider } from '../src/contexts/ContractContext';

export default (story) => <ContractContextProvider>{story()}</ContractContextProvider> 