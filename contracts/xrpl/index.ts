/**
 * TokenCasa XRPL Contracts
 * Exporta todos os contratos necessários para o funcionamento da plataforma
 */

import { MPTContract } from './MPTContract';
export { MPTContract };
export type { MPTConfig, MPTToken, MPTRestrictions } from './MPTContract';

import { EscrowContract } from './EscrowContract';
export { EscrowContract };
export type { EscrowConfig, EscrowInfo, HolderDistribution } from './EscrowContract';

import { CredentialsContract } from './CredentialsContract';
export { CredentialsContract };
export type { CredentialConfig, Credential } from './CredentialsContract';

import { DEXContract } from './DEXContract';
export { DEXContract };
export type { OrderConfig, Offer } from './DEXContract';

// Exportação centralizada de todos os contratos
export const TokenCasaContracts = {
  MPT: MPTContract,
  Escrow: EscrowContract,
  Credentials: CredentialsContract,
  DEX: DEXContract,
};

export default TokenCasaContracts;
