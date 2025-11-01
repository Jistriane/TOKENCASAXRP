/**
 * Credentials Contract - KYC/AML e Qualificação de Investidores
 * Gerencia credentials para verificação de investidores
 */

import { Client, Wallet, Transaction, convertStringToHex } from 'xrpl';

export interface CredentialConfig {
  issuerAddress: string;
  targetAddress: string;
  credentialType: string;
  credentialValue: any;
}

export interface Credential {
  id: string;
  issuer: string;
  holder: string;
  type: string;
  value: any;
  issuedAt: Date;
  expiresAt?: Date;
  revoked: boolean;
  metadata?: {
    level: string;
    description: string;
    requirements: string[];
    issuerName: string;
    verificationMethod: string;
  };
}

export class CredentialsContract {
  private client: Client;
  private network: 'mainnet' | 'testnet' | 'devnet';

  constructor(network: 'mainnet' | 'testnet' | 'devnet' = 'testnet') {
    this.network = network;
    
    const endpoint = network === 'mainnet'
      ? 'wss://xrplcluster.com'
      : 'wss://s.altnet.rippletest.net:51233';
    
    this.client = new Client(endpoint);
  }

  async connect(): Promise<void> {
    if (!this.client.isConnected()) {
      await this.client.connect();
      console.log(`✅ Conectado ao XRPL ${this.network.toUpperCase()}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.client.isConnected()) {
      await this.client.disconnect();
    }
  }

  /**
   * Emite uma credential para um investidor
   * @param config Configuração da credential
   * @param wallet Carteira do emissor
   * @returns ID da credential emitida
   */
  async issueCredential(
    config: CredentialConfig,
    wallet: Wallet
  ): Promise<Credential> {
    await this.connect();

    try {
      // Criar transação de emissão de credential
      // Nota: Usando NFTokenMint como placeholder até Credentials estarem disponíveis
      const credentialData = {
        type: config.credentialType,
        value: config.credentialValue,
        issuedAt: new Date().toISOString(),
        issuer: config.issuerAddress,
        holder: config.targetAddress,
      };

      const tx: any = {
        TransactionType: 'NFTokenMint',
        Account: wallet.address,
        URI: convertStringToHex(JSON.stringify(credentialData)),
        Flags: 1,
        TransferFee: 0,
        NFTokenTaxon: this.getCredentialTaxon(config.credentialType),
      };

      const prepared = await this.client.autofill(tx);
      const signed = wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      if (result.result.validated) {
        const credential: Credential = {
          id: result.result.hash || 'credential_' + Date.now(),
          issuer: config.issuerAddress,
          holder: config.targetAddress,
          type: config.credentialType,
          value: config.credentialValue,
          issuedAt: new Date(),
          revoked: false,
        };

        console.log(`✅ Credential emitida: ${config.credentialType}`);
        console.log(`   Para: ${config.targetAddress}`);
        
        return credential;
      } else {
        throw new Error('Falha ao emitir credential');
      }
    } catch (error) {
      console.error('Erro ao emitir credential:', error);
      throw error;
    }
  }

  /**
   * Revoga uma credential
   */
  async revokeCredential(
    credentialId: string,
    wallet: Wallet
  ): Promise<string> {
    await this.connect();

    try {
      const tx: any = {
        TransactionType: 'NFTokenBurn',
        Account: wallet.address,
        NFTokenID: credentialId,
      };

      const prepared = await this.client.autofill(tx);
      const signed = wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      if (result.result.validated) {
        console.log(`✅ Credential revogada: ${credentialId}`);
        return result.result.hash;
      } else {
        throw new Error('Falha ao revogar credential');
      }
    } catch (error) {
      console.error('Erro ao revogar credential:', error);
      throw error;
    }
  }

  /**
   * Verifica se um endereço possui uma credential específica
   */
  async hasCredential(
    address: string,
    credentialType: string
  ): Promise<boolean> {
    await this.connect();

    try {
      // Buscar NFTs (credentials) do endereço
      const accountNFTs = await this.client.request({
        command: 'account_nfts',
        account: address,
        limit: 400,
      });

      // Filtrar pela credential desejada
      const hasCredential = accountNFTs.result.account_nfts.some((nft: any) => {
        try {
          const credentialData = JSON.parse(
            Buffer.from(nft.URI, 'hex').toString('utf-8')
          );
          return credentialData.type === credentialType;
        } catch {
          return false;
        }
      });

      return hasCredential;
    } catch (error) {
      console.error('Erro ao verificar credential:', error);
      return false;
    }
  }

  /**
   * Lista todas as credentials de um endereço
   */
  async getCredentials(address: string): Promise<Credential[]> {
    await this.connect();

    try {
      const accountNFTs = await this.client.request({
        command: 'account_nfts',
        account: address,
        limit: 400,
      });

      const credentials = accountNFTs.result.account_nfts
        .map((nft: any): Credential | null => {
          try {
            const credentialData = JSON.parse(
              Buffer.from(nft.URI, 'hex').toString('utf-8')
            );
            
            return {
              id: nft.NFTokenID,
              issuer: credentialData.issuer,
              holder: credentialData.holder,
              type: credentialData.type,
              value: credentialData.value,
              issuedAt: new Date(credentialData.issuedAt),
              revoked: false,
            };
          } catch {
            return null;
          }
        })
        .filter((cred): cred is Credential => cred !== null);

      return credentials;
    } catch (error) {
      console.error('Erro ao buscar credentials:', error);
      return [];
    }
  }

  /**
   * Obtém o taxon específico para cada tipo de credential
   */
  private getCredentialTaxon(credentialType: string): number {
    const taxonMap: Record<string, number> = {
      'BR-KYC-Verified': 1,
      'BR-Investor-Verified': 2,
      'BR-Investor-Accredited': 3,
      'BR-Property-Owner': 4,
    };

    return taxonMap[credentialType] || 0;
  }

  /**
   * Tipos de credentials disponíveis
   */
  static readonly CREDENTIAL_TYPES = {
    KYC_VERIFIED: 'BR-KYC-Verified',
    INVESTOR_VERIFIED: 'BR-Investor-Verified',
    INVESTOR_ACCREDITED: 'BR-Investor-Accredited',
    PROPERTY_OWNER: 'BR-Property-Owner',
  };
}

export default CredentialsContract;
