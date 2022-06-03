// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./GACXP.sol";

/*
 * This contract enables a couple of auxilary features of GAC Staking.
 *
 * 1. Burning GACXP for conversion to off-chain GACXP
 * 2. Using Collab.Land to manage stake
 */
contract GACStakingAncilary is IERC721 {
    event SentOffChain(uint256 indexed userId, uint256 amount);

    IERC721 public GACStakingChild;
    GACXP public OnChainGACXP;

    /**
     * The constructor. Points at the proper GACStakingChild and GACXP contracts.
     */
    constructor(address gacStakingChild, address gacxp) {
        GACStakingChild = IERC721(gacStakingChild);
        OnChainGACXP = GACXP(gacxp);
    }

    /**
     * Sends GACXP off-chain by burning it and emitting a special event.
     * Uses a permit.
     *
     * @dev utilizes a permit to move the funds.
     */
    function sendGACXPOffChainWithPermit(
        uint256 userId,
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        OnChainGACXP.permit(msg.sender, address(this), amount, deadline, v, r, s);
        OnChainGACXP.burn(msg.sender, amount);

        emit SentOffChain(userId, amount);
    }

    /**
     * Sends GACXP off-chain by burning it and emitting a special event.
     */
    function sendGACXPOffChain(uint256 userId, uint256 amount) external {
        OnChainGACXP.transferFrom(msg.sender, address(this), amount);
        OnChainGACXP.burn(address(this), amount);

        emit SentOffChain(userId, amount);
    }

    /**
     * Gets the amount of GamingApeClub tokens the user has staked.
     */
    function balanceOf(address owner) external view override returns (uint256) {
        return GACStakingChild.balanceOf(owner);
    }

    function supportsInterface(bytes4 interfaceId)
        external
        pure
        returns (bool)
    {
        return interfaceId == type(IERC721).interfaceId;
    }

    // --------------------------------------- NONSENSE FUNCTIONLESS STUFF ---------------------------------------------

    function ownerOf(uint256) external pure override returns (address) {
        return address(0);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external override {}

    function transferFrom(
        address,
        address,
        uint256
    ) external override {}

    function approve(address, uint256) external override {}

    function getApproved(uint256) external pure override returns (address) {
        return address(0);
    }

    function setApprovalForAll(address, bool) external override {}

    function isApprovedForAll(address, address)
        external
        pure
        override
        returns (bool)
    {
        return false;
    }

    function safeTransferFrom(
        address,
        address,
        uint256,
        bytes calldata
    ) external override {}
}
