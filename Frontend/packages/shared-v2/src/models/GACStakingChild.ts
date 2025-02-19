/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface GACStakingChildInterface extends utils.Interface {
  functions: {
    "GACXP()": FunctionFragment;
    "developer()": FunctionFragment;
    "firstTimeBonus()": FunctionFragment;
    "fxChild()": FunctionFragment;
    "fxRootTunnel()": FunctionFragment;
    "owner()": FunctionFragment;
    "processMessageFromRoot(uint256,address,bytes)": FunctionFragment;
    "renounceDevelopership()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "rewards(uint128)": FunctionFragment;
    "stakes(address)": FunctionFragment;
    "transferDevelopership(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "setFxRootTunnel(address)": FunctionFragment;
    "manuallyUpdateStake(address,uint128)": FunctionFragment;
    "manuallyUpdateBulkStakes(address[],uint128[])": FunctionFragment;
    "setFirstTimeBonus(uint256)": FunctionFragment;
    "setRewards(uint128[],uint128[])": FunctionFragment;
    "claimReward()": FunctionFragment;
    "getReward(address)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "dumpRewards()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "GACXP"
      | "developer"
      | "firstTimeBonus"
      | "fxChild"
      | "fxRootTunnel"
      | "owner"
      | "processMessageFromRoot"
      | "renounceDevelopership"
      | "renounceOwnership"
      | "rewards"
      | "stakes"
      | "transferDevelopership"
      | "transferOwnership"
      | "setFxRootTunnel"
      | "manuallyUpdateStake"
      | "manuallyUpdateBulkStakes"
      | "setFirstTimeBonus"
      | "setRewards"
      | "claimReward"
      | "getReward"
      | "balanceOf"
      | "dumpRewards"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "GACXP", values?: undefined): string;
  encodeFunctionData(functionFragment: "developer", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "firstTimeBonus",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "fxChild", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "fxRootTunnel",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "processMessageFromRoot",
    values: [BigNumberish, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceDevelopership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewards",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "stakes", values: [string]): string;
  encodeFunctionData(
    functionFragment: "transferDevelopership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setFxRootTunnel",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "manuallyUpdateStake",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "manuallyUpdateBulkStakes",
    values: [string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setFirstTimeBonus",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setRewards",
    values: [BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "claimReward",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getReward", values: [string]): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "dumpRewards",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "GACXP", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "developer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "firstTimeBonus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fxChild", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "fxRootTunnel",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "processMessageFromRoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceDevelopership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rewards", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stakes", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferDevelopership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFxRootTunnel",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "manuallyUpdateStake",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "manuallyUpdateBulkStakes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFirstTimeBonus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setRewards", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getReward", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "dumpRewards",
    data: BytesLike
  ): Result;

  events: {
    "DevelopershipTransferred(address,address)": EventFragment;
    "MessageSent(bytes)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DevelopershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MessageSent"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface DevelopershipTransferredEventObject {
  previousDeveloper: string;
  newDeveloper: string;
}
export type DevelopershipTransferredEvent = TypedEvent<
  [string, string],
  DevelopershipTransferredEventObject
>;

export type DevelopershipTransferredEventFilter =
  TypedEventFilter<DevelopershipTransferredEvent>;

export interface MessageSentEventObject {
  message: string;
}
export type MessageSentEvent = TypedEvent<[string], MessageSentEventObject>;

export type MessageSentEventFilter = TypedEventFilter<MessageSentEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface GACStakingChild extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GACStakingChildInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    GACXP(overrides?: CallOverrides): Promise<[string]>;

    /**
     * Returns the address of the current developer.
     */
    developer(overrides?: CallOverrides): Promise<[string]>;

    firstTimeBonus(overrides?: CallOverrides): Promise<[BigNumber]>;

    fxChild(overrides?: CallOverrides): Promise<[string]>;

    fxRootTunnel(overrides?: CallOverrides): Promise<[string]>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<[string]>;

    processMessageFromRoot(
      stateId: BigNumberish,
      rootMessageSender: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    /**
     * Leaves the contract without developer. It will not be possible to call `onlyDeveloper` functions anymore. Can only be called by the current developer. NOTE: Renouncing developership will leave the contract without an developer, thereby removing any functionality that is only available to the developer.
     */
    renounceDevelopership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    /**
     * A linked list of reward tiers based on holdings
     */
    rewards(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; nextTier: BigNumber }
    >;

    /**
     * Users' stakes mapped from their address
     */
    stakes(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, boolean] & {
        amount: BigNumber;
        lastUpdated: BigNumber;
        hasClaimed: boolean;
      }
    >;

    /**
     * Transfers developership of the contract to a new account (`newDeveloper`). Can only be called by the current developer.
     */
    transferDevelopership(
      newDeveloper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    /**
     * Sets/updates the address for the root tunnel
     * @param _fxRootTunnel - the fxRootTunnel address
     */
    setFxRootTunnel(
      _fxRootTunnel: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    /**
     * this will claim any existing rewards and reset timers.
     * A manual override functionality to allow an admit to update a user's stake.
     * @param amount - the amount to set the user's stake to.
     * @param user - the user whose stake is being updated.
     */
    manuallyUpdateStake(
      user: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    /**
     * this will claim any existing rewards and reset timers.
     * A manual override functionality to allow an admit to update many users' stakes.
     * @param amounts - the amounts to set the associated user's stake to.
     * @param users - the users whose stakes are being updated.
     */
    manuallyUpdateBulkStakes(
      users: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    /**
     * Sets/updates the bonus for claiming for the first time.
     * @param _bonus - the new bonus
     */
    setFirstTimeBonus(
      _bonus: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    /**
     * Resets the reward calculation schema.
     * @param amounts - a list of held amounts in increasing order.
     * @param newRewards - a parallel list to amounts containing the summative yields per period for the respective amount.
     */
    setRewards(
      amounts: BigNumberish[],
      newRewards: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    /**
     * Claims the pending reward for the transaction sender.
     */
    claimReward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    /**
     * Gets the pending reward for the provided user.
     * @param user - the user whose reward is being sought.
     */
    getReward(user: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    /**
     * a duplicate stakes(user).amount.
     * Tricks collab.land and other ERC721 balance checkers into believing that the user has a balance.
     * @param user - the user to get the balance of.
     */
    balanceOf(user: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    /**
     * Dumps the rewards currently programmed in per tier as two parallel arrays defining (amount, yield) pairs.
     */
    dumpRewards(overrides?: CallOverrides): Promise<[BigNumber[], BigNumber[]]>;
  };

  GACXP(overrides?: CallOverrides): Promise<string>;

  /**
   * Returns the address of the current developer.
   */
  developer(overrides?: CallOverrides): Promise<string>;

  firstTimeBonus(overrides?: CallOverrides): Promise<BigNumber>;

  fxChild(overrides?: CallOverrides): Promise<string>;

  fxRootTunnel(overrides?: CallOverrides): Promise<string>;

  /**
   * Returns the address of the current owner.
   */
  owner(overrides?: CallOverrides): Promise<string>;

  processMessageFromRoot(
    stateId: BigNumberish,
    rootMessageSender: string,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  /**
   * Leaves the contract without developer. It will not be possible to call `onlyDeveloper` functions anymore. Can only be called by the current developer. NOTE: Renouncing developership will leave the contract without an developer, thereby removing any functionality that is only available to the developer.
   */
  renounceDevelopership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  /**
   * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
   */
  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  /**
   * A linked list of reward tiers based on holdings
   */
  rewards(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amount: BigNumber; nextTier: BigNumber }
  >;

  /**
   * Users' stakes mapped from their address
   */
  stakes(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, boolean] & {
      amount: BigNumber;
      lastUpdated: BigNumber;
      hasClaimed: boolean;
    }
  >;

  /**
   * Transfers developership of the contract to a new account (`newDeveloper`). Can only be called by the current developer.
   */
  transferDevelopership(
    newDeveloper: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  /**
   * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
   */
  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  /**
   * Sets/updates the address for the root tunnel
   * @param _fxRootTunnel - the fxRootTunnel address
   */
  setFxRootTunnel(
    _fxRootTunnel: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  /**
   * this will claim any existing rewards and reset timers.
   * A manual override functionality to allow an admit to update a user's stake.
   * @param amount - the amount to set the user's stake to.
   * @param user - the user whose stake is being updated.
   */
  manuallyUpdateStake(
    user: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  /**
   * this will claim any existing rewards and reset timers.
   * A manual override functionality to allow an admit to update many users' stakes.
   * @param amounts - the amounts to set the associated user's stake to.
   * @param users - the users whose stakes are being updated.
   */
  manuallyUpdateBulkStakes(
    users: string[],
    amounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  /**
   * Sets/updates the bonus for claiming for the first time.
   * @param _bonus - the new bonus
   */
  setFirstTimeBonus(
    _bonus: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  /**
   * Resets the reward calculation schema.
   * @param amounts - a list of held amounts in increasing order.
   * @param newRewards - a parallel list to amounts containing the summative yields per period for the respective amount.
   */
  setRewards(
    amounts: BigNumberish[],
    newRewards: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  /**
   * Claims the pending reward for the transaction sender.
   */
  claimReward(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  /**
   * Gets the pending reward for the provided user.
   * @param user - the user whose reward is being sought.
   */
  getReward(user: string, overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * a duplicate stakes(user).amount.
   * Tricks collab.land and other ERC721 balance checkers into believing that the user has a balance.
   * @param user - the user to get the balance of.
   */
  balanceOf(user: string, overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * Dumps the rewards currently programmed in per tier as two parallel arrays defining (amount, yield) pairs.
   */
  dumpRewards(overrides?: CallOverrides): Promise<[BigNumber[], BigNumber[]]>;

  callStatic: {
    GACXP(overrides?: CallOverrides): Promise<string>;

    /**
     * Returns the address of the current developer.
     */
    developer(overrides?: CallOverrides): Promise<string>;

    firstTimeBonus(overrides?: CallOverrides): Promise<BigNumber>;

    fxChild(overrides?: CallOverrides): Promise<string>;

    fxRootTunnel(overrides?: CallOverrides): Promise<string>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<string>;

    processMessageFromRoot(
      stateId: BigNumberish,
      rootMessageSender: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Leaves the contract without developer. It will not be possible to call `onlyDeveloper` functions anymore. Can only be called by the current developer. NOTE: Renouncing developership will leave the contract without an developer, thereby removing any functionality that is only available to the developer.
     */
    renounceDevelopership(overrides?: CallOverrides): Promise<void>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    /**
     * A linked list of reward tiers based on holdings
     */
    rewards(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; nextTier: BigNumber }
    >;

    /**
     * Users' stakes mapped from their address
     */
    stakes(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, boolean] & {
        amount: BigNumber;
        lastUpdated: BigNumber;
        hasClaimed: boolean;
      }
    >;

    /**
     * Transfers developership of the contract to a new account (`newDeveloper`). Can only be called by the current developer.
     */
    transferDevelopership(
      newDeveloper: string,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Sets/updates the address for the root tunnel
     * @param _fxRootTunnel - the fxRootTunnel address
     */
    setFxRootTunnel(
      _fxRootTunnel: string,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * this will claim any existing rewards and reset timers.
     * A manual override functionality to allow an admit to update a user's stake.
     * @param amount - the amount to set the user's stake to.
     * @param user - the user whose stake is being updated.
     */
    manuallyUpdateStake(
      user: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * this will claim any existing rewards and reset timers.
     * A manual override functionality to allow an admit to update many users' stakes.
     * @param amounts - the amounts to set the associated user's stake to.
     * @param users - the users whose stakes are being updated.
     */
    manuallyUpdateBulkStakes(
      users: string[],
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Sets/updates the bonus for claiming for the first time.
     * @param _bonus - the new bonus
     */
    setFirstTimeBonus(
      _bonus: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Resets the reward calculation schema.
     * @param amounts - a list of held amounts in increasing order.
     * @param newRewards - a parallel list to amounts containing the summative yields per period for the respective amount.
     */
    setRewards(
      amounts: BigNumberish[],
      newRewards: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Claims the pending reward for the transaction sender.
     */
    claimReward(overrides?: CallOverrides): Promise<void>;

    /**
     * Gets the pending reward for the provided user.
     * @param user - the user whose reward is being sought.
     */
    getReward(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * a duplicate stakes(user).amount.
     * Tricks collab.land and other ERC721 balance checkers into believing that the user has a balance.
     * @param user - the user to get the balance of.
     */
    balanceOf(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Dumps the rewards currently programmed in per tier as two parallel arrays defining (amount, yield) pairs.
     */
    dumpRewards(overrides?: CallOverrides): Promise<[BigNumber[], BigNumber[]]>;
  };

  filters: {
    "DevelopershipTransferred(address,address)"(
      previousDeveloper?: string | null,
      newDeveloper?: string | null
    ): DevelopershipTransferredEventFilter;
    DevelopershipTransferred(
      previousDeveloper?: string | null,
      newDeveloper?: string | null
    ): DevelopershipTransferredEventFilter;

    "MessageSent(bytes)"(message?: null): MessageSentEventFilter;
    MessageSent(message?: null): MessageSentEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    GACXP(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Returns the address of the current developer.
     */
    developer(overrides?: CallOverrides): Promise<BigNumber>;

    firstTimeBonus(overrides?: CallOverrides): Promise<BigNumber>;

    fxChild(overrides?: CallOverrides): Promise<BigNumber>;

    fxRootTunnel(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<BigNumber>;

    processMessageFromRoot(
      stateId: BigNumberish,
      rootMessageSender: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    /**
     * Leaves the contract without developer. It will not be possible to call `onlyDeveloper` functions anymore. Can only be called by the current developer. NOTE: Renouncing developership will leave the contract without an developer, thereby removing any functionality that is only available to the developer.
     */
    renounceDevelopership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    /**
     * A linked list of reward tiers based on holdings
     */
    rewards(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Users' stakes mapped from their address
     */
    stakes(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Transfers developership of the contract to a new account (`newDeveloper`). Can only be called by the current developer.
     */
    transferDevelopership(
      newDeveloper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    /**
     * Sets/updates the address for the root tunnel
     * @param _fxRootTunnel - the fxRootTunnel address
     */
    setFxRootTunnel(
      _fxRootTunnel: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    /**
     * this will claim any existing rewards and reset timers.
     * A manual override functionality to allow an admit to update a user's stake.
     * @param amount - the amount to set the user's stake to.
     * @param user - the user whose stake is being updated.
     */
    manuallyUpdateStake(
      user: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    /**
     * this will claim any existing rewards and reset timers.
     * A manual override functionality to allow an admit to update many users' stakes.
     * @param amounts - the amounts to set the associated user's stake to.
     * @param users - the users whose stakes are being updated.
     */
    manuallyUpdateBulkStakes(
      users: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    /**
     * Sets/updates the bonus for claiming for the first time.
     * @param _bonus - the new bonus
     */
    setFirstTimeBonus(
      _bonus: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    /**
     * Resets the reward calculation schema.
     * @param amounts - a list of held amounts in increasing order.
     * @param newRewards - a parallel list to amounts containing the summative yields per period for the respective amount.
     */
    setRewards(
      amounts: BigNumberish[],
      newRewards: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    /**
     * Claims the pending reward for the transaction sender.
     */
    claimReward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    /**
     * Gets the pending reward for the provided user.
     * @param user - the user whose reward is being sought.
     */
    getReward(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * a duplicate stakes(user).amount.
     * Tricks collab.land and other ERC721 balance checkers into believing that the user has a balance.
     * @param user - the user to get the balance of.
     */
    balanceOf(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Dumps the rewards currently programmed in per tier as two parallel arrays defining (amount, yield) pairs.
     */
    dumpRewards(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    GACXP(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Returns the address of the current developer.
     */
    developer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    firstTimeBonus(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    fxChild(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    fxRootTunnel(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    processMessageFromRoot(
      stateId: BigNumberish,
      rootMessageSender: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Leaves the contract without developer. It will not be possible to call `onlyDeveloper` functions anymore. Can only be called by the current developer. NOTE: Renouncing developership will leave the contract without an developer, thereby removing any functionality that is only available to the developer.
     */
    renounceDevelopership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * A linked list of reward tiers based on holdings
     */
    rewards(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Users' stakes mapped from their address
     */
    stakes(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Transfers developership of the contract to a new account (`newDeveloper`). Can only be called by the current developer.
     */
    transferDevelopership(
      newDeveloper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Sets/updates the address for the root tunnel
     * @param _fxRootTunnel - the fxRootTunnel address
     */
    setFxRootTunnel(
      _fxRootTunnel: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * this will claim any existing rewards and reset timers.
     * A manual override functionality to allow an admit to update a user's stake.
     * @param amount - the amount to set the user's stake to.
     * @param user - the user whose stake is being updated.
     */
    manuallyUpdateStake(
      user: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * this will claim any existing rewards and reset timers.
     * A manual override functionality to allow an admit to update many users' stakes.
     * @param amounts - the amounts to set the associated user's stake to.
     * @param users - the users whose stakes are being updated.
     */
    manuallyUpdateBulkStakes(
      users: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Sets/updates the bonus for claiming for the first time.
     * @param _bonus - the new bonus
     */
    setFirstTimeBonus(
      _bonus: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Resets the reward calculation schema.
     * @param amounts - a list of held amounts in increasing order.
     * @param newRewards - a parallel list to amounts containing the summative yields per period for the respective amount.
     */
    setRewards(
      amounts: BigNumberish[],
      newRewards: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Claims the pending reward for the transaction sender.
     */
    claimReward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Gets the pending reward for the provided user.
     * @param user - the user whose reward is being sought.
     */
    getReward(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * a duplicate stakes(user).amount.
     * Tricks collab.land and other ERC721 balance checkers into believing that the user has a balance.
     * @param user - the user to get the balance of.
     */
    balanceOf(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Dumps the rewards currently programmed in per tier as two parallel arrays defining (amount, yield) pairs.
     */
    dumpRewards(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
