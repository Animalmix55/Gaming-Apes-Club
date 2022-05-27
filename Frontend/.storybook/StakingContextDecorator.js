import { StakingContextProvider } from '@gac/staking/src/contexts/StakingContext';

export default (story) => <StakingContextProvider>{story()}</StakingContextProvider> 