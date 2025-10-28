/**
 * Types para integração Frontend-Backend
 */

export interface PropertyDto {
  title: string;
  address: string;
  city: string;
  state: string;
  totalPrice: number;
  totalTokens: number;
  pricePerToken: number;
  yieldAnnual: number;
  type: 'residencial' | 'comercial';
  area: number;
  description: string;
  images: string[];
  ownerAddress: string;
}

export interface CreatePropertyDto extends PropertyDto {
  documents?: {
    matricula?: string;
    iptu?: string;
    contrato?: string;
  };
}

export interface MPTToken {
  id: string;
  propertyId: string;
  name: string;
  address: string;
  supply: number;
  metadataHash: string;
}

export interface EscrowDistribution {
  propertyId: string;
  totalRent: number;
  totalTokens: number;
  rentPerToken: number;
  distributions: Array<{
    address: string;
    tokens: number;
    payment: number;
  }>;
}

export interface KYCData {
  fullName: string;
  cpf: string;
  email: string;
  address: string;
  documents: {
    rg: File | null;
    cpfFile: File | null;
  };
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'rent';
  propertyId: string;
  tokens: number;
  value: number;
  timestamp: Date;
  txHash: string;
}

