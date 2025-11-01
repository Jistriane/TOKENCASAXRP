import { Transaction, IssuedCurrencyAmount } from 'xrpl';

export interface BaseTransaction {
  Account: string;
  TransactionType: string;
  Fee?: string;
  Sequence?: number;
  AccountTxnID?: string;
  LastLedgerSequence?: number;
  Flags?: number;
  SigningPubKey?: string;
  TxnSignature?: string;
  NetworkID?: number;
  Memos?: Array<{
    Memo: {
      MemoData?: string;
      MemoFormat?: string;
      MemoType?: string;
    };
  }>;
}

export interface OfferCreateTransaction extends BaseTransaction {
  TransactionType: 'OfferCreate';
  TakerGets: string | IssuedCurrencyAmount;
  TakerPays: string | IssuedCurrencyAmount;
  Expiration?: number;
  OfferSequence?: number;
}

export interface OfferCancelTransaction extends BaseTransaction {
  TransactionType: 'OfferCancel';
  OfferSequence: number;
}

export interface AMMCreateTransaction extends BaseTransaction {
  TransactionType: 'AMMCreate';
  Asset: {
    currency: string;
    issuer: string;
    value: string;
  };
  Asset2: {
    currency: string;
    issuer: string;
  };
  TradingFee?: number;
}

export interface AMMDepositTransaction extends BaseTransaction {
  TransactionType: 'AMMDeposit';
  Asset: {
    currency: string;
    issuer: string;
    value: string;
  };
  Asset2: {
    currency: string;
    issuer: string;
  };
  LPToken?: {
    currency: string;
    issuer: string;
  };
  Flags?: number;
}

export interface AMMLedgerEntry {
  LedgerEntryType: 'AMM';
  Account: string;
  Asset: {
    currency: string;
    issuer: string;
  };
  Asset2: {
    currency: string;
    issuer: string;
  };
  TradingFee: number;
  LPTokenBalance: {
    currency: string;
    issuer: string;
    value: string;
  };
}

export interface AMMInfo {
  amm: {
    asset: {
      currency: string;
      issuer: string;
    };
    asset2: {
      currency: string;
      issuer: string;
    };
    amount: string;
    amount2: string;
    lpToken: {
      currency: string;
      issuer: string;
      value: string;
    };
    tradingFee: number;
    price: string;
  };
  ledger_index: number;
  validated: boolean;
}

export interface MPTTransaction extends BaseTransaction {
  TransactionType: 'MPTCreate' | 'MPTModify' | 'MPTBurn';
  TokenName: string;
  TokenSymbol: string;
  TotalSupply: string;
  Decimals: number;
  URI?: string;
  TransferFee?: number;
  Memos?: Array<{
    Memo: {
      MemoData: string;
      MemoType?: string;
      MemoFormat?: string;
    };
  }>;
  Restrictions?: {
    TransferRestriction?: {
      type: string;
      credential: string;
    };
  };
}

export interface EscrowTransaction extends BaseTransaction {
  TransactionType: 'EscrowCreate' | 'EscrowFinish' | 'EscrowCancel';
  Amount: string;
  Destination: string;
  Condition?: string;
  FinishAfter?: number;
  CancelAfter?: number;
  DestinationTag?: number;
  SourceTag?: number;
}

export interface NFTokenMintTransaction extends BaseTransaction {
  TransactionType: 'NFTokenMint';
  NFTokenTaxon: number;
  URI?: string;
  Flags?: number;
  TransferFee?: number;
  Issuer?: string;
}

export interface CredentialNFT {
  NFTokenID: string;
  URI: string;
  Flags: number;
  Issuer: string;
  NFTokenTaxon: number;
  nft_serial: number;
  validated: boolean;
}