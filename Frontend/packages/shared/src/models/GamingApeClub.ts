/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type Approval = ContractEventLog<{
  owner: string;
  approved: string;
  tokenId: string;
  0: string;
  1: string;
  2: string;
}>;
export type ApprovalForAll = ContractEventLog<{
  owner: string;
  operator: string;
  approved: boolean;
  0: string;
  1: string;
  2: boolean;
}>;
export type DevelopershipTransferred = ContractEventLog<{
  previousDeveloper: string;
  newDeveloper: string;
  0: string;
  1: string;
}>;
export type OwnershipTransferred = ContractEventLog<{
  previousOwner: string;
  newOwner: string;
  0: string;
  1: string;
}>;
export type Transfer = ContractEventLog<{
  from: string;
  to: string;
  tokenId: string;
  0: string;
  1: string;
  2: string;
}>;

export interface GamingApeClub extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): GamingApeClub;
  clone(): GamingApeClub;
  methods: {
    /**
     * See {IERC721-approve}.
     */
    approve(
      to: string,
      tokenId: number | string | BN
    ): NonPayableTransactionObject<void>;

    /**
     * See {IERC721-balanceOf}.
     */
    balanceOf(owner: string): NonPayableTransactionObject<string>;

    /**
     * Returns the address of the current developer.
     */
    developer(): NonPayableTransactionObject<string>;

    /**
     * See {IERC721-getApproved}.
     */
    getApproved(
      tokenId: number | string | BN
    ): NonPayableTransactionObject<string>;

    /**
     * See {IERC721-isApprovedForAll}.
     */
    isApprovedForAll(
      owner: string,
      operator: string
    ): NonPayableTransactionObject<boolean>;

    maxPerWallet(): NonPayableTransactionObject<string>;

    maximumSupply(): NonPayableTransactionObject<string>;

    mintPrice(): NonPayableTransactionObject<string>;

    /**
     * See {IERC721Metadata-name}.
     */
    name(): NonPayableTransactionObject<string>;

    /**
     * Returns the address of the current owner.
     */
    owner(): NonPayableTransactionObject<string>;

    /**
     * See {IERC721-ownerOf}.
     */
    ownerOf(tokenId: number | string | BN): NonPayableTransactionObject<string>;

    publicStart(): NonPayableTransactionObject<string>;

    /**
     * Leaves the contract without developer. It will not be possible to call `onlyDeveloper` functions anymore. Can only be called by the current developer. NOTE: Renouncing developership will leave the contract without an developer, thereby removing any functionality that is only available to the developer.
     */
    renounceDevelopership(): NonPayableTransactionObject<void>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(): NonPayableTransactionObject<void>;

    /**
     * See {IERC721-safeTransferFrom}.
     */
    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: number | string | BN
    ): NonPayableTransactionObject<void>;

    /**
     * See {IERC721-safeTransferFrom}.
     */
    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: number | string | BN,
      _data: string | number[]
    ): NonPayableTransactionObject<void>;

    /**
     * See {IERC721-setApprovalForAll}.
     */
    setApprovalForAll(
      operator: string,
      approved: boolean
    ): NonPayableTransactionObject<void>;

    /**
     * See {IERC165-supportsInterface}.
     */
    supportsInterface(
      interfaceId: string | number[]
    ): NonPayableTransactionObject<boolean>;

    /**
     * See {IERC721Metadata-symbol}.
     */
    symbol(): NonPayableTransactionObject<string>;

    /**
     * See {IERC721Enumerable-tokenByIndex}. This read function is O(totalSupply). If calling from a separate contract, be sure to test gas first. It may also degrade with extremely large collection sizes (e.g >> 10000), test for your use case.
     */
    tokenByIndex(
      index: number | string | BN
    ): NonPayableTransactionObject<string>;

    /**
     * See {IERC721Enumerable-tokenOfOwnerByIndex}. This read function is O(totalSupply). If calling from a separate contract, be sure to test gas first. It may also degrade with extremely large collection sizes (e.g >> 10000), test for your use case.
     */
    tokenOfOwnerByIndex(
      owner: string,
      index: number | string | BN
    ): NonPayableTransactionObject<string>;

    /**
     * See {IERC721Metadata-tokenURI}.
     */
    tokenURI(
      tokenId: number | string | BN
    ): NonPayableTransactionObject<string>;

    /**
     * See {IERC721Enumerable-totalSupply}.
     */
    totalSupply(): NonPayableTransactionObject<string>;

    /**
     * Transfers developership of the contract to a new account (`newDeveloper`). Can only be called by the current developer.
     */
    transferDevelopership(
      newDeveloper: string
    ): NonPayableTransactionObject<void>;

    /**
     * See {IERC721-transferFrom}.
     */
    transferFrom(
      from: string,
      to: string,
      tokenId: number | string | BN
    ): NonPayableTransactionObject<void>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(newOwner: string): NonPayableTransactionObject<void>;

    /**
     * Verifies that a given leaf lives under the provided root based on the proof.
     * @param leaf - the leaf you are proving exists in the tree (keccak hash)
     * @param proof - the proof that verifies that the given leaf exists under that root.
     * @param root - the root of the merkle tree (keccak hash)
     */
    verify(
      root: string | number[],
      leaf: string | number[],
      proof: (string | number[])[]
    ): NonPayableTransactionObject<boolean>;

    whitelistEnd(): NonPayableTransactionObject<string>;

    whitelistReset(): NonPayableTransactionObject<string>;

    whitelistStart(): NonPayableTransactionObject<string>;

    /**
     * Allows for the owner to mint for free.
     * @param quantity - the quantity to mint.
     * @param to - the address to recieve that minted quantity.
     */
    ownerMint(
      quantity: number | string | BN,
      to: string
    ): NonPayableTransactionObject<void>;

    /**
     * Sets the wallet max for both sales
     * @param newMax - the new wallet max for the two sales
     */
    setMaxPerWallet(
      newMax: number | string | BN
    ): NonPayableTransactionObject<void>;

    /**
     * be sure to terminate with a slash
     * Sets the base URI for all tokens
     * @param uri - the target base uri (ex: 'https://google.com/')
     */
    setBaseURI(uri: string): NonPayableTransactionObject<void>;

    /**
     * Updates the mint price
     * @param price - the price in WEI
     */
    setMintPrice(
      price: number | string | BN
    ): NonPayableTransactionObject<void>;

    /**
     * Updates the merkle root
     * @param root - the new merkle root
     */
    setMerkleRoot(root: string | number[]): NonPayableTransactionObject<void>;

    /**
     * Updates the mint dates.
     * @param pubStartDate - the start date for public in UNIX seconds.
     * @param wlEndDate - the end date for whitelist in UNIX seconds.
     * @param wlResetDate - the reset date for whitelist in UNIX seconds.
     * @param wlStartDate - the start date for whitelist in UNIX seconds.
     */
    setMintDates(
      wlStartDate: number | string | BN,
      wlResetDate: number | string | BN,
      wlEndDate: number | string | BN,
      pubStartDate: number | string | BN
    ): NonPayableTransactionObject<void>;

    /**
     * Withdraws balance from the contract to the dividend recipients within.
     */
    withdraw(): NonPayableTransactionObject<void>;

    /**
     * A handy getter to retrieve the number of private mints conducted by a user.
     * @param postReset - retrieves the number of mints after the whitelist reset.
     * @param user - the user to query for.
     */
    getPresaleMints(
      user: string,
      postReset: boolean
    ): NonPayableTransactionObject<string>;

    /**
     * A handy getter to retrieve the number of public mints conducted by a user.
     * @param user - the user to query for.
     */
    getPublicMints(user: string): NonPayableTransactionObject<string>;

    /**
     * Mints in the premint stage by using a signed transaction from a merkle tree whitelist.
     * @param amount - the amount of tokens to mint. Will fail if exceeds allowable amount.
     * @param proof - the merkle proof from the root to the whitelisted address.
     */
    premint(
      amount: number | string | BN,
      proof: (string | number[])[]
    ): PayableTransactionObject<void>;

    /**
     * Mints one token provided it is possible to.This function allows minting in the public sale.
     */
    mint(amount: number | string | BN): PayableTransactionObject<void>;

    /**
     * Burns the provided token id if you own it. Reduces the supply by 1.
     * @param tokenId - the ID of the token to be burned.
     */
    burn(tokenId: number | string | BN): NonPayableTransactionObject<void>;
  };
  events: {
    Approval(cb?: Callback<Approval>): EventEmitter;
    Approval(options?: EventOptions, cb?: Callback<Approval>): EventEmitter;

    ApprovalForAll(cb?: Callback<ApprovalForAll>): EventEmitter;
    ApprovalForAll(
      options?: EventOptions,
      cb?: Callback<ApprovalForAll>
    ): EventEmitter;

    DevelopershipTransferred(
      cb?: Callback<DevelopershipTransferred>
    ): EventEmitter;
    DevelopershipTransferred(
      options?: EventOptions,
      cb?: Callback<DevelopershipTransferred>
    ): EventEmitter;

    OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter;
    OwnershipTransferred(
      options?: EventOptions,
      cb?: Callback<OwnershipTransferred>
    ): EventEmitter;

    Transfer(cb?: Callback<Transfer>): EventEmitter;
    Transfer(options?: EventOptions, cb?: Callback<Transfer>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "Approval", cb: Callback<Approval>): void;
  once(event: "Approval", options: EventOptions, cb: Callback<Approval>): void;

  once(event: "ApprovalForAll", cb: Callback<ApprovalForAll>): void;
  once(
    event: "ApprovalForAll",
    options: EventOptions,
    cb: Callback<ApprovalForAll>
  ): void;

  once(
    event: "DevelopershipTransferred",
    cb: Callback<DevelopershipTransferred>
  ): void;
  once(
    event: "DevelopershipTransferred",
    options: EventOptions,
    cb: Callback<DevelopershipTransferred>
  ): void;

  once(event: "OwnershipTransferred", cb: Callback<OwnershipTransferred>): void;
  once(
    event: "OwnershipTransferred",
    options: EventOptions,
    cb: Callback<OwnershipTransferred>
  ): void;

  once(event: "Transfer", cb: Callback<Transfer>): void;
  once(event: "Transfer", options: EventOptions, cb: Callback<Transfer>): void;
}
