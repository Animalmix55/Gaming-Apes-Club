import {
    Button,
    ButtonType,
    useConfirmationContext,
    useIsApprovedForAll,
    useWeb3,
} from '@gac/shared-v2';
import React from 'react';
import { useAppConfiguration } from '../contexts/AppConfigurationContext';
import { useApproverForAll } from '../web3/hooks/useApproverForAll';

export interface ApprovalButtonProps {
    tokenAddress?: string;
    owner?: string;
    operator?: string;
    className?: string;
    /**
     * An element to render when approved.
     */
    whenApproved?: JSX.Element;
    themeType?: ButtonType;
}

export const ApprovalButton = (
    props: ApprovalButtonProps
): JSX.Element | null => {
    const {
        tokenAddress,
        operator,
        owner,
        className,
        themeType,
        whenApproved,
    } = props;
    const { GamingApeClubAddress, EthereumChainId } = useAppConfiguration();
    const { provider } = useWeb3(EthereumChainId);

    const { data: isApproved } = useIsApprovedForAll(
        provider,
        tokenAddress,
        owner,
        operator
    );

    const approver = useApproverForAll(GamingApeClubAddress);
    const confirm = useConfirmationContext();

    const onClick = React.useCallback(async () => {
        if (!operator) return;
        const response = await confirm(
            'Are you sure?',
            'Approving allows our staking contract to move your GAC NFTs to the staking pool. It does not stake the tokens, that is done in a separate transaction.'
        );

        if (!response) return;

        approver.mutate([operator, true]);
    }, [approver, confirm, operator]);

    if (isApproved) return whenApproved ?? null;
    return (
        <Button
            className={className}
            themeType={themeType}
            text="Approve"
            onClick={onClick}
        />
    );
};

export default ApprovalButton;
