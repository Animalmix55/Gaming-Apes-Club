import React from 'react';
import { useMutation } from '@gac/shared';
import {
    signPermit,
    useGACStakingAncilaryContract,
    useGACXPContract,
    useWeb3,
} from '@gac/shared-v2';
import { UseMutationResult } from 'react-query';
import { BigNumber } from 'ethers';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';
import { useAuthorizationContext } from '../../contexts/AuthorizationContext';

export const useGACXPMigrator = (): UseMutationResult<
    void,
    unknown,
    [amount: BigNumber],
    unknown
> => {
    const { gacStakingAncilaryAddress, gacXPAddress, chainId } =
        useGamingApeContext();
    const { claims } = useAuthorizationContext();
    const { provider, readonly, accounts } = useWeb3(chainId);
    const account = accounts?.[0];

    const gacStakingAncilaryContract = useGACStakingAncilaryContract(
        provider,
        gacStakingAncilaryAddress,
        readonly
    );
    const gacXPContract = useGACXPContract(provider, gacXPAddress, readonly);

    const query = React.useCallback(
        async (amount: BigNumber) => {
            if (!provider) throw new Error('Missing provider');
            if (!account) throw new Error('Missing account');
            if (!claims) throw new Error('Not logged in');
            if (!gacXPContract) throw new Error('Missing GACXP');
            if (!gacStakingAncilaryAddress)
                throw new Error('Missing Staking Ancilary Address');
            if (!gacStakingAncilaryContract)
                throw new Error('Missing Staking Ancilary Contract');

            const { id } = claims;
            if (!id) throw new Error('Missing user id');

            const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 3; // 3 hours

            const { r, s, v } = await signPermit(
                provider,
                gacXPContract,
                gacStakingAncilaryAddress,
                amount.toString(),
                deadline
            );

            await gacStakingAncilaryContract.functions.sendGACXPOffChainWithPermit(
                id,
                amount,
                deadline,
                v,
                r,
                s
            );
        },
        [
            provider,
            account,
            claims,
            gacXPContract,
            gacStakingAncilaryAddress,
            gacStakingAncilaryContract,
        ]
    );

    const result = useMutation(query, {
        onSuccess: () => {
            // stuff
        },
    });

    return result;
};

export default useGACXPMigrator;