/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// import {
//     Eip2612PermitUtils,
//     Web3ProviderConnector,
//     PermitParams,
// } from '@1inch/permit-signed-approvals-utils';
import { SentOffChain } from '../types/truffle-contracts/GACStakingAncilary';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const truffleAssert = require('truffle-assertions');

const GACStakingChild = artifacts.require('GACStakingChild');
const GACXP = artifacts.require('GACXP');
const GACStakingAncilary = artifacts.require('GACStakingAncilary');

contract('GACStakingAncilary', (accounts) => {
    const getInstance = async (txDetails: Truffle.TransactionDetails) => {
        // const chainId = await web3.eth.getChainId();
        const devAddress = accounts[9];

        const fxChild = txDetails.from ?? accounts[0];
        const GACXPInstance = await GACXP.new(devAddress, txDetails);
        const GACStakingChildInstance = await GACStakingChild.new(
            fxChild,
            devAddress,
            GACXPInstance.address,
            txDetails
        );
        const GACStakingAncilaryInstance = await GACStakingAncilary.new(
            GACStakingChildInstance.address,
            GACXPInstance.address,
            txDetails
        );

        const getPermit = async (
            amount: string,
            from: string,
            deadline: number
        ) => {
            const nonce = (
                await GACXPInstance.nonces(GACStakingAncilaryInstance.address)
            ).toNumber();
            const separator = await GACXPInstance.DOMAIN_SEPARATOR();
            const typehash = await GACXPInstance.PERMIT_TYPEHASH();

            const message = web3.utils.soliditySha3(
                '\x19\x01',
                separator,
                web3.utils.keccak256(
                    web3.eth.abi.encodeParameters(
                        [
                            'string',
                            'address',
                            'address',
                            'uint256',
                            'uint256',
                            'uint256',
                        ],
                        [
                            typehash,
                            from,
                            GACStakingAncilaryInstance.address,
                            amount,
                            nonce,
                            deadline,
                        ]
                    )
                )
            );

            if (!message) throw new Error('no message');

            const signature = web3.eth.sign(message, from);

            // const tokenName = await GACXPInstance.name();
            // const tokenAddress = GACXPInstance.address;

            // const connector = new Web3ProviderConnector(web3 as never);
            // const eip2612PermitUtils = new Eip2612PermitUtils(connector);

            // const permitParams: PermitParams = {
            //     owner: from,
            //     spender: operator,
            //     value: amount,
            //     nonce,
            //     deadline,
            // };

            // const signature = await eip2612PermitUtils.buildPermitSignature(
            //     permitParams,
            //     chainId,
            //     tokenName,
            //     tokenAddress
            // );

            return signature;
        };

        return {
            devAddress,
            GACStakingChildInstance,
            GACXPInstance,
            GACStakingAncilaryInstance,
            getPermit,
        };
    };

    it('burns GACXP and emits event', async () => {
        const { GACXPInstance, getPermit, GACStakingAncilaryInstance } =
            await getInstance({
                from: accounts[0],
            });
        const amount = web3.utils.toWei('1', 'ether');
        await GACXPInstance.mint(amount, accounts[0]);
        const deadline = 221858554209; // year 9000

        const permit = await getPermit(amount, accounts[0], deadline);
        const r = `0x${permit.slice(2, 66)}`;
        const s = `0x${permit.slice(66, 130)}`;
        let v = Number(permit.slice(130, 132)) - 27;
        if (v < 0) v += 27;

        await GACStakingAncilaryInstance.sendGACXPOffChainWithPermit(
            1234,
            amount,
            deadline,
            v,
            r,
            s
        );

        assert.equal(
            (await GACXPInstance.balanceOf(accounts[0])).toString(),
            '0'
        );
    });

    it('burns GACXP and emits event', async () => {
        const sourceAccount = accounts[1];
        const { GACXPInstance, GACStakingAncilaryInstance } = await getInstance(
            {
                from: accounts[0],
            }
        );
        const amount = web3.utils.toWei('1', 'ether');
        await GACXPInstance.mint(amount, sourceAccount, {
            from: accounts[0],
        });
        await GACXPInstance.approve(
            GACStakingAncilaryInstance.address,
            amount,
            { from: sourceAccount }
        );

        const tx = await GACStakingAncilaryInstance.sendGACXPOffChain(
            '1234',
            amount,
            {
                from: sourceAccount,
            }
        );
        assert.equal(
            (await GACXPInstance.balanceOf(sourceAccount)).toString(),
            '0'
        );
        truffleAssert.eventEmitted(
            tx,
            'SentOffChain',
            (ev: SentOffChain['args']) => {
                assert.equal(ev.userId.toString(), '1234');
                assert.equal(ev.amount.toString(), amount);
                return true;
            }
        );
    });
});
