// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@rari-capital/solmate/src/tokens/ERC20.sol";
import "./access/DeveloperAccess.sol";
import "./interfaces/IGACXP.sol";

/**
 * The official on-chain GACXP token meant to be hosted on Polygon (MATIC)
 *
 * Author: Cory Cherven (Animalmix55/ToxicPizza)
 */
contract GACXP is ERC20, IGACXP, Ownable, DeveloperAccess, ReentrancyGuard {
    bool public mintingPaused;

    /**
     * A mapping of addresses to mint allowances. For granting other communities the right to mint.
     */
    mapping(address => uint256) private _mintAllowance;

    constructor(address devAddress)
        ERC20("GACXP", "GACXP", 18)
        DeveloperAccess(devAddress)
    {}

    // -------------------------------------------- OWNER/DEV ONLY ----------------------------------------

    /**
     * @dev Throws if called by any account other than the developer/owner.
     */
    modifier onlyOwnerOrDeveloper() {
        require(
            developer() == _msgSender() || owner() == _msgSender(),
            "Ownable: caller is not the owner or developer"
        );
        _;
    }

    /**
     * Updates the allowance for the given user to mint. Set to zero to revoke.
     *
     * @dev This functionality programatically enables allowing other platforms to
     *      distribute the token on our behalf.
     */
    function updateMintAllowance(address user, uint256 amount)
        external
        onlyOwnerOrDeveloper
    {
        _mintAllowance[user] = amount;
    }

    /**
     * Pauses or resumes minting. Good for stopping all mints.
     */
    function setMintingPaused(bool paused) external onlyOwnerOrDeveloper {
        mintingPaused = paused;
    }

    // -------------------------------------------- PUBLIC -------------------------------------------------

    /**
     * Mints to the given account from the sender provided the sender is authorized.
     */
    function mint(uint256 amount, address to) external nonReentrant {
        require(
            !mintingPaused ||
                msg.sender == owner() ||
                msg.sender == developer(),
            "Minting paused"
        );

        _reduceMintAllowance(msg.sender, amount);
        _mint(to, amount);
    }

    /**
     * Mints to the given accounts from the sender provided the sender is authorized.
     */
    function bulkMint(uint256[] calldata amounts, address[] calldata to)
        external
        nonReentrant
    {
        require(
            !mintingPaused ||
                msg.sender == owner() ||
                msg.sender == developer(),
            "Minting paused"
        );
        require(amounts.length == to.length, "Length mismatch");
        uint256 totalMinted;

        for (uint256 i; i < amounts.length; i++) {
            totalMinted += amounts[i]; // fails on underflow
            _mint(to[i], amounts[i]);
        }

        _reduceMintAllowance(msg.sender, totalMinted);
    }

    /**
     * Burns the given amount for the user provided the sender is authorized.
     */
    function burn(address from, uint256 amount) external {
        uint256 allowed = allowance[from][msg.sender]; // Saves gas for limited approvals.
        if (from != msg.sender && allowed != type(uint256).max)
            allowance[from][msg.sender] = allowed - amount; // fails on underflow

        _burn(from, amount);
    }

    /**
     * Gets the amount of mints the user is entitled to.
     */
    function getMintAllowance(address user) external view returns (uint256) {
        return _getMintAllowance(user);
    }

    // -------------------------------------------- INTERNAL -----------------------------------------------

    /**
     * Returns the amount of tokens the user is allowed to mint.
     */
    function _getMintAllowance(address user) internal view returns (uint256) {
        if (user == developer() || user == owner()) return type(uint256).max;

        return _mintAllowance[user];
    }

    /**
     * Reduces the amount of tokens the user is allowed to mint.
     * @dev does nothing for dev/owner.
     */
    function _reduceMintAllowance(address user, uint256 amount) internal {
        if (user == developer() || user == owner()) return;

        _mintAllowance[user] -= amount;
    }
}
