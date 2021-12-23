/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface DevDIDsInterface extends ethers.utils.Interface {
  functions: {
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "delete_(uint256)": FunctionFragment;
    "generateVp(uint256[],uint256,uint256)": FunctionFragment;
    "getApproved(uint256)": FunctionFragment;
    "getVc(uint256)": FunctionFragment;
    "isApprovedForAll(address,address)": FunctionFragment;
    "issue(address,string,string,uint256,uint256)": FunctionFragment;
    "name()": FunctionFragment;
    "ownerOf(uint256)": FunctionFragment;
    "revoke(uint256)": FunctionFragment;
    "safeTransferFrom(address,address,uint256)": FunctionFragment;
    "setApprovalForAll(address,bool)": FunctionFragment;
    "setSuspended(uint256,bool)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "symbol()": FunctionFragment;
    "tokenURI(uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "vcsOfHolder(address)": FunctionFragment;
    "vcsOfIssuer(address)": FunctionFragment;
    "verify((uint256[],uint256,uint256),address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "delete_",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "generateVp",
    values: [BigNumberish[], BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getApproved",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getVc", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "issue",
    values: [string, string, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ownerOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "revoke",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setSuspended",
    values: [BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenURI",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "vcsOfHolder", values: [string]): string;
  encodeFunctionData(functionFragment: "vcsOfIssuer", values: [string]): string;
  encodeFunctionData(
    functionFragment: "verify",
    values: [
      { vcs: BigNumberish[]; validFrom: BigNumberish; validTo: BigNumberish },
      string,
      BigNumberish
    ]
  ): string;

  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "delete_", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "generateVp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getApproved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getVc", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "issue", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "revoke", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSuspended",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "vcsOfHolder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "vcsOfIssuer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "ApprovalForAll(address,address,bool)": EventFragment;
    "Delete(address,address,uint256)": EventFragment;
    "Issue(address,address,uint256)": EventFragment;
    "Revoke(address,address,uint256)": EventFragment;
    "Suspend(address,address,uint256,bool)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Delete"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Issue"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Revoke"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Suspend"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber] & {
    owner: string;
    approved: string;
    tokenId: BigNumber;
  }
>;

export type ApprovalForAllEvent = TypedEvent<
  [string, string, boolean] & {
    owner: string;
    operator: string;
    approved: boolean;
  }
>;

export type DeleteEvent = TypedEvent<
  [string, string, BigNumber] & {
    holder: string;
    issuer: string;
    vcId: BigNumber;
  }
>;

export type IssueEvent = TypedEvent<
  [string, string, BigNumber] & {
    issuer: string;
    holder: string;
    vcId: BigNumber;
  }
>;

export type RevokeEvent = TypedEvent<
  [string, string, BigNumber] & {
    issuer: string;
    holder: string;
    vcId: BigNumber;
  }
>;

export type SuspendEvent = TypedEvent<
  [string, string, BigNumber, boolean] & {
    issuer: string;
    holder: string;
    vcId: BigNumber;
    suspended: boolean;
  }
>;

export type TransferEvent = TypedEvent<
  [string, string, BigNumber] & { from: string; to: string; tokenId: BigNumber }
>;

export class DevDIDs extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: DevDIDsInterface;

  functions: {
    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    delete_(
      vcId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    generateVp(
      userVcs: BigNumberish[],
      validFrom_: BigNumberish,
      validTo_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [BigNumber[], BigNumber, BigNumber] & {
          vcs: BigNumber[];
          validFrom: BigNumber;
          validTo: BigNumber;
        }
      ] & {
        vp: [BigNumber[], BigNumber, BigNumber] & {
          vcs: BigNumber[];
          validFrom: BigNumber;
          validTo: BigNumber;
        };
      }
    >;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getVc(
      vcId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [string, string, string, string, BigNumber, BigNumber, boolean] & {
          issuer: string;
          holder: string;
          subject: string;
          data: string;
          validFrom: BigNumber;
          validTo: BigNumber;
          suspended: boolean;
        }
      ]
    >;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    issue(
      to: string,
      subject_: string,
      data_: string,
      validFrom_: BigNumberish,
      validTo_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    revoke(
      vcId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setSuspended(
      vcId: BigNumberish,
      suspended: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    vcsOfHolder(
      address_: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    vcsOfIssuer(
      address_: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    verify(
      vp: {
        vcs: BigNumberish[];
        validFrom: BigNumberish;
        validTo: BigNumberish;
      },
      holder: string,
      currentDate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean, string]>;
  };

  approve(
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

  delete_(
    vcId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  generateVp(
    userVcs: BigNumberish[],
    validFrom_: BigNumberish,
    validTo_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber[], BigNumber, BigNumber] & {
      vcs: BigNumber[];
      validFrom: BigNumber;
      validTo: BigNumber;
    }
  >;

  getApproved(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getVc(
    vcId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, string, BigNumber, BigNumber, boolean] & {
      issuer: string;
      holder: string;
      subject: string;
      data: string;
      validFrom: BigNumber;
      validTo: BigNumber;
      suspended: boolean;
    }
  >;

  isApprovedForAll(
    owner: string,
    operator: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  issue(
    to: string,
    subject_: string,
    data_: string,
    validFrom_: BigNumberish,
    validTo_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  revoke(
    vcId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256)"(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256,bytes)"(
    from: string,
    to: string,
    tokenId: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setApprovalForAll(
    operator: string,
    approved: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setSuspended(
    vcId: BigNumberish,
    suspended: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  symbol(overrides?: CallOverrides): Promise<string>;

  tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  vcsOfHolder(
    address_: string,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  vcsOfIssuer(
    address_: string,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  verify(
    vp: { vcs: BigNumberish[]; validFrom: BigNumberish; validTo: BigNumberish },
    holder: string,
    currentDate: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[boolean, string]>;

  callStatic: {
    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    delete_(vcId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    generateVp(
      userVcs: BigNumberish[],
      validFrom_: BigNumberish,
      validTo_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber[], BigNumber, BigNumber] & {
        vcs: BigNumber[];
        validFrom: BigNumber;
        validTo: BigNumber;
      }
    >;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getVc(
      vcId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, string, BigNumber, BigNumber, boolean] & {
        issuer: string;
        holder: string;
        subject: string;
        data: string;
        validFrom: BigNumber;
        validTo: BigNumber;
        suspended: boolean;
      }
    >;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    issue(
      to: string,
      subject_: string,
      data_: string,
      validFrom_: BigNumberish,
      validTo_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<string>;

    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    revoke(vcId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setSuspended(
      vcId: BigNumberish,
      suspended: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    symbol(overrides?: CallOverrides): Promise<string>;

    tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    vcsOfHolder(
      address_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    vcsOfIssuer(
      address_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    verify(
      vp: {
        vcs: BigNumberish[];
        validFrom: BigNumberish;
        validTo: BigNumberish;
      },
      holder: string,
      currentDate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean, string]>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; approved: string; tokenId: BigNumber }
    >;

    Approval(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; approved: string; tokenId: BigNumber }
    >;

    "ApprovalForAll(address,address,bool)"(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): TypedEventFilter<
      [string, string, boolean],
      { owner: string; operator: string; approved: boolean }
    >;

    ApprovalForAll(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): TypedEventFilter<
      [string, string, boolean],
      { owner: string; operator: string; approved: boolean }
    >;

    "Delete(address,address,uint256)"(
      holder?: null,
      issuer?: null,
      vcId?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { holder: string; issuer: string; vcId: BigNumber }
    >;

    Delete(
      holder?: null,
      issuer?: null,
      vcId?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { holder: string; issuer: string; vcId: BigNumber }
    >;

    "Issue(address,address,uint256)"(
      issuer?: null,
      holder?: null,
      vcId?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { issuer: string; holder: string; vcId: BigNumber }
    >;

    Issue(
      issuer?: null,
      holder?: null,
      vcId?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { issuer: string; holder: string; vcId: BigNumber }
    >;

    "Revoke(address,address,uint256)"(
      issuer?: null,
      holder?: null,
      vcId?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { issuer: string; holder: string; vcId: BigNumber }
    >;

    Revoke(
      issuer?: null,
      holder?: null,
      vcId?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { issuer: string; holder: string; vcId: BigNumber }
    >;

    "Suspend(address,address,uint256,bool)"(
      issuer?: null,
      holder?: null,
      vcId?: null,
      suspended?: null
    ): TypedEventFilter<
      [string, string, BigNumber, boolean],
      { issuer: string; holder: string; vcId: BigNumber; suspended: boolean }
    >;

    Suspend(
      issuer?: null,
      holder?: null,
      vcId?: null,
      suspended?: null
    ): TypedEventFilter<
      [string, string, BigNumber, boolean],
      { issuer: string; holder: string; vcId: BigNumber; suspended: boolean }
    >;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; tokenId: BigNumber }
    >;

    Transfer(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; tokenId: BigNumber }
    >;
  };

  estimateGas: {
    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    delete_(
      vcId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    generateVp(
      userVcs: BigNumberish[],
      validFrom_: BigNumberish,
      validTo_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVc(vcId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    issue(
      to: string,
      subject_: string,
      data_: string,
      validFrom_: BigNumberish,
      validTo_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    revoke(
      vcId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setSuspended(
      vcId: BigNumberish,
      suspended: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    vcsOfHolder(
      address_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    vcsOfIssuer(
      address_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    verify(
      vp: {
        vcs: BigNumberish[];
        validFrom: BigNumberish;
        validTo: BigNumberish;
      },
      holder: string,
      currentDate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    delete_(
      vcId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    generateVp(
      userVcs: BigNumberish[],
      validFrom_: BigNumberish,
      validTo_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVc(
      vcId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    issue(
      to: string,
      subject_: string,
      data_: string,
      validFrom_: BigNumberish,
      validTo_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    revoke(
      vcId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setSuspended(
      vcId: BigNumberish,
      suspended: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    vcsOfHolder(
      address_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    vcsOfIssuer(
      address_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    verify(
      vp: {
        vcs: BigNumberish[];
        validFrom: BigNumberish;
        validTo: BigNumberish;
      },
      holder: string,
      currentDate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
